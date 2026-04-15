type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function KotiLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col gap-6">
          <div>
            <p className="text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-2">
              02130 · Tapiola, Espoo
            </p>
            <h1 className="text-2xl font-bold text-white">Kodin infosivu</h1>
            <p className="text-gray-500 text-sm mt-1">
              Kirjaudu sisään jatkaaksesi
            </p>
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              Väärä salasana. Yritä uudelleen.
            </p>
          )}

          <form method="POST" action="/api/koti-auth" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-gray-400 text-xs font-semibold uppercase tracking-widest"
              >
                Salasana
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
            >
              Kirjaudu
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
