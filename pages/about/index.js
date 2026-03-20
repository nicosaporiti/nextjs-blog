import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import { projects } from '../../lib/projects';

export default function About() {
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 3);
  const wideProject = projects[3];
  const socialLinks = [
    {
      name: 'Twitter',
      handle: 'nicosaporiti_',
      href: 'https://x.com/nicosaporiti_',
    },
    {
      name: 'GitHub',
      handle: 'nicosaporiti',
      href: 'https://github.com/nicosaporiti',
    },
    {
      name: 'LinkedIn',
      handle: 'Nicolás Saporiti',
      href: 'https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/',
    },
    { name: 'RSS', handle: 'rss.xml', href: '/rss.xml' },
  ];

  return (
    <Layout>
      <Head>
        <title>Acerca de - Nicolás Saporiti</title>
      </Head>

      <main className='max-w-5xl mx-auto px-6 pt-32 pb-24'>
        <section className='mb-24 grid grid-cols-1 items-end gap-12 md:mb-32 md:grid-cols-12'>
          <div className='md:col-span-8'>
            <h1 className='mb-8 text-[3rem] font-bold leading-[1.1] tracking-[-0.04em] text-black md:text-[5rem] dark:text-white'>
              Construyendo para siempre aprender.
            </h1>
            <p className='max-w-xl text-lg leading-relaxed text-on-surface-variant'>
              Hola!, soy Nicolás Saporiti. Nací en Mendoza, padre de familia y
              desde el año 2005 vivo en Chile. De profesión Licenciado en
              Administración y Magister en Dirección Financiera.
            </p>
          </div>
          <div className='flex md:col-span-4 md:justify-end'>
            <div className='h-80 w-64 overflow-hidden rounded-lg bg-surface-container-low'>
              <img
                src='/images/nsaporiti.jpeg'
                alt='Nicolás Saporiti'
                className='h-full w-full object-cover grayscale'
              />
            </div>
          </div>
        </section>

        <section className='mb-24 grid grid-cols-1 gap-12 md:mb-32 md:grid-cols-12'>
          <div className='md:col-span-4'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-on-surface-variant'>
              Trayectoria
            </h2>
          </div>
          <div className='md:col-span-8'>
            <div className='max-w-2xl space-y-6 text-lg leading-relaxed text-on-surface'>
              <p>
                Soy CEO desde 2005 de una empresa industrial tradicional pero
                siempre fui un apasionado por los avances tecnológicos. Creo que
                la tecnología nos ayuda a encontrar nuestra mejor versión.
              </p>
              <p>
                Pensé compartir notas sobre mi experiencia personal aplicando
                soluciones digitales en distintos ámbitos. No pretendo generar
                artículos técnicos, simplemente posteo reflexiones personales en
                este largo proceso de aprendizaje. Quizás alguna nota sea de tu
                interés!
              </p>
            </div>
          </div>
        </section>

        <section className='mb-24 md:mb-32'>
          <h2 className='mb-12 text-xs font-bold uppercase tracking-widest text-on-surface-variant'>
            Proyectos seleccionados
          </h2>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            <a
              href={featuredProject.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative overflow-hidden rounded-xl bg-surface-container-low shadow-sm transition-all duration-500 hover:shadow-xl md:col-span-2 md:row-span-2 dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
            >
              <div className='p-8'>
                <div className='mb-2 flex items-center justify-between'>
                  <h3 className='text-2xl font-semibold tracking-tight text-black dark:text-white'>
                    {featuredProject.name}
                  </h3>
                  <span className='rounded bg-surface-container-highest px-2 py-1 text-xs font-medium text-on-surface-variant'>
                    {featuredProject.year}
                  </span>
                </div>
                <p className='max-w-md text-on-surface-variant'>
                  {featuredProject.description}
                </p>
              </div>
            </a>

            {secondaryProjects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group overflow-hidden rounded-xl bg-surface-container-low transition-all duration-300'
              >
                <div className='p-6'>
                  <h3 className='text-lg font-semibold text-black dark:text-white'>
                    {project.name}
                  </h3>
                  <p className='mt-1 text-sm text-on-surface-variant'>
                    {project.description}
                  </p>
                </div>
              </a>
            ))}

            <a
              href={wideProject.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex flex-col overflow-hidden rounded-xl bg-surface-container-low md:col-span-3 md:flex-row'
            >
              <div className='flex-1 p-8 md:p-12'>
                <h3 className='mb-4 text-2xl font-semibold text-black dark:text-white'>
                  {wideProject.name}
                </h3>
                <p className='mb-6 max-w-sm text-on-surface-variant'>
                  {wideProject.description}
                </p>
                <span className='inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-medium transition-all group-hover:gap-4'>
                  Ver caso
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M5 12h14' />
                    <path d='m12 5 7 7-7 7' />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className='mb-24 md:mb-32'>
          <h2 className='mb-12 text-xs font-bold uppercase tracking-widest text-on-surface-variant'>
            Conectar y seguir
          </h2>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {socialLinks.map(({ name, handle, href }) => (
              <a
                key={name}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='group flex flex-col rounded-lg bg-surface-container-low p-6 transition-colors hover:bg-surface-container-high'
              >
                <span className='mb-8 text-xs text-on-surface-variant'>
                  {name}
                </span>
                <div className='flex items-center justify-between gap-3'>
                  <span className='font-medium text-black dark:text-white'>
                    {handle}
                  </span>
                  <span className='text-sm opacity-0 transition-opacity group-hover:opacity-100'>
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
