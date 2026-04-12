import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/client";
import { postBySlugQuery, allPostsSidebarQuery } from "@/sanity/queries";

type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

type Post = {
  title: string;
  publishedAt?: string;
  content?: PortableTextBlock[];
};

type SidebarPost = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Haetaan artikkeli ja sivupalkin lista rinnakkain
  const [post, allPosts]: [Post | null, SidebarPost[]] = await Promise.all([
    client.fetch(postBySlugQuery, { slug }),
    client.fetch(allPostsSidebarQuery),
  ]);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-950 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400">Postausta ei löydy.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

        {/* Artikkeli */}
        <article className="flex-1 min-w-0">
          {post.publishedAt && (
            <p className="text-gray-500 text-sm mb-4">
              {new Date(post.publishedAt).toLocaleDateString("fi-FI")}
            </p>
          )}

          <h1 className="text-4xl font-bold text-white mb-10">
            {post.title}
          </h1>

          {post.content && (
            <PortableText
              value={post.content}
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

        {/* Sivupalkki — kaikki postaukset */}
        {allPosts.length > 0 && (
          <aside className="lg:w-72 shrink-0">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-6">
              Postaukset
            </h3>

            <ul className="flex flex-col gap-3">
              {allPosts.map((p) => {
                const isActive = p.slug.current === slug;
                return (
                  <li key={p._id}>
                    <Link href={`/blog/${p.slug.current}`}>
                      <div className={`rounded-xl p-4 border transition-colors ${
                        isActive
                          ? "bg-gray-800 border-indigo-500 cursor-default"
                          : "bg-gray-900 border-gray-800 hover:border-gray-600"
                      }`}>
                        {p.publishedAt && (
                          <p className="text-gray-500 text-xs mb-1">
                            {new Date(p.publishedAt).toLocaleDateString("fi-FI")}
                          </p>
                        )}
                        <p className={`text-sm font-medium leading-snug ${
                          isActive ? "text-indigo-400" : "text-white"
                        }`}>
                          {p.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

      </div>
    </main>
  );
}
