const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CITY = 'Mysuru';

// High-quality mock data for presentation stability
const MOCK_WEATHER = {
  main: { temp: 28, feels_like: 30, humidity: 65, pressure: 1012 },
  weather: [{ main: 'Clear', description: 'clear sky (Simulated)', icon: '01d' }],
  wind: { speed: 4.2 },
  visibility: 10000,
  clouds: { all: 10 },
  dt: Math.floor(Date.now() / 1000)
};

const MOCK_FORECAST = {
  list: Array.from({ length: 40 }, (_, i) => ({
    dt: Math.floor(Date.now() / 1000) + i * 10800,
    main: { temp: 24 + Math.sin(i / 2) * 4, humidity: 60 + Math.cos(i / 2) * 10 },
    weather: [{ main: i % 5 === 0 ? 'Clouds' : 'Clear', description: 'scattered clouds' }],
    clouds: { all: 20 + i * 2 },
    wind: { speed: 3 + Math.random() * 2 }
  }))
};

// Helper: Fetch with timeout
const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
     const response = await fetch(resource, {
       ...options,
       signal: controller.signal
     });
     clearTimeout(id);
     return response;
  } catch (err) {
     clearTimeout(id);
     throw err;
  }
};

export const fetchCurrentWeather = async () => {
  try {
    const key = (API_KEY || '').trim();
    if (!key || key.length < 10 || key.includes('your')) {
       console.log('Weather Service: Key not found, using simulation.');
       return MOCK_WEATHER;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${key}`;
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
        console.warn('Weather API failed with status:', response.status);
        return MOCK_WEATHER;
    }
    
    const data = await response.json();
    return data && data.main ? data : MOCK_WEATHER;
  } catch (error) {
    console.warn('Weather API Timeout/CORS error. Switching to Tactical Simulation.');
    return MOCK_WEATHER;
  }
};

export const fetchForecast = async () => {
    try {
      const key = (API_KEY || '').trim();
      if (!key || key.length < 10 || key.includes('your')) return MOCK_FORECAST;

      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${key}`;
      const response = await fetchWithTimeout(url);
      
      if (!response.ok) return MOCK_FORECAST;
      
      const data = await response.json();
      return data && data.list ? data : MOCK_FORECAST;
    } catch (error) {
      return MOCK_FORECAST;
    }
  };
