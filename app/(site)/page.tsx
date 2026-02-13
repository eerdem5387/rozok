import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Modern okul binası görseli (gri-beyaz, banner arka planı için)
const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80";

type NewsCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  dateStr: string;
  image: string;
};

// Anasayfa haber kartları için placeholder (veritabanında haber yoksa)
const PLACEHOLDER_NEWS: NewsCard[] = [
  {
    slug: "egitimde-yenilikci-yaklasimlar-semineri",
    title: "Eğitimde Yenilikçi Yaklaşımlar Semineri Tamamlandı",
    excerpt:
      "Rize genelindeki öğretmenlerimizin katılımıyla gerçekleşen seminerde dijital dönüşüm ele alındı...",
    category: "ETKİNLİK",
    dateStr: "12 Şubat 2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTpApVSi7sy0knZIBIyF2QoJKl0FH2hxLyjQyvl7SwjjkOBvuXJ-uMP1cpVbu6v-z52YYLiXiZhXidmQesP_oiClGp9BApbyifWytEQhR2xxOCx6sgFIjjhsBKDJ02DWM_c5Iunk-XxuO-s_XuZ3GqdgZsZLZapCX5yla_yDGMTsPUU3B__EkYOPYJXu3CgYAURcvoUbRObdkWe2UtUzQ3-ja9FBQLN6fPf6OM7wl0VdHaLOGGR4DTDc3cr7bRtPBgXajN3Urz4NY",
  },
  {
    slug: "yks-gurur-tablomuz",
    title: "YKS Gurur Tablomuz Yayınlandı",
    excerpt:
      "Üye okullarımızın öğrencileri bu yıl da Türkiye dereceleriyle bizleri gururlandırdı.",
    category: "BAŞARI",
    dateStr: "05 Şubat 2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD59_tAUjbxZwELgCJCt02yP4XVXUeVVCtKxGgWDNHm0zp4qYF4ClidOEXYll_VuGSud-sBc0ONN5k58-pfcQeYYWtcOmjCyd_tUfKVa77pP6RI4K8dWNsyjdDhtXP18HPn5-7wwRcjlCt_MOZ92ZvCBe1fHHqoZ6ML822j1lejeiZxo7pY37NaWxMXa7paZnQMSQIh3VjHcSI-pvDc4iMmSrbBf6N7xHQ8Al-2RTZsOE5x5lcx5s_40wDAUWmJvER-P5cZWKjd6MI",
  },
  {
    slug: "bursluluk-sinavi-kilavuzu",
    title: "2026-2027 Bursluluk Sınavı Kılavuzu Yayınlandı",
    excerpt:
      "Sınav kapsamı, soru dağılımı ve burs oranları hakkında detaylı bilgilere ulaşabilirsiniz...",
    category: "DUYURU",
    dateStr: "28-29 Mart 2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWo32xf0knrEzVYXW-5PNLw2IjChFCLJj1CUmuJeVRzpQJzV98gibLb-b4iI7FlDTP7tAFGJnY68LXgNgDRMORf0AJOaYV7acDV300XvG-GGGU9v23rjuudRICP3G-u4xAsxsEBVXnpirJu-iBHHBlQJ3i7iEaT1u10B0t1DkwEXnQj9mTaGBSJXs2GTn4deMywbxIFdL52mQrBE6mY6KWyYyIFqCAS1orct8ZuQ3Q62vS1qBE71rgK1_yiQ-Wug6Ev7GVZ7kUDGA",
  },
];

export default async function HomePage() {
  const newsRows = await prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  const newsCards: NewsCard[] =
    newsRows.length > 0
      ? newsRows.map((n: { slug: string; title: string; excerpt: string | null; category: string; publishedAt: Date; image: string | null }) => ({
          slug: n.slug,
          title: n.title,
          excerpt: n.excerpt || "",
          category: n.category.toUpperCase(),
          dateStr: new Date(n.publishedAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          image: n.image || PLACEHOLDER_NEWS[0].image,
        }))
      : PLACEHOLDER_NEWS;
  return (
    <>
      {/* Hero Banner - Okul binası arka plan, sol metin, sağda bursluluk kartı */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Arka plan: modern okul binası, hafif bulanık ve yarı saydam */}
        <div className="absolute inset-0 z-0">
          <Image
            alt=""
            src={HERO_BACKGROUND}
            fill
            className="object-cover scale-105"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"
            aria-hidden
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Sol: Tanıtım içeriği */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-rize-green/90 text-white text-sm font-semibold mb-6">
                Eğitimde Birlik, Gelecekte Güven
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Rize Özel Okullar Birliği Geleceği{" "}
                <span className="text-blue-300 block md:inline">Şekillendiriyor.</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-200 max-w-xl mb-8 leading-relaxed">
                Rize&apos;deki özel ortaokul ve liselerimiz, akademik başarı ve karakter
                gelişimi için tek çatı altında birleşiyor.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/okullar"
                  className="bg-primary text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                >
                  Üye Okulları Keşfet
                  <span className="material-icons text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/hakkimizda"
                  className="bg-white/95 text-slate-900 px-6 py-3.5 rounded-lg font-semibold border-2 border-primary/30 hover:bg-white transition-all"
                >
                  Birlik Hakkında
                </Link>
              </div>
            </div>

            {/* Sağ: Bursluluk Sınavı kartı */}
            <div className="md:col-span-6 lg:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 text-slate-100 dark:text-slate-800 select-none pointer-events-none text-7xl font-bold">
                  ★
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-icons text-primary text-2xl">school</span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      2026-2027 Bursluluk Sınavı
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    Akademik Burs Fırsatı
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-rize-green text-white text-xs font-bold uppercase mb-6">
                    Ücretsiz Sınav
                  </div>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-primary">8. SINIF</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Bursluluk Sınavı
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                        Sınav Tarihi
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        28-29 Mart 2026
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">
                        Diğer Sınıflar
                      </p>
                      <p className="font-bold text-slate-900 dark:text-white">
                        9, 10, 11
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/bursluluk"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
                  >
                    Hemen Başvur
                    <span className="material-icons">arrow_forward</span>
                  </Link>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                    * Son başvuru tarihi: 26 Mart 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Üye okul logoları - Banner hemen altı */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-8">
            Üye Okullarımız
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16">
            {[
              { slug: "bahcesehir-koleji", name: "Bahçeşehir Koleji", ext: "jpg" },
              { slug: "cozum-koleji", name: "Çözüm Koleji", ext: "png" },
              { slug: "levent-koleji", name: "Levent Koleji", ext: "png" },
              { slug: "poyraz-koleji", name: "Poyraz Koleji", ext: "png" },
            ].map((school) => (
              <Link
                key={school.slug}
                href={`/okullar/${school.slug}`}
                className="group flex flex-col items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-700 group-hover:border-primary/30 group-hover:shadow-md transition-all">
                  <Image
                    src={`/${school.slug}.${school.ext}`}
                    alt={school.name}
                    width={120}
                    height={120}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="text-sm font-semibold text-center max-w-[140px]">
                  {school.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Haberler ve Duyurular - Logoların hemen altı (HTML tasarımı) */}
      <section className="bg-background-light dark:bg-background-dark/50 py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Haberler ve Duyurular
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Birlikten en son gelişmeler, etkinlikler ve eğitim haberleri.
              </p>
            </div>
            <Link
              href="/haberler"
              className="text-primary font-semibold inline-flex items-center hover:underline shrink-0"
            >
              Tümünü Gör
              <span className="material-icons text-sm ml-1">arrow_forward</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {newsCards.map((item: NewsCard) => (
              <Link
                key={item.slug}
                href={`/haberler/${item.slug}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={192}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-rize-green mb-2 block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-slate-400 dark:text-slate-500 text-xs">
                    <span className="material-icons text-xs mr-1">calendar_today</span>
                    {item.dateStr}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
