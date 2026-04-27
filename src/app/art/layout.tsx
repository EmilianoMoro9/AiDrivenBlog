import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arte — Emiliano Moro",
  description: "Mi visión sobre arte, tecnología y la red social que quiero construir.",
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
