// Raide-Jokeri (linja 15) lähdöt Maarin pysäkeiltä HSL Digitransit APIsta
// Pysäkit: E0771 (HSL:2222403) ja E0770 (HSL:2222404)

export type TramDeparture = {
  line: string;
  headsign: string;
  time: string;        // "HH:MM" — reaaliaikainen jos saatavilla, muuten aikataulun mukainen
  isRealtime: boolean;
  minutesUntil: number;
};

export type TramStop = {
  code: string;        // esim. "E0771"
  departures: TramDeparture[];
};

export type TramData = {
  e0771: TramStop;
  e0770: TramStop;
};

// Raakavastauksen tyypit
type StoptimeRaw = {
  scheduledDeparture: number;  // sekunteja kyseisen päivän keskiyöstä
  realtimeDeparture: number;   // sekunteja kyseisen päivän keskiyöstä
  realtime: boolean;
  serviceDay: number;          // Unix timestamp (s) päivän alkuun
  headsign: string;
  trip: {
    route: {
      shortName: string;       // "15"
    };
  };
};

type StopRaw = {
  code: string;
  stoptimesWithoutPatterns: StoptimeRaw[];
};

type ApiResponse = {
  data: {
    stopE0771: StopRaw;
    stopE0770: StopRaw;
  };
};

// Haetaan 10 lähtöä per pysäkki ja suodatetaan linja 15 — varmistaa
// että saadaan vähintään 2 oikeaa lähtöä vaikka API palauttaisi muitakin
const QUERY = `{
  stopE0771: stop(id: "HSL:2222403") {
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
  stopE0770: stop(id: "HSL:2222404") {
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

// Muuntaa Digitransit-aikatauluarvot näytettävään muotoon.
//
// Digitransit ilmoittaa ajan kahtena osana:
//   serviceDay   = Unix timestamp (sekunteina) sen päivän puoliyöhön
//   *Departure   = sekunteja kyseisestä puoliyöstä lähtöhetkeen
//
// Yhteenlaskettu Unix-aika: (serviceDay + *Departure) * 1000 millisekunteina.
// Aikavyöhyke Europe/Helsinki hoitaa kesä/talviajan automaattisesti.
function parseDeparture(st: StoptimeRaw): TramDeparture {
  const now = Date.now();
  const departureSeconds = st.realtime ? st.realtimeDeparture : st.scheduledDeparture;
  const departureMs = (st.serviceDay + departureSeconds) * 1000;

  const time = new Date(departureMs).toLocaleTimeString("fi-FI", {
    timeZone: "Europe/Helsinki",
    hour: "2-digit",
    minute: "2-digit",
  });

  const minutesUntil = Math.round((departureMs - now) / 60_000);

  return {
    line: st.trip.route.shortName,
    headsign: st.headsign,
    time,
    isRealtime: st.realtime,
    minutesUntil,
  };
}

function processStop(raw: StopRaw): TramStop {
  const departures = raw.stoptimesWithoutPatterns
    .filter((st) => st.trip.route.shortName === "15")
    .map(parseDeparture)
    .filter((d) => d.minutesUntil >= -1) // sallitaan 1 min sitten lähtenyt
    .slice(0, 2);

  return { code: raw.code, departures };
}

export async function getMaariDepartures(): Promise<TramData> {
  const apiKey = process.env.DIGITRANSIT_API_KEY;

  const res = await fetch("https://api.digitransit.fi/routing/v2/hsl/gtfs/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "digitransit-subscription-key": apiKey } : {}),
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 30 }, // ratikka-aikataulut: päivitetään 30 s välein
  });

  if (!res.ok) throw new Error(`Digitransit API epäonnistui: ${res.status}`);

  const json: ApiResponse = await res.json();

  return {
    e0771: processStop(json.data.stopE0771),
    e0770: processStop(json.data.stopE0770),
  };
}
