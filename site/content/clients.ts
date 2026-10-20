/**
 * Clientes exibidos na seção "Clientes" da home.
 *
 * Regras:
 * - Só os 16 clientes abaixo; não adicionar nomes sem aprovação da SPAC.
 * - Cada logo é um arquivo individual em /public/clientes/ (SVG ou PNG com fundo transparente),
 *   na versão oficial e com as cores originais da marca, validada contra a imagem de referência.
 * - `logo: null` = arquivo ainda não validado: o cliente NÃO aparece no site.
 *   A seção inteira só é exibida quando há pelo menos uma logo validada.
 * - `scale` (opcional, padrão 1) equilibra o peso visual entre marcas horizontais e verticais.
 *   Ex.: 0.85 para logos muito largas, 1.15 para logos quadradas/compactas.
 */
export type Client = {
  name: string;
  /** Identificação para validar a marca correta (não aparece no site). */
  segment: string;
  /** Caminho em /public, ex.: "/clientes/abc-supermercados.svg". */
  logo: string | null;
  /** Dimensões reais do arquivo (necessárias para o next/image manter a proporção). */
  width?: number;
  height?: number;
  scale?: number;
};

export const clients: Client[] = [
  { name: "ABC Supermercados", segment: "Rede de supermercados de Minas Gerais", logo: null },
  { name: "Big Box Supermercados", segment: "Rede de supermercados de Brasília/DF", logo: null },
  { name: "Grupo Zelo", segment: "Serviços funerários e cemitérios", logo: null },
  { name: "VLI Logística", segment: "Logística ferroviária, portos e terminais", logo: null },
  { name: "Apoio Atacado e Varejo", segment: "Supermercados e atacado de Minas Gerais", logo: null },
  { name: "Supermercados Nagumo", segment: "Rede de supermercados de São Paulo", logo: null },
  { name: "Banana Brasil", segment: "Indústria de alimentos e snacks saudáveis", logo: null },
  { name: "Supermercados REX", segment: "Rede de supermercados de Minas Gerais", logo: null },
  { name: "BORA", segment: "Marca BORA (validar pela imagem de referência)", logo: null },
  { name: "Paraibuna Embalagens", segment: "Papel e embalagens, Juiz de Fora/MG", logo: null },
  { name: "Expand", segment: "Marca EXPAND (validar pela imagem de referência)", logo: null },
  { name: "Supernosso", segment: "Rede de supermercados de Belo Horizonte/MG", logo: null },
  { name: "Porcão", segment: "Restaurantes e churrascarias", logo: null },
  { name: "TopFood Alimentos", segment: "Alimentos (validar pela imagem de referência)", logo: null },
  { name: "Interweg Seguros", segment: "Corretora de seguros", logo: null },
  { name: "it. ARQ", segment: "Escritório de arquitetura", logo: null },
];

/** Clientes com logo validada — os únicos exibidos no site. */
export function clientsWithLogo() {
  return clients.filter(
    (c): c is Client & { logo: string; width: number; height: number } =>
      Boolean(c.logo && c.width && c.height),
  );
}
