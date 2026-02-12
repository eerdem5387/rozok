import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PLACEHOLDER_NEWS = [
  {
    slug: "egitimde-yeni-teknolojiler",
    title: "Eğitimde Yeni Teknolojiler Semineri",
    excerpt:
      "Rize'deki tüm üye okullarımızın katılımıyla gerçekleştirilecek olan dijital dönüşüm seminerinde, yapay zekanın eğitimdeki rolü tartışılacak.",
    category: "Eğitim Haberleri",
    date: "12 Haz 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxQW4Inn6XtSsNpZ7D1j8Y4ZpExyGb9iFYL5IP2Y3opz4A3UngGX24AggYWwouOJKdXyFRis4XL0RFc_NORa3pMr9Y9cPmCxcElIrZuvUbeGnzvtISnUXZWYq6HborOwK_3YnXnh44-MrVcmz5c0p-tEkOM_LgQchAPpuB2U46E6fNMGg7OrF1zMy9hFrDiBF7dcc_rqbkh0dx93rGIdL_O7PrJWO54N1trendP4EmEPYAsyC20K8nPn9qJBHTw5M3vT1rjdZRooE",
  },
  {
    slug: "bursluluk-sinavi-2026",
    title: "2026 Bursluluk Sınavı Hazırlıkları",
    excerpt:
      "Birliğimize bağlı özel okulların ortak bursluluk sınavı takvimi açıklandı. Başvurular online sistem üzerinden kabul edilmeye başlandı.",
    category: "Duyurular",
    date: "08 Haz 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBOSEygUxVHUt4ZlopJG5Ihgf0NzMblvYg6Hpwa7FdB3X_8GYU9_ZwUOIzALXeCfPpX2uZhnPrwXQyHDhze9Y-OivGJVK-w2oyMr3wn1KAqJnC9mDOV022PeVt9RYRtOP9XjkVPN4yCuGalAOYpACepNp74mgrdOan6F_r_XlcTTPCsfakY1SfYlnBRY9mjpu-H0T2X1OIqddTGawTZODYIHfHMybg4a-SUigXxSjqsDV3Isvokb6OUIyl56JbUgPPNFtd8kII_4tg",
  },
];

export default async function HaberlerPage() {
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 20,
  });

  const list =
    news.length > 0
      ? news.map((n) => ({
          slug: n.slug,
          title: n.title,
          excerpt: n.excerpt || "",
          category: n.category,
          date: new Date(n.publishedAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          image: n.image || PLACEHOLDER_NEWS[0].image,
        }))
      : PLACEHOLDER_NEWS;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <header className="mb-12">
          <nav className="flex mb-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-primary">
              Anasayfa
            </Link>
            <span className="material-icons text-xs mx-2">chevron_right</span>
            <span className="text-primary font-semibold">
              Haberler ve Duyurular
            </span>
          </nav>
          <div className="border-b border-primary/20 pb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Haberler ve Duyurular
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl italic">
              Birliğimizden en güncel haberler, eğitim dünyasındaki gelişmeler
              ve duyurular.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item) => (
            <article
              key={item.slug}
              className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <Link href={`/haberler/${item.slug}`} className="relative block overflow-hidden h-56">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {item.date}
                </div>
              </Link>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-rize-green text-xs font-bold uppercase tracking-widest mb-2">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/haberler/${item.slug}`}
                    className="inline-flex items-center text-primary font-bold text-sm group/btn"
                  >
                    Devamını Oku
                    <span className="material-icons text-sm ml-1 group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
