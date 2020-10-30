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
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={`${utilStyles.lightText} ${utilStyles.inline}`}>
          <p>Por {postData.author} /&nbsp;</p>
          <p><Date dateString={postData.date}/></p>
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
