import { getCurrentWeather, getWeatherAt16 } from "@/lib/weather";
import type { WeatherData } from "@/lib/weather";

// Haetaan molemmat säätiedot rinnakkain
async function fetchWeatherData() {
  try {
    const [current, at16] = await Promise.all([
      getCurrentWeather(),
      getWeatherAt16(),
    ]);
    return { current, at16, error: null };
  } catch {
    return { current: null, at16: null, error: "Säädatan haku epäonnistui." };
  }
}

// ---- Alikomponentit --------------------------------------------------------

function WeatherCard({
  title,
  data,
  error,
  fallback,
}: {
  title: string;
  data: WeatherData | null;
  error: string | null;
  fallback?: string;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
        {title}
      </h2>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {!error && !data && fallback && (
        <p className="text-gray-500 text-sm">{fallback}</p>
      )}

      {!error && data && (
        <>
          {/* Emoji ja lämpötila */}
          <div className="flex items-end gap-3">
            <span className="text-5xl">{data.emoji}</span>
            <span className="text-5xl font-bold text-white leading-none">
              {data.temperature}°
            </span>
          </div>

          {/* Kuvaus */}
          <p className="text-gray-300 text-lg">{data.description}</p>

          {/* Tuntuu kuin */}
          <p className="text-gray-500 text-sm">
            Tuntuu kuin {data.feelsLike}°C
          </p>
        </>
      )}
    </div>
  );
}

function TransitCard() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
        Julkinen liikenne
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-5xl">🚌</span>
        <div>
          <p className="text-white font-medium">Tulossa pian</p>
          <p className="text-gray-500 text-sm mt-1">
            HSL-aikataulut lisätään myöhemmin
          </p>
        </div>
      </div>
    </div>
  );
}

// ---- Pääsivu ---------------------------------------------------------------

export default async function KotiPage() {
  const { current, at16, error } = await fetchWeatherData();

  // Näytetään päivitysaika — data on max 30 min vanha
  const updatedAt = new Date().toLocaleTimeString("fi-FI", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Otsikko */}
        <div className="mb-12">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            02130 · Tapiola, Espoo
          </p>
          <h1 className="text-4xl font-bold text-white">
            Kodin infosivu
          </h1>
          <p className="text-gray-500 text-sm mt-3">
            Päivitetty noin klo {updatedAt} — data vanhenee 30 min välein
          </p>
        </div>

        {/* Korttiruudukko */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <WeatherCard
            title="Sää nyt"
            data={current}
            error={error}
          />
          <WeatherCard
            title="Sää klo 16"
            data={at16}
            error={error}
            fallback="Klo 16 data ei saatavilla enää tänään."
          />
          <TransitCard />
        </div>

      </div>
    </main>
  );
}
