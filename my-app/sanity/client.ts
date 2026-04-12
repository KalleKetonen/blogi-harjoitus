// Sanity-asiakasyhteys — käytetään datan hakemiseen CMS:stä
// Tämä tiedosto toimii palvelimella (Server Component), ei selaimessa

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01", // päivämäärä määrittää mitä Sanity API -versiota käytetään
  useCdn: false,            // false = aina tuorein data (CDN välimuistiisi ei luoteta)
});
