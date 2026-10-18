import { TrajectoryArt } from "@/components/graphics/TrajectoryArt";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Em } from "@/components/ui/SectionHeader";

/** Faixa de conversão: convite para uma conversa executiva, sem linguagem agressiva. */
export function CtaBand({
  title,
  lead = "Uma conversa direta com um sócio da SPAC para entender o momento da sua empresa e onde está o maior potencial de resultado.",
}: {
  title?: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="bg-spac-dark relative isolate overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-60 max-md:opacity-35 md:w-2/3 [mask-image:linear-gradient(to_right,transparent,black_45%)]">
        <TrajectoryArt seed={3} count={12} className="size-full" />
      </div>
      <div className="container-spac section-y relative">
        <Reveal>
          <p className="t-kicker text-gray-300">Próximo passo</p>
          <h2 className="t-display-s mt-8 max-w-[16ch]">
            {title ?? (
              <>
                Vamos conversar sobre o <Em gold>próximo ciclo</Em> da sua empresa?
              </>
            )}
          </h2>
          <p className="t-lead mt-8 max-w-[46ch] text-gray-200">{lead}</p>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contato">Agendar uma conversa</ButtonLink>
            <ButtonLink href="/metodologia" variant="outline-light" arrow={false}>
              Entender o método
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
