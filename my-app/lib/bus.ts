// Bussilinja 111 lähdöt Kalevanvainion pysäkeiltä HSL Digitransit APIsta
// Pysäkit: E2072 (HSL:2215274) ja E2079 (HSL:2215299), osoite: Kalevalantie

// Käytetään samoja tyyppejä kuin tram.ts — rakenne on identtinen
export type { TramDeparture as BusDeparture, TramStop as BusStop } from "./tram";
import type { TramStop as BusStop } from "./tram";

export type BusData = {
  e2072: BusStop;
  e2079: BusStop;
};

// Raakavastauksen tyypit (sama kuin tram.ts)
type StoptimeRaw = {
  scheduledDeparture: number;
  realtimeDeparture: number;
  realtime: boolean;
  serviceDay: number;
  headsign: string;
  trip: {
    route: {
      shortName: string;
    };
  };
};

type StopRaw = {
  code: string;
  stoptimesWithoutPatterns: StoptimeRaw[];
};

type ApiResponse = {
  data: {
    stopE2072: StopRaw;
    stopE2079: StopRaw;
  };
};

// Haetaan 10 lähtöä per pysäkki ja suodatetaan linja 111 — varmistaa
// että saadaan vähintään 2 oikeaa lähtöä vaikka API palauttaisi muitakin
const QUERY = `{
  stopE2072: stop(id: "HSL:2215274") {
    code
    stoptimesWithoutPatterns(numberOfDepartures: 10) {
      scheduledDeparture
      realtimeDeparture
      realtime
      serviceDay
      headsign
      trip { route { shortName } }
    }
  }
  stopE2079: stop(id: "HSL:2215299") {
    code
    stoptimesWithoutPatterns(numberOfDepartures: 10) {
      scheduledDeparture
      realtimeDeparture
      realtime
      serviceDay
      headsign
      trip { route { shortName } }
    }
  }
}`;

// Aika-muunnos: serviceDay (Unix s) + *Departure (s puoliyöstä) → "HH:MM"
// Katso tram.ts kommentit tarkemmasta selityksestä
function parseStoptime(st: StoptimeRaw) {
  const now = Date.now();
  const departureSeconds = st.realtime ? st.realtimeDeparture : st.scheduledDeparture;
  const departureMs = (st.serviceDay + departureSeconds) * 1000;

  const time = new Date(departureMs).toLocaleTimeString("fi-FI", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    line: st.trip.route.shortName,
    headsign: st.headsign,
    time,
    isRealtime: st.realtime,
    minutesUntil: Math.round((departureMs - now) / 60_000),
  };
}

function processStop(raw: StopRaw): BusStop {
  const departures = raw.stoptimesWithoutPatterns
    .filter((st) => st.trip.route.shortName === "111")
    .map(parseStoptime)
    .filter((d) => d.minutesUntil >= -1) // sallitaan 1 min sitten lähtenyt
    .slice(0, 2);

  return { code: raw.code, departures };
}

export async function getKalevalantienDepartures(): Promise<BusData> {
  const apiKey = process.env.DIGITRANSIT_API_KEY;

  const res = await fetch("https://api.digitransit.fi/routing/v2/hsl/gtfs/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "digitransit-subscription-key": apiKey } : {}),
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 30 },
  });

  if (!res.ok) throw new Error(`Digitransit API epäonnistui: ${res.status}`);

  const json: ApiResponse = await res.json();

  return {
    e2072: processStop(json.data.stopE2072),
    e2079: processStop(json.data.stopE2079),
  };
}
