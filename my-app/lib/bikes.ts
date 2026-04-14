// Kaupunkipyörädata HSL Digitransit APIsta
// API-dokumentaatio: https://digitransit.fi/en/developers/apis/1-routing-api/bicycling/
//
// Vaatii API-avaimen: lisää DIGITRANSIT_API_KEY ympäristömuuttujiin
// Rekisteröidy: https://portal.digitransit.fi

export type BikeStation = {
  name: string;
  distanceMeters: number;
  bikesAvailable: number;
  spacesAvailable: number;
};

// Nominatim-vastauksen tyyppi (OpenStreetMap geokoodaus)
type NominatimResult = {
  lat: string;
  lon: string;
};

// Digitransit nearest-queryn vastausrakenne
type DigitransitResponse = {
  data: {
    nearest: {
      edges: Array<{
        node: {
          distance: number;
          place: {
            name: string;
            bikesAvailable: number;
            spacesAvailable: number;
          };
        };
      }>;
    };
  };
};

// Muunna osoite koordinaateiksi Nominatim-APIlla (OpenStreetMap, ilmainen)
// Cache: 24h — osoite ei muutu
async function geocodeAddress(address: string): Promise<{ lat: number; lon: number }> {
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(address)}&format=json&limit=1`;

  const res = await fetch(url, {
    headers: {
      // Nominatim edellyttää User-Agent-otsakkeen käyttöehtojen mukaan
      "User-Agent": "KallenKotiApp/1.0",
    },
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`Geokoodaus epäonnistui: ${res.status}`);

  const data: NominatimResult[] = await res.json();
  if (!data.length) throw new Error(`Osoitetta ei löydy: ${address}`);

  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// Hae lähin kaupunkipyöräasema annetuista koordinaateista
// Cache: 60s — pyörätilanne muuttuu minuuteissa
async function fetchNearestStation(
  lat: number,
  lon: number
): Promise<BikeStation | null> {
  // nearest-query hakee lähimmän pyöräaseman suoraan — ei tarvitse laskea
  // etäisyyttä itse kaikkiin asemiin
  const query = `{
    nearest(lat: ${lat}, lon: ${lon}, maxDistance: 2000, filterByPlaceTypes: [BICYCLE_RENT]) {
      edges {
        node {
          distance
          place {
            ... on BikeRentalStation {
              name
              bikesAvailable
              spacesAvailable
            }
          }
        }
      }
    }
  }`;

  const apiKey = process.env.DIGITRANSIT_API_KEY;

  const res = await fetch(
    "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API-avain lisätään jos saatavilla
        ...(apiKey ? { "digitransit-subscription-key": apiKey } : {}),
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) throw new Error(`Digitransit API epäonnistui: ${res.status}`);

  const json: DigitransitResponse = await res.json();
  const edges = json.data?.nearest?.edges ?? [];

  if (!edges.length) return null;

  const { distance, place } = edges[0].node;
  return {
    name:            place.name,
    distanceMeters:  Math.round(distance),
    bikesAvailable:  place.bikesAvailable,
    spacesAvailable: place.spacesAvailable,
  };
}

// Julkinen funktio: geokoodaa osoite ja hae lähin asema
export async function getNearestBikeStation(): Promise<BikeStation | null> {
  const { lat, lon } = await geocodeAddress("Metsänpojankuja 7, Espoo, Finland");
  return fetchNearestStation(lat, lon);
}
