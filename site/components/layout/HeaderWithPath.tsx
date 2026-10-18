"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/content/site";
import { Header } from "./Header";

/** Isola o usePathname (exige <Suspense> com cacheComponents em rotas com params). */
export function HeaderWithPath({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  return <Header pathname={pathname} nav={nav} />;
}
