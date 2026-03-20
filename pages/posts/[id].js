import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Date from "../../components/date";
import wordCounter from "../../components/wordCounter";
import TableOfContents from "../../components/tableOfContents";
import RelatedPostCard from "../../components/relatedPostCard";

export default function Post({ postData }) {
  const readingTime = wordCounter(postData.contentHtml);
  const contentRef = useRef(null);
  const hasTweetEmbed = postData.contentHtml.includes('class="twitter-tweet"');
  const [copyState, setCopyState] = useState("idle");
  const articleUrl = `https://blog.saporiti.cl/posts/${postData.id}`;

  useEffect(() => {
    if (!hasTweetEmbed || !window.twttr?.widgets || !contentRef.current) {
      return;
    }
    window.twttr.widgets.load(contentRef.current);
  }, [hasTweetEmbed, postData.contentHtml]);

  useEffect(() => {
    if (copyState !== "copied") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyState("idle");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copyState]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postData.title,
          text: postData.resume,
          url: articleUrl,
        });
        return;
      } catch {
        return;
      }
    }

    await handleCopyLink();
  };

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={postData.image} />
        <meta property="og:description" content={postData.resume} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.resume} />
      </Head>

      {hasTweetEmbed && (
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (contentRef.current) {
              window.twttr?.widgets?.load(contentRef.current);
            }
          }}
        />
      )}

      <main className="pb-24 pt-24 sm:pt-32">
        <header className="mx-auto mb-14 max-w-5xl px-4 sm:px-6 lg:mb-16">
          <div className="mb-7 flex flex-wrap items-center gap-3 sm:mb-8">
            {postData.category && (
              <span className="rounded-full bg-secondary-container px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:bg-surface-container-high dark:text-on-surface">
                {postData.category}
              </span>
            )}
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-on-surface-variant">
              {readingTime} min read
            </span>
          </div>

          <h1 className="max-w-4xl text-[2.5rem] font-black leading-[0.98] tracking-[-0.06em] text-black sm:text-6xl md:text-7xl dark:text-white">
            {postData.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-5 pt-2 sm:mt-10 sm:gap-6 sm:pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-surface-container-highest">
                <img
                  src="/images/nsaporiti.jpeg"
                  alt="Nicolás Saporiti"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div>
                <div className="text-sm font-bold text-black dark:text-white">Nicolás Saporiti</div>
                <div className="text-xs text-zinc-500 dark:text-on-surface-variant">Autor</div>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-white/10"></div>

            <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-on-surface-variant">
              Publicado <Date dateString={postData.date} />
            </div>
          </div>
        </header>

        {postData.image && (
          <section className="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:mb-20">
            <div className="aspect-[21/10] w-full overflow-hidden rounded-xl bg-surface-container-low sm:aspect-[21/9]">
              <img
                src={postData.image}
                alt={postData.title}
                className="h-full w-full object-cover grayscale opacity-90 dark:opacity-80"
              />
            </div>
          </section>
        )}

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={postData.headings} label="Contenido" />
            </div>
          </aside>

          <article className="article-layout min-w-0 lg:col-span-9">
            {postData.resume && (
              <p className="article-intro mb-8 max-w-3xl text-lg leading-relaxed text-zinc-600 sm:mb-10 dark:text-on-surface-variant">
                {postData.resume}
              </p>
            )}

            <div
              ref={contentRef}
              className="prose-monolith article-shell"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />

            <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-200/70 pt-8 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                {postData.tags?.map(tag => (
                  <span
                    key={tag}
                    className="rounded bg-surface-container px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-zinc-700 dark:bg-surface-container-high dark:text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-on-surface-variant">
                  Compartir artículo
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-zinc-700 transition-all hover:bg-black hover:text-white dark:bg-surface-container-high dark:text-on-surface dark:hover:bg-white dark:hover:text-black"
                    aria-label="Compartir artículo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-zinc-700 transition-all hover:bg-black hover:text-white dark:bg-surface-container-high dark:text-on-surface dark:hover:bg-white dark:hover:text-black"
                    aria-label="Copiar enlace del artículo"
                    title={copyState === "copied" ? "Copiado" : "Copiar enlace"}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {copyState === "copied" && (
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-on-surface-variant">
                Enlace copiado
              </p>
            )}
          </article>
        </div>
      </main>

      {postData.relatedPosts && postData.relatedPosts.length > 0 && (
        <section className="bg-surface-container-low py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-zinc-500 dark:text-on-surface-variant">
                  Sigue leyendo
                </h2>
                <h3 className="text-3xl font-bold tracking-[-0.03em] text-black dark:text-white">
                  Artículos relacionados
                </h3>
              </div>
              <a
                href="/"
                className="border-b border-black pb-1 text-sm font-bold text-black dark:border-white dark:text-white"
              >
                Ver archivo
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {postData.relatedPosts.map(post => (
                <RelatedPostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  resume={post.resume}
                  category={post.category}
                  date={post.date}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
