"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";

/** Isola o usePathname (exige <Suspense> com cacheComponents em rotas com params). */
export function HeaderWithPath() {
  const pathname = usePathname();
  return <Header pathname={pathname} />;
}
