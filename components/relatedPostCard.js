import Link from 'next/link';

function getYear(date) {
  return typeof date === 'string' ? date.slice(0, 4) : '';
}

export default function RelatedPostCard({ id, title, resume, category, date }) {
  return (
    <Link
      href={`/posts/${id}`}
      className="group block bg-white p-6 transition-all duration-300 hover:bg-zinc-50 dark:bg-surface-container dark:hover:bg-surface-container-high sm:p-8"
    >
      <div className="mb-4 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-on-surface-variant">
        {category ? `${category}${getYear(date) ? ` — ${getYear(date)}` : ''}` : getYear(date)}
      </div>
      <h4 className="mb-3 text-xl font-bold tracking-[-0.03em] text-black decoration-2 underline-offset-4 group-hover:underline dark:text-white">
        {title}
      </h4>
      {resume && (
        <p className="line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-on-surface-variant">
          {resume}
        </p>
      )}
    </Link>
  );
}
