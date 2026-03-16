import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Modern okul binası görseli (gri-beyaz, banner arka planı için)
const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80";

// Anasayfa "Haberler ve Duyurular" alanı için sabit duyurular (tıklanmaz)
const ANA_SAYFA_DUYURULAR = [
  {
    category: "HABER",
    title: "LGS TÜRKİYE GENELİ SINAVI",
    excerpt:
      "28-29 MART 2026 tarihinde RECEP TAYYİP ERDOĞAN ÜNİVERSİTESİ'nde LGS Türkiye Geneli Deneme Sınavı yapılacaktır. Tüm 8.sınıflar davetlidir. Başvuru Ücretsizdir.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  },
  {
    category: "HABER",
    title: "9., 10., 11. SINIF PROVA SINAVLARI",
    excerpt:
      "28-29 MART 2026 tarihinde Lise 9. 10. 11. sınıflar için TYT Prova Sınavı yapılacaktır. Başvuru Ücretsizdir.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
];

export default async function HomePage() {
  return (
    <>
      {/* Hero Banner - Okul binası arka plan, sol metin, sağda bursluluk kartı (ilk ekrana sığacak şekilde kompakt) */}
      <section className="relative min-h-0 flex items-start overflow-hidden">
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

        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-14">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
            {/* Sol: Tanıtım içeriği */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-rize-green/90 text-white text-sm font-semibold mb-4">
                Eğitimde Birlik, Gelecekte Güven
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Rize Özel Okullar Birliği Geleceği{" "}
                <span className="text-blue-300 block md:inline">Şekillendiriyor.</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-slate-200 max-w-xl mb-6 leading-relaxed">
                Rize&apos;deki özel ortaokul ve liselerimiz, akademik başarı ve karakter
                gelişimi için tek çatı altında birleşiyor.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/okullar"
                  className="bg-primary text-white px-5 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 text-sm md:text-base"
                >
                  Üye Okulları Keşfet
                  <span className="material-icons text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/hakkimizda"
                  className="bg-white/95 text-slate-900 px-5 py-3 rounded-lg font-semibold border-2 border-primary/30 hover:bg-white transition-all text-sm md:text-base"
                >
                  Birlik Hakkında
                </Link>
              </div>
            </div>

            {/* Sağ: Bursluluk Sınavı kartı - kompakt, ilk ekrana sığacak */}
            <div className="md:col-span-6 lg:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-3 right-3 w-16 h-16 md:w-20 md:h-20 text-slate-100 dark:text-slate-800 select-none pointer-events-none text-5xl md:text-6xl font-bold">
                  ★
                </div>
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-icons text-primary text-xl md:text-2xl">school</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                      2026-2027 Ortak Katılım Sınavı
                    </h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-2">
                    Akademik Burs Fırsatı
                  </p>
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-rize-green text-white text-xs font-bold uppercase mb-4">
                    Ücretsiz Sınav
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-primary">8. SINIF</p>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                        LGS TÜRKİYE GENELİ SINAV
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-bold text-primary">9, 10, 11</p>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-0.5">
                        Diğer Sınıflar
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 text-xs md:text-sm">
                    <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-0.5">
                      Sınav Tarihi
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white">
                      28-29 Mart 2026
                    </p>
                  </div>
                  <Link
                    href="/bursluluk"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 md:py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all text-sm md:text-base"
                  >
                    Hemen Başvur
                    <span className="material-icons text-lg">arrow_forward</span>
                  </Link>
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                    * Son başvuru tarihi: 26 Mart 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Haberler ve Duyurular - Sabit 2 duyuru, tıklanmaz */}
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
            
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {ANA_SAYFA_DUYURULAR.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="h-48 md:h-52 relative">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <span className="text-xs font-bold text-rize-green mb-2 block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Üye Okullarımız - Haberler ile footer arasında, büyük vurgulu alan */}
      <section className="bg-slate-100 dark:bg-slate-800/50 border-y border-slate-200 dark:border-slate-700 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Üye Okullarımız
            </h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Rize Özel Okullar Birliği çatısı altında bir araya gelen okullarımız.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                slug: "bahcesehir-koleji",
                name: "Bahçeşehir Koleji",
                ext: "jpg",
                websiteUrl: "https://bahcesehir.k12.tr/",
              },
              {
                slug: "cozum-koleji",
                name: "Çözüm Koleji",
                ext: "png",
                websiteUrl: "https://www.cozumkoleji.com.tr/tr/rize-muradiye-cozum-koleji",
              },
              {
                slug: "levent-koleji",
                name: "Levent Okulları",
                ext: "png",
                websiteUrl: "https://leventokullari.com/",
              },
              {
                slug: "poyraz-koleji",
                name: "Poyraz Okulları",
                ext: "png",
                websiteUrl: "https://poyrazokullari.com/",
              },
            ].map((school) => (
              <Link
                key={school.slug}
                href={school.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center"
              >
                <div className="w-full max-w-[320px] mx-auto rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg group-hover:shadow-2xl group-hover:border-primary/40 group-hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-slate-800">
                  {/* Okul binası görseli */}
                  <div className="relative w-full h-40 md:h-48">
                    <Image
                      src={`/okul-binalari/${school.slug}.jpeg`}
                      alt={`${school.name} binası`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  {/* Logo */}
                  <div className="px-6 pb-6 pt-4 flex flex-col items-center">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 -mt-12 mb-4 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                      <Image
                        src={`/${school.slug}.${school.ext}`}
                        alt={school.name}
                        width={112}
                        height={112}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {school.name}
                    </h3>
                    <span className="mt-2 text-primary font-semibold text-sm inline-flex items-center gap-1">
                      Okulu incele
                      <span className="material-icons text-base">arrow_forward</span>
                    </span>
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
