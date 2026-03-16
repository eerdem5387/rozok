import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Üye okullar: logo ve kendi web sitelerine link. Linkleri aşağıya ekleyebilirsiniz.
const UYE_OKULLAR = [
  {
    slug: "bahcesehir-koleji",
    name: "Bahçeşehir Koleji",
    logoExt: "jpg",
    websiteUrl: "https://bahcesehir.k12.tr/", // Örn: "https://www.bahcesehirkoleji.k12.tr"
  },
  {
    slug: "cozum-koleji",
    name: "Çözüm Koleji",
    logoExt: "png",
    websiteUrl: "https://www.cozumkoleji.com.tr/tr/rize-muradiye-cozum-koleji", // Örn: "https://www.cozumkoleji.com"
  },
  {
    slug: "levent-koleji",
    name: "Levent Okulları",
    logoExt: "png",
    websiteUrl: "https://leventokullari.com/", // Örn: "https://www.leventokullari.com"
  },
  {
    slug: "poyraz-koleji",
    name: "Poyraz Okulları",
    logoExt: "png",
    websiteUrl: "https://poyrazokullari.com/", // Örn: "https://www.poyrazokullari.com"
  },
];

export default function OkullarPage() {
  return (
    <>
      <section className="bg-primary/5 dark:bg-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Üye Okullarımız
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Rize genelinde eğitim kalitesini yükselten, birliğimizin çatısı
              altında birleşen seçkin özel öğretim kurumlarını keşfedin.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 font-medium">
            Toplam <span className="text-primary font-bold">{UYE_OKULLAR.length}</span>{" "}
            okul listeleniyor
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {UYE_OKULLAR.map((school) => {
            const hasLink = !!school.websiteUrl;
            const cardContent = (
              <>
                <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-4">
                  {/* Okul binası */}
                  <div className="relative w-full h-40 md:h-44">
                    <Image
                      src={`/okul-binalari/${school.slug}.jpeg`}
                      alt={`${school.name} binası`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  {/* Logo */}
                  <div className="flex flex-col items-center px-4 pb-5 pt-3">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 -mt-12 mb-3 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                      <Image
                        src={`/${school.slug}.${school.logoExt}`}
                        alt={school.name}
                        width={112}
                        height={112}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {school.name}
                    </h3>
                    {hasLink ? (
                      <span className="text-primary font-semibold text-sm inline-flex items-center gap-1">
                        Siteye git
                        <span className="material-icons text-base">open_in_new</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">Link eklenmedi</span>
                    )}
                  </div>
                </div>
              </>
            );
            const cardClass = `group flex flex-col items-center text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 transition-all duration-300 ${
              hasLink ? "hover:shadow-xl hover:border-primary/30" : ""
            }`;
            return hasLink ? (
              <a
                key={school.slug}
                href={school.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {cardContent}
              </a>
            ) : (
              <div key={school.slug} className={cardClass}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </main>

      <section className="bg-primary py-20 mt-12 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Derneğimize Katılın
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-10 text-lg">
            Rize&apos;deki özel eğitim kurumlarının bir araya gelerek
            güçlendiği, eğitim kalitesini artırmak için ortak projeler ürettiği
            birliğimize kurumunuzu dahil edin.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Bilgi Alın
            <span className="material-icons">info</span>
          </Link>
        </div>
      </section>
    </>
  );
}
