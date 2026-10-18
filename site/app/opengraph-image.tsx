import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "SPAC Gestão — Estratégia que se transforma em resultado.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Recursos carregados em escopo de módulo (recomendação do Next 16 com Cache Components).
const fontDir = join(process.cwd(), "node_modules/@fontsource/nunito/files");
const regular = await readFile(join(fontDir, "nunito-latin-400-normal.woff"));
const extraBold = await readFile(join(fontDir, "nunito-latin-800-normal.woff"));
const logo = await readFile(join(process.cwd(), "public/brand/spac-logo-fundo-escuro.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#100C04",
          backgroundImage:
            "radial-gradient(120% 75% at 50% 120%, rgba(150,102,10,0.55) 0%, rgba(16,12,4,0) 62%)",
          color: "#FFFFFF",
          fontFamily: "Nunito",
        }}
      >
        <img src={logoSrc} width={132} height={91} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 4, color: "#C9CDD2" }}>
            CONSULTORIA DE GESTÃO EMPRESARIAL
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 24, fontSize: 84, lineHeight: 1, letterSpacing: -3 }}>
            <span style={{ fontWeight: 400 }}>Estratégia que se transforma em&nbsp;</span>
            <span style={{ fontWeight: 800, color: "#F3D7A6" }}>resultado.</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: regular, weight: 400, style: "normal" },
        { name: "Nunito", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
