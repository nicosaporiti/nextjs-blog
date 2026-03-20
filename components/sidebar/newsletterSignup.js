export default function NewsletterSignup() {
  return (
    <section className="p-8 bg-black dark:bg-surface-container-highest rounded-xl text-white">
      <h2 className="text-xl font-bold mb-4 tracking-tight">Despacho del domingo</h2>
      <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
        Notas breves sobre ingeniería, sistemas y el futuro de la arquitectura digital.
      </p>
      <a
        href="mailto:nicolas@saporiti.cl?subject=Quiero%20suscribirme%20al%20Despacho%20del%20domingo"
        className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200"
      >
        Escribirme para suscribirme
      </a>
    </section>
  );
}
