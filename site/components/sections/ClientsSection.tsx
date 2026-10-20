import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Em, SectionHeader } from "@/components/ui/SectionHeader";
import { clientsWithLogo } from "@/content/clients";

/**
 * Clientes: grade de logomarcas individuais (4 colunas no desktop, 3 no tablet, 2 no celular).
 * Logos em cores originais, centralizadas, com proporção preservada e altura óptica equilibrada.
 * A seção não é renderizada enquanto nenhuma logo tiver sido validada (ver content/clients.ts).
 */
export function ClientsSection() {
  const list = clientsWithLogo();
  if (list.length === 0) return null;

  return (
    <section className="section-y bg-gray-100" aria-labelledby="clientes-titulo">
      <div className="container-spac">
        <SectionHeader
          kicker="Clientes"
          title={
            <span id="clientes-titulo">
              Empresas que confiam na SPAC para <Em>transformar estratégia em resultados.</Em>
            </span>
          }
        />
        <Stagger
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.04}
        >
          {list.map((c) => {
            // Equilíbrio óptico: área visual parecida para marcas horizontais, quadradas e verticais.
            const ratio = c.width / c.height;
            const widthPct = Math.min(78, 38 * Math.sqrt(ratio) * (c.scale ?? 1));
            return (
              <StaggerItem key={c.name}>
                <div className="flex aspect-[3/2] items-center justify-center rounded-card border border-gray-200 bg-white px-5 py-4 transition-colors duration-500 ease-spac hover:border-gold sm:px-8">
                  <Image
                    src={c.logo}
                    alt={`Logomarca ${c.name}`}
                    width={c.width}
                    height={c.height}
                    sizes="(min-width: 1024px) 220px, (min-width: 768px) 200px, 40vw"
                    className="h-auto max-h-[70%] object-contain"
                    style={{ width: `${widthPct.toFixed(1)}%` }}
                  />
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
