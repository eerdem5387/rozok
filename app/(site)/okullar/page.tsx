import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PLACEHOLDER_IMAGES: Record<string, string> = {
  "0": "https://lh3.googleusercontent.com/aida-public/AB6AXuB80an7IVevDcnHBRKeSdHCKQnP8g3zSl1irPCOQi6dCioBcl8GZf_JXQsMHLKSv0G1vHjKbBtZoKDkN60TMXmM4gBYvOK17r2qe6T-dbh6Q8Um7BZ1-UBcOsuf-06DE1QEWexhKdhGxw45il0mqSVO_GVlTtNd9HT0FvFLu0FzKF-SzSfT0h-0D244IegYDblqJU-k9eJLmHOeOxFkYZ6sXFnHTHeAedDopNifvFqNh1LZzf0glSTpUnZHNAZOp9TOTiNGMJxKQp8",
  "1": "https://lh3.googleusercontent.com/aida-public/AB6AXuCp32N20-CNHYH6vliaymkPKlDkyX6nhkXHXfH8m_2BmINjB22kNhq1CpZ2dVEN_nC1Z6MzIBBOKQPdPRVbQxjHHqO-SJGrRHgCg68D8wiJ0azAG-5H-h7YegPHdP6uNIkITaT_lcHRNOv0rzllt8yecZWrinKNzjXCf4hHyIfUiw8ApUrmtrl29C9yJIH90cUSXcsIllmSm_nZbrDWhSmwMz7W8zV6FBq_wMdalSHr-RMKi4cfDfNgQk_ftUoMVB9Vlz1QxYwMfNc",
  "2": "https://lh3.googleusercontent.com/aida-public/AB6AXuBFtV6WpClGqgGfYuGK6yopie7Bj86iGPQXtzoAkBNTPgODG3N-O8giWFUrzJ3SrvT6FugxAYfREt5CHwp5KnTCs2orEKj485l50elaAF0jfZihjlPbS-EdCr13lSO5TH7ICQHv2zWidEexOJLYiMBhQRRoG9rM8u02arp7b_8377e4d95j3ncO4-x-Kw2nA7ZLpNvHwVfsf9RQIa67p28rtd8Rw1wmEGJ0UHa6Mr7U3P_ieojAhV-oqnk4uvFxu3CUs981-nTm6Tk",
};

const DEFAULT_SCHOOLS = [
  {
    name: "Rize Bilim Koleji",
    district: "Rize Merkez",
    level: "Lise",
    description:
      "Fen ve teknoloji odaklı eğitim anlayışıyla geleceğin bilim insanlarını yetiştiren öncü eğitim kurumu.",
    image: PLACEHOLDER_IMAGES["0"],
    icon: "account_balance",
  },
  {
    name: "Fırtına Fen Lisesi",
    district: "Ardeşen",
    level: "Lise",
    description:
      "Ardeşen'in kalbinde, akademik başarı odaklı ve sosyal gelişimi destekleyen disiplinli eğitim modeli.",
    image: PLACEHOLDER_IMAGES["1"],
    icon: "science",
  },
  {
    name: "Karadeniz Ortaokulu",
    district: "Çayeli",
    level: "Ortaokul",
    description:
      "Çocuklarımızın bireysel yeteneklerini keşfettiği, güvenli ve sevgi dolu bir ortaöğretim ortamı.",
    image: PLACEHOLDER_IMAGES["2"],
    icon: "psychology",
  },
];

export default async function OkullarPage() {
  const schools = await prisma.school.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const list =
    schools.length > 0
      ? schools.map((s) => ({
          slug: s.slug,
          name: s.name,
          district: s.district,
          level: s.level,
          description: s.description || "",
          image: s.image || PLACEHOLDER_IMAGES["0"],
          icon: "school",
        }))
      : DEFAULT_SCHOOLS.map((s, i) => ({
          slug: s.name.toLowerCase().replace(/\s+/g, "-"),
          ...s,
          image: s.image,
        }));

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
            Toplam <span className="text-primary font-bold">{list.length}</span>{" "}
            okul listeleniyor
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((school) => (
            <div
              key={school.slug}
              className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <Image
                  alt={school.name}
                  src={school.image}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${
                      school.level === "Ortaokul"
                        ? "bg-rize-green text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {school.level}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-icons text-primary">
                      {"icon" in school && (school as { icon?: string }).icon
                        ? (school as { icon: string }).icon
                        : "school"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                      {school.name}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="material-icons text-[12px]">place</span>
                      {school.district}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                  {school.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/okullar/${school.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-800 border-2 border-primary/20 hover:border-primary text-primary dark:text-white font-bold text-sm rounded-lg transition-all group-hover:bg-primary group-hover:text-white"
                  >
                    Detayları Gör
                    <span className="material-icons text-sm">open_in_new</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
