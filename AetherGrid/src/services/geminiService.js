const SYSTEM_CONTEXT = `You are AetherGrid AI — the intelligent assistant for the AetherGrid Smart Grid Management Platform. 

**About AetherGrid:**
AetherGrid is a Virtual Power Plant (VPP) administration and monitoring platform for the Mysuru Metropolitan Area. It manages distributed energy resources (DER), solar panels, battery storage, and grid distribution in real-time.

**Platform Modules you know about:**
1. **System Overview** — Master dashboard showing total demand (~142 MW), supply (~155 MW), active nodes (~4192), grid health, and the Solar Energy Ecosystem.
2. **Network Monitoring** — Live geographic node tracking on an interactive Leaflet map centered on Mysuru. Shows grid frequency stability (target 50Hz), node stress levels.
3. **Operations & Control (Control Center)** — Emergency grid alerts, critical outage management (e.g., South Hub Transformer T-09 failures), override controls.
4. **Assets & Solar Management (DER Management)** — Registry of all solar arrays, battery banks, and DER nodes. Tracks capacity, generation, and maintenance status.
5. **Weather Intelligence** — Live weather data from OpenWeather API for Mysuru. Tracks temperature, humidity, wind speed, cloud cover, UV index, and solar efficiency estimates.
6. **Forecasting & Intelligence** — AI-driven load prediction, demand forecasting charts, and predictive maintenance scheduling.
7. **Resilience & Recovery** — Disaster recovery protocols, failure zone mapping, black start readiness, backup relay management.
8. **Data & Analytics** — House-level consumption data from Supabase database, interactive map of individual house metrics, neighborhood filtering, and energy billing.

**Technical Stack:**
- Frontend: React 19, Vite, Recharts, Leaflet Maps
- Backend: Supabase (PostgreSQL)
- APIs: OpenWeather (weather data), Google Gemini (AI)
- Design: "Strategic Gold" theme (#BAB86C accent on black)

**Your Behavior:**
- Be concise and helpful. Use short paragraphs.
- When asked about the platform, answer with specifics from the modules above.
- When asked general energy/grid questions, answer using your broader knowledge.
- Use technical terminology appropriate for grid operators.
- If asked about real-time data, explain that you can describe what the dashboards show but cannot pull live numbers directly.
- Keep responses under 200 words unless a detailed explanation is requested.
- Use bullet points for lists. Be professional but approachable.`;

let conversationHistory = [];

export const resetChat = () => {
  conversationHistory = [];
};

export const sendMessage = async (userMessage) => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    return "⚠️ Gemini API key is empty. Paste your key in .env after VITE_GEMINI_API_KEY= then restart the dev server.";
  }

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  conversationHistory.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  const contents = [
    { role: "user", parts: [{ text: SYSTEM_CONTEXT }] },
    { role: "model", parts: [{ text: "Understood. I am AetherGrid AI, ready to assist." }] },
    ...conversationHistory
  ];

  const body = JSON.stringify({ contents });
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`;

  // Retry up to 5 times, waiting the amount the API tells us to
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });

      // If rate limited, parse the retry delay and wait
      if (response.status === 429) {
        const errData = await response.json();
        const retryInfo = errData.error?.details?.find(d => d['@type']?.includes('RetryInfo'));
        const retrySeconds = retryInfo?.retryDelay ? parseInt(retryInfo.retryDelay) : 20;
        const waitMs = (retrySeconds + 2) * 1000; // add 2s buffer
        
        if (attempt < 4) {
          await delay(waitMs);
          continue;
        } else {
          conversationHistory.pop();
          return `⚠️ API is busy. The free tier has a per-minute limit. Please wait ${retrySeconds} seconds and try again.`;
        }
      }

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'API request failed');
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

      conversationHistory.push({
        role: "model",
        parts: [{ text: reply }]
      });

      return reply;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        conversationHistory.pop();
        return "⚠️ Network error. Check your internet connection.";
      }
      if (attempt === 4) {
        conversationHistory.pop();
        return `⚠️ ${error.message}`;
      }
      await delay(3000);
    }
  }

  conversationHistory.pop();
  return "⚠️ Could not reach AI. Try again in a moment.";
};
