import Image from "next/image";
import { PendingBadge } from "@/components/ui/Pending";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { partners, values, type Partner } from "@/content/institutional";
import { site } from "@/content/site";

/** "A lacuna": a SPAC atua no meio que falta entre o sonho e o controle. */
export function GapSection({ index = "01" }: { index?: string }) {
  const sides = [
    { l: "S", name: "Sonhar", desc: "Visão de longo prazo, ambição, estratégia no papel" },
    { l: "C", name: "Controlar", desc: "Rotina, indicadores e gestão do dia a dia" },
  ];
  return (
    <section className="section-y bg-paper">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Posicionamento"
          title={
            <>
              A maioria das empresas tem o sonho e o controle. <Em>Falta o meio.</Em>
            </>
          }
          lead="Sabemos onde queremos chegar e acompanhamos o dia a dia. O que costuma faltar é transformar ambição em plano executável e plano em resultado medido."
        />
        <Stagger className="mt-16 grid items-stretch gap-4 md:mt-20 md:grid-cols-[1fr_1.25fr_1fr]">
          <StaggerItem className="flex flex-col items-center justify-center rounded-card border border-gray-200 bg-gray-100 p-8 text-center">
            <span className="text-5xl font-extrabold text-gray-500">{sides[0].l}</span>
            <span className="t-h4 mt-4 text-graphite-900">{sides[0].name}</span>
            <span className="mt-3 max-w-[24ch] text-[0.9375rem] text-graphite-700">{sides[0].desc}</span>
          </StaggerItem>
          <StaggerItem className="flex flex-col items-center justify-center rounded-card border border-gold bg-gold-veil px-8 py-12 text-center md:-my-4">
            <span className="t-kicker text-gold-text">A lacuna · onde a SPAC entra</span>
            <span className="mt-5 text-6xl font-extrabold tracking-[-0.03em] text-gold-text">P · A</span>
            <span className="t-h4 mt-4 text-graphite-900">Planejar e Agir</span>
            <span className="mt-3 max-w-[30ch] text-[0.9375rem] text-graphite-900">
              O que transforma ambição em plano executável e plano em resultado medido.
            </span>
          </StaggerItem>
          <StaggerItem className="flex flex-col items-center justify-center rounded-card border border-gray-200 bg-gray-100 p-8 text-center">
            <span className="text-5xl font-extrabold text-gray-500">{sides[1].l}</span>
            <span className="t-h4 mt-4 text-graphite-900">{sides[1].name}</span>
            <span className="mt-3 max-w-[24ch] text-[0.9375rem] text-graphite-700">{sides[1].desc}</span>
          </StaggerItem>
        </Stagger>
        <Reveal className="mt-14 flex max-w-3xl border-l-4 border-gold bg-gold-veil px-6 py-5">
          <p className="text-graphite-900">
            A SPAC une <strong className="font-extrabold">sonho e visão de longo prazo</strong> com{" "}
            <strong className="font-extrabold">controle e gestão no curto prazo</strong>: as duas
            pontas, pelo meio que falta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function StorySection({ index = "02" }: { index?: string }) {
  return (
    <section className="section-y border-t border-gray-200 bg-white">
      <div className="container-spac grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            index={index}
            kicker="Nossa história"
            title={
              <>
                Da gestão de grandes operações <Em>para a média empresa.</Em>
              </>
            }
          />
        </div>
        <Reveal className="space-y-6 text-[1.125rem] leading-relaxed text-graphite-700 lg:col-span-7 lg:pt-24" delay={0.1}>
          <p>
            A SPAC foi criada por executivos que lideraram estratégia, finanças, tecnologia,
            comercial e CRM em empresas de bilhões de reais de faturamento, com projetos no Brasil,
            nos Estados Unidos, no México e no Peru.
          </p>
          <p>
            Dessa experiência veio uma convicção: empresas de médio porte merecem o mesmo nível de
            gestão das grandes, com mais proximidade, mais agilidade e um custo compatível com a sua
            realidade.
          </p>
          <p>
            Por isso combinamos três elementos: <strong className="font-extrabold text-graphite-900">profissionais sêniores</strong> na linha
            de frente, um <strong className="font-extrabold text-graphite-900">método proprietário</strong> e{" "}
            <strong className="font-extrabold text-graphite-900">inteligência artificial</strong> integrada à forma como
            trabalhamos.
          </p>
          <div className="pt-2">
            <PendingBadge>Ano de fundação e marcos a fornecer</PendingBadge>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PurposeValues({ index = "03" }: { index?: string }) {
  return (
    <section className="bg-spac-dark-corner section-y text-white">
      <div className="container-spac">
        <Reveal>
          <p className="t-kicker text-gray-500">
            <span className="text-champagne">{index} — </span>Propósito
          </p>
          <div className="rule mt-5 text-amber-line" />
          <p className="t-display-s mt-12 max-w-[20ch]">
            Democratizar a transformação <Em gold>para todos que querem fazer a diferença.</Em>
          </p>
        </Reveal>
        <div className="mt-20">
          <p className="t-kicker text-gray-500">Valores</p>
          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-card border border-amber-line bg-amber-line sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="flex flex-col bg-amber-950 p-7">
                <span className="t-kicker text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h4 mt-8 text-white">{v.title}</h3>
                <p className="mt-4 text-[0.9375rem] text-gray-300">{v.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ p }: { p: Partner }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-gray-200 bg-white p-7 md:p-9">
      <div className="flex items-center gap-6">
        <div className="relative size-24 shrink-0 rounded-full p-[3px] ring-[1.25px] ring-gold md:size-28">
          {p.photo ? (
            <Image
              src={p.photo}
              alt={`Foto de ${p.name}`}
              width={224}
              height={224}
              className="size-full rounded-full object-cover"
            />
          ) : (
            // Sem foto: monograma com as iniciais, no padrão da marca
            <span
              aria-hidden="true"
              className="bg-spac-dark flex size-full items-center justify-center rounded-full text-[1.75rem] font-extrabold tracking-[-0.02em] text-champagne md:text-[2rem]"
            >
              {p.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
        </div>
        <div>
          <h3 className="t-h3 text-graphite-900">{p.name}</h3>
          <p className="mt-2 text-graphite-700">{p.role}</p>
        </div>
      </div>
      {!p.photo && (
        <div className="mt-5">
          <PendingBadge>Foto a fornecer</PendingBadge>
        </div>
      )}
      <ul className="mt-8 border-t border-gray-200 pt-6">
        {p.highlights.map((h) => (
          <li key={h} className="relative py-1.5 pl-6 text-graphite-700">
            <span aria-hidden="true" className="absolute top-[0.85em] left-0 size-1.5 bg-gold" />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function PartnersSection({ index = "04" }: { index?: string }) {
  return (
    <section id="socios" className="section-y scroll-mt-[var(--header-h)] bg-paper">
      <div className="container-spac">
        <SectionHeader
          index={index}
          kicker="Quem conduz"
          title={
            <>
              Dois sócios com <Em>30 anos somados</Em> em gestão, estratégia e transformação.
            </>
          }
          lead="Os sócios participam diretamente dos projetos. É isso que garante a senioridade na linha de frente."
        />
        <Stagger className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-2">
          {partners.map((p) => (
            <StaggerItem key={p.name}>
              <PartnerCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm text-gray-600">
          Trajetória executiva dos sócios em empresas anteriores à {site.name}.
        </p>
      </div>
    </section>
  );
}
