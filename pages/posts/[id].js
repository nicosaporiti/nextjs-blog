import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import wordCounter from "../../components/wordCounter";

export default function Post({ postData }) {
  const readingTime = wordCounter(postData.contentHtml);
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <meta property="og:title" content={postData.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://blog.saporiti.cl/" />
        <meta property="og:image" content={postData.image} />
        <meta property="og:description" content={postData.resume} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@publisher_handle" />
        <meta name="twitter:title" content={postData.title} />
        <meta
          name="twitter:description"
          content={postData.resume}
        />
        <meta name="twitter:creator" content="@author_handle" />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={`${utilStyles.lightText} ${utilStyles.inline}`}>
          <p>Por {postData.author} /&nbsp;</p>
          <p>
            <Date dateString={postData.date} />
          </p>
        </div>
        <p className={utilStyles.lightText}>Lectura de {readingTime} min</p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
