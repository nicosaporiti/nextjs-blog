import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef } from "react";
import Date from "../../components/date";
import postStyles from "../../styles/post.module.css";
import wordCounter from "../../components/wordCounter";
import { tipButton as TipButton } from "../../components/tipButton";

export default function Post({ postData }) {
  const readingTime = wordCounter(postData.contentHtml);
  const contentRef = useRef(null);
  const hasTweetEmbed = postData.contentHtml.includes('class="twitter-tweet"');

  useEffect(() => {
    if (!hasTweetEmbed || !window.twttr?.widgets || !contentRef.current) {
      return;
    }

    window.twttr.widgets.load(contentRef.current);
  }, [hasTweetEmbed, postData.contentHtml]);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://blog.saporiti.cl/posts/${postData.id}`}
        />
        <meta property="og:image" content={postData.image} />
        <meta property="og:description" content={postData.resume} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.resume} />
        <meta name="twitter:creator" content="@author_handle" />
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
      <article className={postStyles.article}>
        <div className={postStyles.meta}>
          <span>Por {postData.author}</span>
          <span><Date dateString={postData.date} /></span>
          <span>Lectura de {readingTime} min</span>
        </div>
        <h1 className={postStyles.title}>{postData.title}</h1>
        {postData.resume && (
          <p className={postStyles.excerpt}>{postData.resume}</p>
        )}
        {postData.image && (
          <img
            src={postData.image}
            alt={postData.title}
            className={postStyles.heroImage}
          />
        )}
        <div className={postStyles.actions}>
          <TipButton />
        </div>
        <div
          ref={contentRef}
          className={`post-content ${postStyles.content}`}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
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
