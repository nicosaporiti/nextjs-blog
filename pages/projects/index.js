import Head from 'next/head';
import Layout from '../../components/layout';
import { projects } from '../../lib/projects';

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Proyectos - Nicolás Saporiti</title>
      </Head>

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-primary mb-4 leading-[1.05]">
          Proyectos
        </h1>
        <p className="text-lg text-on-surface-variant mb-12 max-w-xl">
          Herramientas y experimentos que he construido para resolver problemas reales.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col overflow-hidden rounded-xl bg-surface-container-low hover:bg-surface-container transition-all ${
                i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold tracking-tight text-primary">
                      {project.name}
                    </h2>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/50">
                  <span className="text-label-sm uppercase tracking-widest text-on-surface-variant">
                    {project.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  );
}
