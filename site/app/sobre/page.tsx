import { PartnersSection, PositioningSection, PurposeValues, StorySection } from "@/components/sections/about";
import { CtaBand } from "@/components/sections/CtaBand";
import { Differentials } from "@/components/sections/home";
import { PageHero } from "@/components/sections/PageHero";
import { Em } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sobre a SPAC",
  description:
    "Consultoria de gestão criada por executivos com experiência em grandes operações. Método proprietário, sêniores na linha de frente e inteligência artificial integrada à entrega.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        kicker="Sobre a SPAC"
        title={
          <>
            Experiência de quem já esteve <Em gold>do lado de dentro.</Em>
          </>
        }
        lead="Somos uma consultoria de gestão. Transformamos problemas empresariais em melhoria efetiva de resultado, com a profundidade de uma grande consultoria e a proximidade que a média empresa precisa."
      />
      <PositioningSection index="01" />
      <StorySection index="02" />
      <PurposeValues index="03" />
      <PartnersSection index="04" />
      <Differentials index="05" />
      <CtaBand />
    </>
  );
}
