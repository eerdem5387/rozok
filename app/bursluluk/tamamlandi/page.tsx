"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TamamlandiContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "#ROB-2026-8821";

  return (
    <>
      <header className="w-full py-4 px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="material-icons text-primary">school</span>
            </div>
            <div>
              <h1 className="text-slate-900 dark:text-white font-bold text-lg leading-tight uppercase tracking-tight">
                Rize Özel Okullar Birliği
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Bursluluk Sınavı Başvuru Sistemi
              </p>
            </div>
          </Link>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            2026-2027 Eğitim Yılı
          </span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900/50 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="pt-12 pb-8 px-8 text-center bg-gradient-to-b from-primary/10 to-transparent">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full shadow-lg shadow-primary/30 mb-6">
              <span className="material-icons text-white text-5xl">check</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Başvurunuz Başarıyla Alınmıştır
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Tebrikler! Bursluluk sınavı başvurunuz sistemimize kaydedilmiştir.
              Detayları aşağıda bulabilirsiniz.
            </p>
          </div>
          <div className="px-8 pb-8">
            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50 mb-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Başvuru Referans No
                </span>
                <span className="text-lg font-bold text-primary font-mono">
                  {ref}
                </span>
              </div>
              <div className="text-center py-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Sınav Tarihi
                </p>
                <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  28 - 29 Mart 2026
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 bg-primary/10 dark:bg-primary/20 p-4 rounded-lg border border-primary/20 dark:border-primary/30 mb-8">
              <span className="material-icons text-primary text-xl shrink-0">sms</span>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Sınav bilgileriniz SMS yoluyla tarafınıza iletilecektir.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-lg transition-all shadow-lg"
              >
                <span className="material-icons">home</span>
                <span>Ana Sayfaya Dön</span>
              </Link>
              <Link
                href="/haberler"
                className="flex-1 flex items-center justify-center space-x-2 bg-white dark:bg-transparent border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300 font-bold py-4 px-6 rounded-lg transition-all"
              >
                <span className="material-icons">article</span>
                <span>Duyurular</span>
              </Link>
            </div>
          </div>
          <div className="relative h-24 w-full overflow-hidden opacity-30 dark:opacity-20 grayscale">
            <Image
              alt="Eğitim Temalı Arkaplan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzIqmjdjJFy8iwbvlVZNaayi77N9souzydFES0j68aUyucxie1iR-G6Aauu6RWwPa9zSGzoce1LsNw7XMUS_l4bop2vRifDu3PyFzxKHPcflX8U9WprGsgWmdrlR67Fgo-kGt1y5uOv9L0akDRnxYp-NHVgjviqHlSsdXK-0pKDc_CzKfwakxJIyFjwpou0YZyYW1eIwvRkA_lGe0TcvwWGE60dlhCGnglZmKP8GMnWf4jNfHt5XBSL8_6Y59Y90YHPhkxZSPlfDg"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>© 2026 Rize Özel Okullar Birliği - Tüm Hakları Saklıdır.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="#" className="hover:text-primary transition-colors">
            KVKK Aydınlatma Metni
          </Link>
          <span>•</span>
          <Link href="/iletisim" className="hover:text-primary transition-colors">
            İletişim
          </Link>
        </div>
      </footer>
    </>
  );
}

export default function BurslulukTamamlandiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center">Yükleniyor...</div>}>
        <TamamlandiContent />
      </Suspense>
    </div>
  );
}
