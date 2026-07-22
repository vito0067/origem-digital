import Reveal from "./Reveal";

export default function Statement() {
  return (
    <section aria-label="Posicionamento" className="relative py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="font-display text-2xl font-medium leading-snug text-white sm:text-4xl">
            Não criamos apenas sites.{" "}
            <span className="text-gradient-neon">
              Construímos sistemas que trabalham para a sua empresa 24 horas
              por dia.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
