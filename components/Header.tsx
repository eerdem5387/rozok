"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  const navItems = [
    { href: "/", label: "Anasayfa" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/okullar", label: "Üye Okullar" },
    { href: "/haberler", label: "Duyurular" },
    { href: "/iletisim", label: "İletişim" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-primary/10 shadow-sm">
      {/* Üst bilgi çubuğu */}
      <div className="bg-primary text-white text-sm">
        <div className="container mx-auto px-4 md:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+904642130000" className="hover:opacity-90">
              +90 (464) 213 00 00
            </a>
            <a href="mailto:info@rizeozelokullar.org.tr" className="hover:opacity-90">
              info@rizeozelokullar.org.tr
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>TR</span>
            <span>Merkez, Rize</span>
          </div>
        </div>
      </div>
      {/* Navigasyon */}
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image src="/rozok-logo.svg" alt="Rize Özel Okullar Birliği" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-none">
              Rize Özel Okullar Birliği
            </h1>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-700 dark:text-slate-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
            href="/bursluluk"
            className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            Hemen Başvur
          </Link>
      </div>
    </header>
  );
}
