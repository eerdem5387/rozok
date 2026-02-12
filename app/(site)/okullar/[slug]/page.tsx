import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OkulDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await prisma.school.findUnique({
    where: { slug, published: true },
  });

  if (!school) {
    notFound();
  }

  const heroImage =
    school.image ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB5xlaoVpKzpfLGpratsGW0-HnLqfknBEp0sesTnk1zDuQfCLPoB9ClPBAkJZNUW0QzIsNFO-GWPijHHqWgNHsgOfMV00scQEurxF9MhYR57qA4p9X5Z8E5EPC7PFJBJLV_7vp0AXk1TewEDck0O3wEcjYg4HYwcJScUBrCfIAG50zhsTWO_m22ofP5uxsAml94EIS8GgGcG5FvrsWD7aNOIrrGjTmoXaSlpGQElKFqTFkIGfpZYmz4Jog4Sa2Faayv8ejL8yQOjNg";
  const logo =
    school.logo ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCb7hoxW2qG8A0gnmzkUZThJH7Vq7FNMRxB6kJyGau-Xm_dKWvgdk9s5SQGm58zosXL0Mz0Bo3yO742prMCRCR2fJF2qONsGatc6gipQCGm6AlMkci4Ri1bSPxc5maFrJcNrl19zQxeUnlSaeECPRyE_QNja-ojoi1rGfDgsDDc0jT8qGhAYoo2315PxH9XoaeedtExh1Wbrcz6bOfl0Nsv9eUy9DCAbkHFZDS6RuOCcE2dzI5GHNgpeUAuHelJaWl4u1WG10stP4w";

  return (
    <>
      <section className="relative h-[450px] w-full overflow-hidden">
        <Image
          alt={school.name}
          src={heroImage}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-2 rounded-xl shadow-2xl shrink-0">
              <Image
                alt={`${school.name} logo`}
                src={logo}
                width={160}
                height={160}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 mb-2">
              <nav className="flex items-center gap-2 text-slate-300 text-sm mb-3">
                <Link href="/okullar" className="hover:text-white transition-colors">
                  Okullarımız
                </Link>
                <span className="material-icons text-xs">chevron_right</span>
                <span>{school.district}</span>
              </nav>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {school.name}
              </h2>
              <span className="inline-flex items-center gap-1 bg-rize-green text-white px-3 py-1 rounded-full text-xs font-semibold">
                <span className="material-icons text-xs">verified</span> Birlik Üyesi
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            {school.about && (
              <section id="hakkimizda">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  Hakkımızda
                </h3>
                <div
                  className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: school.about }}
                />
              </section>
            )}
            {school.facilities && (
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  Kampüs Olanakları
                </h3>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: school.facilities }}
                />
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 sticky top-24">
              {school.websiteUrl && (
                <a
                  href={school.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all mb-4"
                >
                  <span className="material-icons">open_in_new</span>
                  Web Sitesini Ziyaret Et
                </a>
              )}
              <hr className="my-6 border-slate-200 dark:border-slate-700" />
              <div className="space-y-4">
                {school.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-icons text-primary">phone</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        Telefon
                      </p>
                      <a
                        href={`tel:${school.phone}`}
                        className="text-sm font-semibold hover:text-primary transition-colors"
                      >
                        {school.phone}
                      </a>
                    </div>
                  </div>
                )}
                {school.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-icons text-primary">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        Adres
                      </p>
                      <p className="text-sm font-semibold">{school.address}</p>
                    </div>
                  </div>
                )}
                {school.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-icons text-primary">
                        alternate_email
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase text-slate-500 font-bold">
                        E-Posta
                      </p>
                      <a
                        href={`mailto:${school.email}`}
                        className="text-sm font-semibold hover:text-primary transition-colors"
                      >
                        {school.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
