import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function HaberDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({
    where: { slug, published: true },
  });

  if (!news) {
    notFound();
  }

  const image =
    news.image ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7tuyMFPUWdLcvqmkBdi590PPrqjBZwW6wvPkC4PsSHVnVZAVqHAiLi7DCftD6QkYoMYX2fxxdMQTzXNsXvGNUvfm8XXCgynHBeIjGrUEpAP0vmvAOXiyKoM30dM_ENOa1L6aIrVxM-jckzHnRidFvaCkBoDvHSrgehm-QH9BbayxWvrrmmZNPUNvIaGvaRL-skqWmPOG0AZ3LatuedwHrweDBgHf1FA0movzcHrZvrTT836C6DLZNzp4DuMZH_-n1pEDj-uYEhDM";
  const dateStr = new Date(news.publishedAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <nav className="mb-8 flex items-center space-x-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">
            Ana Sayfa
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <Link href="/haberler" className="hover:text-primary">
            Haberler
          </Link>
          <span className="material-icons text-xs">chevron_right</span>
          <span className="text-slate-700 dark:text-slate-300 truncate max-w-xs md:max-w-none">
            {news.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg mb-8">
              <Image
                src={image}
                alt={news.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-lg uppercase tracking-wider">
                {news.category}
              </span>
              <span className="flex items-center text-slate-500 text-sm">
                <span className="material-icons text-sm mr-1 text-primary">
                  calendar_today
                </span>
                {dateStr}
              </span>
              <span className="flex items-center text-slate-500 text-sm">
                <span className="material-icons text-sm mr-1 text-primary">
                  visibility
                </span>
                {news.viewCount} Görüntüleme
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-8">
              {news.title}
            </h2>

            <div
              className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between">
              <Link
                href="/haberler"
                className="flex items-center group text-slate-900 dark:text-primary font-bold hover:text-primary transition-all duration-300"
              >
                <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-icons">arrow_back</span>
                </span>
                Tüm Haberlere Geri Dön
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="material-icons mr-2 text-primary">share</span>
                Paylaş
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-colors"
                >
                  <span className="material-icons text-2xl">facebook</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-colors"
                >
                  <span className="material-icons text-2xl">alternate_email</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors"
                >
                  <span className="material-icons text-2xl">message</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
