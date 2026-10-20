/**
 * Clientes exibidos na seção "Clientes" da home.
 *
 * Regras:
 * - Só os 16 clientes abaixo; não adicionar nomes sem aprovação da SPAC.
 * - Cada logo é um arquivo individual em /public/clientes/ (SVG ou PNG com fundo transparente),
 *   na versão oficial e com as cores originais da marca, validada contra a imagem de referência.
 * - `logo: null` = arquivo ainda não validado: o cliente NÃO aparece no site.
 *   A seção inteira só é exibida quando há pelo menos uma logo validada.
 * - O tamanho de cada logo já é equilibrado automaticamente pela proporção do arquivo.
 *   `scale` (opcional, padrão 1) faz o ajuste fino: ~0.82 para logos com painel de fundo
 *   (parecem mais pesadas), >1 para logos muito vazadas.
 *
 * Origem dos arquivos atuais: recortados da imagem de referência "Onde fizemos" enviada pela SPAC
 * (não são arquivos oficiais de alta resolução). Substituir pelos oficiais quando disponíveis,
 * mantendo o mesmo nome de arquivo e atualizando width/height.
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
  { name: "ABC Supermercados", segment: "Rede de supermercados de Minas Gerais", logo: "/clientes/abc-supermercados.png", width: 600, height: 254 },
  { name: "Big Box Supermercados", segment: "Rede de supermercados de Brasília/DF", logo: "/clientes/big-box-supermercados.png", width: 600, height: 141 },
  { name: "Grupo Zelo", segment: "Serviços funerários e cemitérios", logo: "/clientes/grupo-zelo.png", width: 492, height: 330, scale: 0.82 },
  { name: "VLI Logística", segment: "Logística ferroviária, portos e terminais", logo: "/clientes/vli-logistica.png", width: 600, height: 314 },
  { name: "Apoio Atacado e Varejo", segment: "Supermercados e atacado de Minas Gerais", logo: "/clientes/apoio-atacado-varejo.png", width: 600, height: 283 },
  { name: "Supermercados Nagumo", segment: "Rede de supermercados de São Paulo", logo: "/clientes/supermercados-nagumo.png", width: 600, height: 182 },
  { name: "Banana Brasil", segment: "Indústria de alimentos e snacks saudáveis", logo: "/clientes/banana-brasil.png", width: 302, height: 330, scale: 0.82 },
  { name: "Supermercados REX", segment: "Rede de supermercados de Minas Gerais", logo: "/clientes/supermercados-rex.png", width: 600, height: 317, scale: 0.92 },
  { name: "BORA", segment: "Marca BORA (conferida com a imagem de referência da SPAC)", logo: "/clientes/bora.png", width: 481, height: 330, scale: 0.82 },
  { name: "Paraibuna Embalagens", segment: "Papel e embalagens, Juiz de Fora/MG", logo: "/clientes/paraibuna-embalagens.png", width: 600, height: 147 },
  { name: "Expand", segment: "Marca EXPAND (conferida com a imagem de referência da SPAC)", logo: "/clientes/expand.png", width: 600, height: 299, scale: 0.82 },
  { name: "Supernosso", segment: "Rede de supermercados de Belo Horizonte/MG", logo: "/clientes/supernosso.png", width: 550, height: 330, scale: 1.1 },
  { name: "Porcão", segment: "Restaurantes e churrascarias", logo: "/clientes/porcao.png", width: 447, height: 330, scale: 0.82 },
  { name: "TopFood Alimentos", segment: "Alimentos (conferida com a imagem de referência da SPAC)", logo: "/clientes/topfood-alimentos.png", width: 600, height: 272, scale: 0.82 },
  { name: "Interweg Seguros", segment: "Corretora de seguros", logo: "/clientes/interweg-seguros.png", width: 581, height: 330, scale: 0.82 },
  { name: "it. ARQ", segment: "Escritório de arquitetura", logo: "/clientes/it-arq.png", width: 197, height: 313, scale: 0.9 },
];

/** Clientes com logo validada — os únicos exibidos no site. */
export function clientsWithLogo() {
  return clients.filter(
    (c): c is Client & { logo: string; width: number; height: number } =>
      Boolean(c.logo && c.width && c.height),
  );
}
