import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import homeStyles from "../styles/home.module.css";
import { getSortedPostsData } from "../lib/posts";
import PostCard from "../components/postCard";
import PostCarousel from "../components/postCarousel";
import { useTheme } from "../contexts/themeContext";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const { view } = useTheme();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={homeStyles.hero}>
        <h1 className={homeStyles.heroTitle}>Blog de Nicolás Saporiti</h1>
        <p className={homeStyles.heroSubtitle}>
          Notas sobre tecnología, programación y Bitcoin.
        </p>
      </section>

      {view === 'carousel' && <PostCarousel posts={allPostsData} />}

      {view !== 'carousel' && (
        <section className={view === 'grid' ? homeStyles.grid : homeStyles.list}>
          {allPostsData.map(({ id, date, title, resume, image, author }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              date={date}
              resume={resume}
              image={image}
              author={author}
              view={view}
            />
          ))}
        </section>
      )}
    </Layout>
  );
}
