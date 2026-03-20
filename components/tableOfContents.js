import { useState, useEffect } from 'react';

export default function TableOfContents({ headings, label = 'En esta página' }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="article-toc-scroll max-h-[calc(100vh-10rem)] space-y-6 overflow-y-auto pr-3">
      <p className="text-[0.625rem] font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-on-surface-variant">
        {label}
      </p>
      <nav className="flex flex-col gap-4 text-sm">
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`border-l border-transparent transition-colors ${
              activeId === id
                ? "border-black pl-4 font-semibold text-black dark:border-white dark:text-white"
                : "pl-4 text-zinc-500 hover:text-black dark:text-on-surface-variant dark:hover:text-white"
            } ${level === 3 ? "pl-8 text-[0.8125rem]" : ""}`}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  );
}
