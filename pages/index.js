import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
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
      <section className={utilStyles.headingMd}>
        <p>
          Mi nombre es <strong>Nicolás Saporiti</strong>. Nací y crecí en
          Mendoza - Argentina. Dese el año 2005 vivo en Chile. Soy CEO de{" "}
          <a href="https://www.agrominera.cl/" target="_blank">
            Agrominera
          </a>
          , Licenciado en Administración y Magister en Dirección Financiera.
        </p>
        <p>
          Creo que la tecnología nos hará mejores personas. Actualmente estoy
          estudiando desarrollo web 💻 Javascript, React, Node y NextJS.
        </p>
        <p>
          Pensé compartir notas sobre mi experiencia personal aplicando
          tecnología en distintos ámbitos. No pretendo que sean notas técnicas,
          simplemente reflexiones personales en este largo proceso de
          aprendizaje.
        </p>
        <p>
          <strong>Quizás sean de tu interés!</strong>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
