const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

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
- APIs: OpenWeather (weather data), OpenAI (AI)
- Design: "Strategic Gold" theme (#BAB86C accent on black)

**Your Behavior:**
- Be concise and helpful. Use short paragraphs.
- When asked about the platform, answer with specifics from the modules above.
- When asked general energy/grid questions, answer using your broader knowledge.
- Use technical terminology appropriate for grid operators.
- If asked about real-time data, explain that you can describe what the dashboards show but cannot pull live numbers directly.
- Keep responses under 200 words unless a detailed explanation is requested.
- Use bullet points for lists. Be professional but approachable.`;

let conversationHistory = [
  { role: "system", content: SYSTEM_CONTEXT }
];

// Emergency Fallback Mock Data for Demo Stability
const MOCK_RESPONSES = [
  {
    keywords: ['hi', 'hello', 'who are you', 'help'],
    response: "Greetings. I am **AetherGrid AI**, your tactical grid assistant. I monitor the Mysuru Metropolitan Area's power distribution. How can I assist with your grid operations today?"
  },
  {
    keywords: ['weather', 'temp', 'rain', 'sun'],
    response: "The **Weather Intelligence** module is currently tracking live telemetry in Mysuru. Higher temperatures usually increase grid demand for cooling, while cloud cover may impact solar yield. You can find detailed charts in the Weather Intelligence tab."
  },
  {
    keywords: ['solar', 'panel', 'generation', 'yield'],
    response: "Our **Assets & Solar Management** system reports a steady generation curve for the current cycle. We are maximizing the **Solar Energy Ecosystem** to offset base-load grid demand. Current solar efficiency is high."
  },
  {
    keywords: ['outage', 'fail', 'emergency', 'south hub', 'transformer'],
    response: "The **Operations & Control** center is monitoring all critical nodes. The South Hub Transformer T-09 is a known critical asset; any de-synchronization there triggers immediate isolation protocols to prevent cascading failures."
  },
  {
    keywords: ['data', 'analytics', 'house', 'neighbor'],
    response: "The **Data & Analytics** suite provides high-resolution metering for individual nodes. You can filter by neighborhood to analyze localized consumption spikes or energy billing metrics."
  },
  {
    keywords: ['error', 'quota', 'api'],
    response: "System Note: I am currently operating in **Tactical Simulation Mode** due to API connectivity limitations. I still have full access to platform documentation and can assist with any operational questions."
  }
];

const getMockResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  const match = MOCK_RESPONSES.find(r => r.keywords.some(k => lowerMsg.includes(k)));
  
  if (match) return match.response;
  
  return "**AetherGrid AI Status Report:** I am currently processing grid data. I can assist with queries regarding our monitoring modules, solar assets, or emergency control protocols. (Note: Currently in Tactical Simulation Mode)";
};

export const resetChat = () => {
  conversationHistory = [
    { role: "system", content: SYSTEM_CONTEXT }
  ];
};

export const sendMessage = async (userMessage) => {
  // If no key, don't even try the API, go straight to mock
  if (!OPENAI_API_KEY || OPENAI_API_KEY.length < 10) {
    return getMockResponse(userMessage);
  }

  conversationHistory.push({ role: "user", content: userMessage });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      // If it's a quota error, return a mock response instead of failing
      if (errorData.error?.code === 'insufficient_quota' || response.status === 429) {
        console.warn("OpenAI Quota Exceeded. Falling back to Tactical Simulation Mode.");
        conversationHistory.pop(); // Remove user message from history as we didn't get a real response
        return getMockResponse(userMessage);
      }
      throw new Error(errorData.error?.message || "OpenAI API request failed");
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    conversationHistory.push({ role: "assistant", content: reply });

    return reply;
  } catch (error) {
    console.error("OpenAI service error:", error);
    conversationHistory.pop();
    // Final safety fallback
    return getMockResponse(userMessage);
  }
};
