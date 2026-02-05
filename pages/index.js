import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import homeStyles from "../styles/home.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import React from "react";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${homeStyles.timelineSection}`}>
        <div
          className={homeStyles.timelineScroller}
          role="region"
          aria-label="Entradas en línea de tiempo"
        >
          <ol className={homeStyles.timeline}>
            {allPostsData.map(({ id, date, title, resume, image }) => (
              <li className={homeStyles.timelineItem} key={id}>
                <div className={homeStyles.timelineContent}>
                  {image && (
                    <img
                      src={image}
                      alt=""
                      className={homeStyles.timelineThumb}
                      loading="lazy"
                    />
                  )}
                  <div className={homeStyles.timelineText}>
                    <span className={homeStyles.timelineDate}>
                      <Date dateString={date} />
                    </span>
                    <Link href={`/posts/${id}`} className={homeStyles.timelineLink}>
                      {title}
                    </Link>
                    {resume && (
                      <p className={homeStyles.timelineResume}>{resume}</p>
                    )}
                  </div>
                </div>
                <span className={homeStyles.timelineDot} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
}
