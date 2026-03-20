import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import { getPostData, getSortedPostsData } from "../lib/posts";
import ArticleListItem from "../components/articleListItem";
import PopularTopics from "../components/sidebar/popularTopics";
import SocialConnect from "../components/sidebar/socialConnect";
import wordCounter from "../components/wordCounter";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const featuredId = allPostsData[0]?.id ?? null;
  const featuredPost = featuredId ? await getPostData(featuredId) : null;

  return {
    props: {
      allPostsData,
      featuredReadingTime: featuredPost ? wordCounter(featuredPost.contentHtml) : null,
    },
  };
}

export default function Home({ allPostsData, featuredReadingTime }) {
  const featured = allPostsData[0];
  const rest = allPostsData.slice(1);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Notas sobre tecnología, programación y Bitcoin." />
        <meta property="og:title" content={siteTitle} />
      </Head>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Featured Article */}
        {featured && (
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[0.6875rem] font-bold tracking-widest uppercase text-zinc-400 dark:text-on-surface-variant">
                    Artículo destacado
                  </span>
                  <span className="w-8 h-[1px] bg-zinc-200 dark:bg-outline-variant"></span>
                  <span className="text-[0.6875rem] font-bold tracking-widest uppercase text-zinc-400 dark:text-on-surface-variant">
                    {featuredReadingTime ?? wordCounter(featured.title || '')} min read
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[1.1]">
                  {featured.title}
                </h1>
                {featured.resume && (
                  <p className="text-lg text-zinc-500 dark:text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                    {featured.resume}
                  </p>
                )}
                <Link
                  href={`/posts/${featured.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-md hover:opacity-90 transition-all group"
                >
                  Leer artículo completo
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
              {featured.image && (
                <div className="lg:col-span-5 relative rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden pointer-events-none"></div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Latest Writing */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                Últimos escritos
              </h2>
            </div>
            <div className="space-y-16">
              {rest.map((post) => (
                <ArticleListItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  date={post.date}
                  resume={post.resume}
                  category={post.category}
                  tags={post.tags}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-16">
            <PopularTopics posts={allPostsData} />
            <SocialConnect />
          </aside>
        </div>
      </main>
    </Layout>
  );
}
