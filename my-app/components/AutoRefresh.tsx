"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Päivittää nykyisen Server Componentin datan router.refresh()-kutsulla.
// Ei tee täyttä sivulatausta — Next.js hakee uuden RSC-payloadin palvelimelta
// ja päivittää vain muuttuneen sisällön.
// Jättää päivityksen väliin kun välilehti ei ole aktiivinen.
export default function AutoRefresh({ intervalMs = 60_000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
