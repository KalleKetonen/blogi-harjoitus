import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import { latestPostQuery, olderPostsQuery } from "@/sanity/queries";

type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

type LatestPost = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  content?: PortableTextBlock[];
};

type OlderPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
};

export default async function BlogPage() {
  // Haetaan uusin ja vanhemmat postaukset rinnakkain
  const [latest, olderPosts]: [LatestPost | null, OlderPost[]] =
    await Promise.all([
      client.fetch(latestPostQuery),
      client.fetch(olderPostsQuery),
    ]);

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-12">Blogi</h1>

        {!latest && (
          <p className="text-gray-400">Ei vielä postauksia.</p>
        )}

        {latest && (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Pääalue — uusin postaus */}
            <article className="flex-1 min-w-0">
              {latest.publishedAt && (
                <p className="text-gray-500 text-sm mb-3">
                  {new Date(latest.publishedAt).toLocaleDateString("fi-FI")}
                </p>
              )}

              <h2 className="text-3xl font-bold text-white mb-6">
                {latest.title}
              </h2>

              {/* Rich text -sisältö */}
              {latest.content && (
                <PortableText
                  value={latest.content}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-gray-300 leading-relaxed mb-5">{children}</p>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-white mt-8 mb-3">{children}</h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-indigo-500 pl-4 text-gray-400 italic my-6">
                          {children}
                        </blockquote>
                      ),
                    },
                    marks: {
                      strong: ({ children }) => (
                        <strong className="text-white font-semibold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic text-gray-300">{children}</em>
                      ),
                    },
                    list: {
                      bullet: ({ children }) => (
                        <ul className="list-disc list-inside text-gray-300 mb-5 space-y-1">{children}</ul>
                      ),
                      number: ({ children }) => (
                        <ol className="list-decimal list-inside text-gray-300 mb-5 space-y-1">{children}</ol>
                      ),
                    },
                  }}
                />
              )}
            </article>

            {/* Sivupalkki — 5 vanhempaa postausta */}
            {olderPosts.length > 0 && (
              <aside className="lg:w-72 shrink-0">
                <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-6">
                  Vanhemmat postaukset
                </h3>

                <ul className="flex flex-col gap-4">
                  {olderPosts.map((post) => (
                    <li key={post._id}>
                      <Link href={`/blog/${post.slug.current}`}>
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-colors">
                          {post.publishedAt && (
                            <p className="text-gray-500 text-xs mb-1">
                              {new Date(post.publishedAt).toLocaleDateString("fi-FI")}
                            </p>
                          )}
                          <p className="text-white text-sm font-medium leading-snug">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

          </div>
        )}

      </div>
    </main>
  );
}
