import Link from 'next/link';
import Date from './date';

export default function ArticleListItem({ id, title, date, resume, category, tags }) {
  return (
    <article className="group">
      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
        <time className="text-sm font-medium text-zinc-400 dark:text-on-surface-variant w-24 shrink-0">
          <Date dateString={date} />
        </time>
        <div className="flex-1">
          {tags && tags.length > 0 && (
            <div className="flex gap-3 mb-3">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-on-surface-variant px-2 py-1 bg-zinc-100 dark:bg-surface-container-low rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:underline underline-offset-8 decoration-zinc-300 dark:decoration-zinc-700 transition-all mb-4">
            <Link href={`/posts/${id}`}>
              {title}
            </Link>
          </h3>
          {resume && (
            <p className="text-sm text-zinc-500 dark:text-on-surface-variant leading-relaxed">
              {resume}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
