import { ClientsSection } from "@/components/sections/ClientsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  CasesShowcase,
  Credibility,
  Differentials,
  HomeHero,
  Insights,
  Methodology,
  Problems,
  Solutions,
} from "@/components/sections/home";
import { getArticles } from "@/lib/articles";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Credibility />
      <ClientsSection />
      <Problems />
      <Solutions />
      <CasesShowcase />
      <Differentials />
      <Methodology />
      <Insights articles={getArticles().slice(0, 3)} />
      <CtaBand />
    </>
  );
}
