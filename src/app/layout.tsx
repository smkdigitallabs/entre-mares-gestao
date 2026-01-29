import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entre Marés - Gestão",
  description: "Sistema de gestão profissional para imóveis de temporada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
