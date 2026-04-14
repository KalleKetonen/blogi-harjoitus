// Säädatan haku Open-Meteo APIsta — ei vaadi API-avainta
// Dokumentaatio: https://open-meteo.com/en/docs

// Postinumeron 02130 (Tapiola, Espoo) koordinaatit
const LAT = 60.1843;
const LON = 24.8092;

export type WeatherData = {
  temperature: number;   // celsiusta, pyöristetty
  feelsLike: number;     // tuntuu kuin, celsiusta
  description: string;   // suomenkielinen kuvaus
  emoji: string;         // säätilaa kuvaava emoji
};

// Open-Meteo API -vastauksen tyypit
type CurrentResponse = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
  };
};

type HourlyResponse = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    weather_code: number[];
  };
};

// WMO-säätilakoodit suomeksi
// Koodit: https://open-meteo.com/en/docs#weathervariables
function codeToDescription(code: number): string {
  if (code === 0)                    return "Kirkas taivas";
  if (code === 1)                    return "Pääosin kirkas";
  if (code === 2)                    return "Puolipilvinen";
  if (code === 3)                    return "Pilvinen";
  if (code === 45 || code === 48)    return "Sumua";
  if (code >= 51 && code <= 55)      return "Tihkusadetta";
  if (code === 56 || code === 57)    return "Jäätävää tihkua";
  if (code >= 61 && code <= 65)      return "Sadetta";
  if (code === 66 || code === 67)    return "Jäätävää sadetta";
  if (code >= 71 && code <= 75)      return "Lumisadetta";
  if (code === 77)                   return "Lumirakeita";
  if (code >= 80 && code <= 82)      return "Sadekuuroja";
  if (code === 85 || code === 86)    return "Lumikuuroja";
  if (code === 95)                   return "Ukkosmyrsky";
  if (code === 96 || code === 99)    return "Raju ukkosmyrsky";
  return "Ei tietoa";
}

// Yksinkertainen emoji säätilakoodin perusteella
export function codeToEmoji(code: number): string {
  if (code === 0)                    return "☀️";
  if (code === 1 || code === 2)      return "🌤️";
  if (code === 3)                    return "☁️";
  if (code === 45 || code === 48)    return "🌫️";
  if (code >= 51 && code <= 67)      return "🌧️";
  if (code >= 71 && code <= 77)      return "❄️";
  if (code >= 80 && code <= 82)      return "🌦️";
  if (code >= 85 && code <= 86)      return "🌨️";
  if (code >= 95)                    return "⛈️";
  return "🌡️";
}

// Nykyhetken sää
export async function getCurrentWeather(): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LAT}&longitude=${LON}` +
    `&current=temperature_2m,apparent_temperature,weather_code` +
    `&timezone=Europe%2FHelsinki`;

  const res = await fetch(url, {
    next: { revalidate: 1800 }, // päivittyy 30 min välein
  });

  if (!res.ok) throw new Error(`Säädata epäonnistui: ${res.status}`);

  const data: CurrentResponse = await res.json();
  return {
    temperature: Math.round(data.current.temperature_2m),
    feelsLike:   Math.round(data.current.apparent_temperature),
    description: codeToDescription(data.current.weather_code),
    emoji:       codeToEmoji(data.current.weather_code),
  };
}

// Tämän päivän klo 16:00 sää
// Palauttaa null jos dataa ei löydy (esim. jo myöhäinen ilta)
export async function getWeatherAt16(): Promise<WeatherData | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${LAT}&longitude=${LON}` +
    `&hourly=temperature_2m,apparent_temperature,weather_code` +
    `&timezone=Europe%2FHelsinki` +
    `&forecast_days=1`;

  const res = await fetch(url, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) throw new Error(`Säädata epäonnistui: ${res.status}`);

  const data: HourlyResponse = await res.json();

  // Haetaan tämän päivän päivämäärä Helsinki-ajassa (muoto "2024-01-15")
  const todayHelsinki = new Date().toLocaleDateString("sv", {
    timeZone: "Europe/Helsinki",
  });
  const target = `${todayHelsinki}T16:00`;

  const index = data.hourly.time.findIndex((t) => t === target);
  if (index === -1) return null;

  return {
    temperature: Math.round(data.hourly.temperature_2m[index]),
    feelsLike:   Math.round(data.hourly.apparent_temperature[index]),
    description: codeToDescription(data.hourly.weather_code[index]),
    emoji:       codeToEmoji(data.hourly.weather_code[index]),
  };
}
