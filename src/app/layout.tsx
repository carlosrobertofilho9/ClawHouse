import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Home, List, Settings } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClawHouse",
  description: "O lar virtual do seu agente pessoal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <header className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <h1 className="text-lg font-bold text-neutral-900">ClawHouse</h1>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink href="/" icon={<Home className="w-4 h-4" />} label="Casa" />
              <NavLink href="/timeline" icon={<List className="w-4 h-4" />} label="Timeline" />
              <NavLink href="/settings" icon={<Settings className="w-4 h-4" />} label="Config" />
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
