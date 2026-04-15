import { getCurrentWeather, getWeatherAt16 } from "@/lib/weather";
import { getNearestBikeStation } from "@/lib/bikes";
import { getMaariDepartures } from "@/lib/tram";
import { getKalevalantienDepartures } from "@/lib/bus";
import type { WeatherData } from "@/lib/weather";
import type { BikeStation } from "@/lib/bikes";
import type { TramData, TramStop } from "@/lib/tram";
import type { BusData } from "@/lib/bus";

// ---- Datan haku ------------------------------------------------------------

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

async function fetchBikeData() {
  try {
    const station = await getNearestBikeStation();
    return { station, error: null };
  } catch {
    return { station: null, error: "Pyörädata ei saatavilla." };
  }
}

async function fetchTramData() {
  try {
    const data = await getMaariDepartures();
    return { data, error: null };
  } catch {
    return { data: null, error: "Ratikkadata ei saatavilla." };
  }
}

async function fetchBusData() {
  try {
    const data = await getKalevalantienDepartures();
    return { data, error: null };
  } catch {
    return { data: null, error: "Bussipysäkkidata ei saatavilla." };
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
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
        {title}
      </h2>

      {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}

      {!error && !data && fallback && (
        <p className="text-gray-500 text-xs sm:text-sm">{fallback}</p>
      )}

      {!error && data && (
        <>
          <div className="flex items-end gap-2 sm:gap-3">
            <span className="text-3xl sm:text-5xl">{data.emoji}</span>
            <span className="text-4xl sm:text-5xl font-bold text-white leading-none">
              {data.temperature}°
            </span>
          </div>
          <p className="text-gray-300 text-base sm:text-lg leading-tight">
            {data.description}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Tuntuu kuin {data.feelsLike}°C
          </p>
        </>
      )}
    </div>
  );
}

function BikeCard({
  station,
  error,
}: {
  station: BikeStation | null;
  error: string | null;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
        Kaupunkipyörät
      </h2>

      {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}

      {!error && !station && (
        <p className="text-gray-500 text-xs sm:text-sm">Lähiasemaa ei löydy.</p>
      )}

      {!error && station && (
        <>
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-3xl sm:text-5xl">🚲</span>
            <div className="min-w-0">
              <p className="text-white font-semibold leading-tight text-sm sm:text-base truncate">
                {station.name}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                {station.distanceMeters} m
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-1">
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${
                station.bikesAvailable === 0 ? "text-red-400" : "text-white"
              }`}>
                {station.bikesAvailable}
              </span>
              <span className="text-gray-500 text-xs mt-0.5">
                {station.bikesAvailable === 0 ? "Ei pyöriä" : "Pyörää"}
              </span>
            </div>
            <div className="w-px bg-gray-800" />
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${
                station.spacesAvailable === 0 ? "text-red-400" : "text-white"
              }`}>
                {station.spacesAvailable}
              </span>
              <span className="text-gray-500 text-xs mt-0.5">
                {station.spacesAvailable === 0 ? "Ei tilaa" : "Telakoita"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Yhden pysäkin lähdöt joukkoliikennekortissa — käytetään sekä ratikka- että bussikortissa
function StopSection({ stop }: { stop: TramStop }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
        {stop.code}
      </p>

      {stop.departures.length === 0 && (
        <p className="text-gray-600 text-xs">Ei tulevia lähtöjä</p>
      )}

      {stop.departures.map((dep, i) => {
        const minColor =
          dep.minutesUntil <= 1
            ? "text-red-400"
            : dep.minutesUntil <= 4
            ? "text-yellow-400"
            : "text-white";

        return (
          <div key={i} className="flex items-center gap-2 min-w-0">
            <span className="bg-indigo-700 text-white text-xs font-bold rounded px-1.5 py-0.5 shrink-0">
              {dep.line}
            </span>
            <span className="text-white text-sm font-semibold tabular-nums shrink-0">
              {dep.time}
            </span>
            <span className={`text-xs font-medium tabular-nums shrink-0 ${minColor}`}>
              {dep.minutesUntil <= 0 ? "nyt" : `${dep.minutesUntil} min`}
            </span>
            {dep.isRealtime && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" title="Reaaliaikainen" />
            )}
            <span className="text-gray-400 text-xs truncate">
              {dep.headsign}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TramCard({ data, error }: { data: TramData | null; error: string | null }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
        🚋 Raide-Jokeri · Maari
      </h2>
      {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}
      {!error && data && (
        <div className="grid grid-cols-2 gap-4">
          <StopSection stop={data.e0771} />
          <StopSection stop={data.e0770} />
        </div>
      )}
    </div>
  );
}

function BusCard({ data, error }: { data: BusData | null; error: string | null }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h2 className="text-gray-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
        🚌 Bussi 111 · Kalevalantie
      </h2>
      {error && <p className="text-red-400 text-xs sm:text-sm">{error}</p>}
      {!error && data && (
        <div className="grid grid-cols-2 gap-4">
          <StopSection stop={data.e2072} />
          <StopSection stop={data.e2079} />
        </div>
      )}
    </div>
  );
}

// ---- Pääsivu ---------------------------------------------------------------

export default async function KotiPage() {
  const [weather, bikes, tram, bus] = await Promise.all([
    fetchWeatherData(),
    fetchBikeData(),
    fetchTramData(),
    fetchBusData(),
  ]);

  const updatedAt = new Date().toLocaleTimeString("fi-FI", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-gray-950 px-4 sm:px-6 py-6 sm:py-12 lg:py-20">
      <div className="max-w-5xl mx-auto">

        {/* Otsikko */}
        <div className="mb-6 sm:mb-10 lg:mb-12">
          <p className="text-indigo-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">
            02130 · Tapiola, Espoo
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            Kodin infosivu
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3">
            Päivitetty noin klo {updatedAt} — sää 30 min, pyörät 1 min, liikenne 30 s
          </p>
        </div>

        {/* Sää ja pyörät — 2 saraketta mobiililla, 3 tabletilla+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 mb-3 sm:mb-5 lg:mb-6">
          <WeatherCard
            title="Sää nyt"
            data={weather.current}
            error={weather.error}
          />
          <WeatherCard
            title="Sää klo 16"
            data={weather.at16}
            error={weather.error}
            fallback="Ei saatavilla."
          />
          {/* Pyörät: koko leveys mobiililla (col-span-2), normaali tabletilla+ */}
          <div className="col-span-2 sm:col-span-1">
            <BikeCard station={bikes.station} error={bikes.error} />
          </div>
        </div>

        {/* Joukkoliikenne — rinnakkain tabletilla+, päällekkäin mobiililla */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
          <TramCard data={tram.data} error={tram.error} />
          <BusCard data={bus.data} error={bus.error} />
        </div>

      </div>
    </main>
  );
}
