export default function PopularTopics({ posts }) {
  const categoryCount = {};
  posts.forEach(post => {
    if (post.category) {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    }
  });

  const categories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);

  return (
    <section>
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-on-surface-variant mb-8">
        Temas populares
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {categories.map(([category, count]) => (
          <div
            key={category}
            className="group flex items-center justify-between p-4 bg-zinc-50 dark:bg-surface-container-low hover:bg-zinc-100 dark:hover:bg-surface-container-high transition-colors rounded-md"
          >
            <span className="text-sm font-medium text-zinc-800 dark:text-on-surface">{category}</span>
            <span className="text-xs text-zinc-400 dark:text-outline group-hover:text-zinc-900 dark:group-hover:text-white">
              {String(count).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
