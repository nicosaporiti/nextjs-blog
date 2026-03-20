export default function Footer() {
  return (
    <footer className='mt-auto w-full bg-zinc-50 py-12 dark:bg-zinc-950'>
      <div className='flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto px-6 gap-6'>
        <div className='text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400'>
          &copy; {new Date().getFullYear()} Nicolás Saporiti. Construido con
          elegancia sustractiva.
        </div>
        <div className='flex gap-8'>
          <a
            href='https://x.com/nicosaporiti_'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-all duration-300 ease-in-out hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-zinc-100'
          >
            Twitter
          </a>
          <a
            href='https://github.com/nicosaporiti'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-all duration-300 ease-in-out hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-zinc-100'
          >
            GitHub
          </a>
          <a
            href='https://www.linkedin.com/in/nicolas-jorge-saporiti-1619391a/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-all duration-300 ease-in-out hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-zinc-100'
          >
            LinkedIn
          </a>
          <a
            href='https://payments.saporiti.cl/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[0.6875rem] font-normal uppercase tracking-[0.16em] text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-all duration-300 ease-in-out hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-zinc-100'
          >
            Donar Sats
          </a>
        </div>
      </div>
    </footer>
  );
}
