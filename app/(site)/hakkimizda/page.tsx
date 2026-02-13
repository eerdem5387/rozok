import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const HAKKIMIZDA_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCrMWCIe2osKNRa42r-xCP1weDITtWsiucqVfgtkRRINrn22XqmlIEMByHYfUh9_Qj-8qqiXHJKMS0dcjH8rX6Cl1RbcvI_5ym_3dL4ZRcnN5pQV0w5fl-2n-xekn2djVkqPBlzRtcQQhZXsy9WUzQYw1pcKvFwOWQUcijk44_fCjqBpiwHEIeeemp6BczhUmqFp4xQwmml5jwxckLSUJuf7eABgiN2X9Aq_6VmaLglZIxYVFLe8GgRmtez4z0NgGGoMd9d4ejao3I";

export default async function HakkimizdaPage() {
  let members: { name: string; title: string; role: string; image?: string | null }[] = [];
  try {
    members = await prisma.boardMember.findMany({
      orderBy: [{ isChairman: "desc" }, { order: "asc" }],
    });
  } catch {
    // Veritabanı bağlantı hatası veya tablo yoksa boş liste
  }

  return (
    <>
      <section className="relative overflow-hidden bg-white dark:bg-background-dark py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center space-x-2 text-rize-green font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="w-8 h-[2px] bg-rize-green" />
              <span>Biz Kimiz?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Rize&apos;de Eğitimin Geleceğini{" "}
              <span className="text-primary">Birlikte Şekillendiriyoruz</span>
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              <p>
                Rize Özel Okullar Birliği, şehrimizin eğitim kalitesini en üst
                seviyeye taşımak ve özel öğretim kurumları arasında dayanışmayı
                artırmak amacıyla kurulmuştur.
              </p>
              <p>
                Her bir öğrencimizin potansiyelini keşfetmesi için gerekli olan
                akademik ve sosyal altyapıyı, birliğimiz bünyesindeki okullarla
                koordineli bir şekilde geliştiriyoruz.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <Image
                alt="Rize Eğitim Vizyonu"
                src={HAKKIMIZDA_IMAGE}
                width={600}
                height={450}
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background-light dark:bg-background-dark/50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-white dark:bg-background-dark p-10 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-rize-green/30 transition-all duration-300">
              <div className="w-14 h-14 bg-rize-green/10 text-rize-green rounded-xl flex items-center justify-center mb-6 group-hover:bg-rize-green group-hover:text-white transition-colors">
                <span className="material-icons text-3xl">flag</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Misyonumuz
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Rize&apos;deki özel öğretim kurumlarını tek çatı altında
                toplayarak, eğitim standartlarını evrensel düzeylere ulaştırmak;
                etik değerlere bağlı, yenilikçi ve iş birliğine açık bir eğitim
                ekosistemi oluşturmaktır.
              </p>
            </div>
            <div className="group bg-white dark:bg-background-dark p-10 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons text-3xl">visibility</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                Vizyonumuz
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Karadeniz bölgesinde eğitimin öncüsü olarak, teknolojiyi ve
                modern pedagojik yaklaşımları tüm okullarımıza entegre etmek;
                Türkiye&apos;nin en başarılı ve donanımlı nesillerini
                Rize&apos;den yetiştirmektir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ChairmanCard({
  member,
}: {
  member: { name: string; title: string; role: string; image?: string | null };
}) {
  const img =
    member.image ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA4PQ7rs8gjzh6OO-xAs6jCLUav_HiE5RZ37HJrUSYk3Lkrjed75HnFbost2z5XI5pTu2pvkJ_5maEe3sc_P_I9WcjrZbRpGg1QkDW-OKNN76ZwUadVMIGqxnCbNPqSGd9wE3l1NwQfeTY7Mwrf5KEUE3OCewArcgVIP3mmR1WvgkEQjwoXAreiUjrCQ8JTfKgUWqD025_3QAvTyHUt4VnvASpgkzyyMq4pJ-ylvb4lb2doAn1ZYC1Fu3LWvF9BAdWmZuCXZbh0VSY";
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border-t-4 border-primary group hover:-translate-y-2 transition-transform duration-300">
        <div className="relative h-72 overflow-hidden">
          <Image alt={member.name} src={img} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <span className="bg-primary text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest">
              {member.role}
            </span>
          </div>
        </div>
        <div className="p-6 text-center">
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
            {member.name}
          </h4>
          <p className="text-primary font-medium text-sm mb-1">{member.title}</p>
        </div>
      </div>
    </div>
  );
}

function MemberCard({
  name,
  role,
  subtitle,
  image,
  isChairman,
  title,
}: {
  name: string;
  role: string;
  subtitle?: string;
  title?: string;
  image: string;
  isChairman: boolean;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-md border-t-2 border-rize-green group hover:shadow-xl transition-all">
      <div className="h-64 overflow-hidden relative">
        {image && (
          <Image
            alt={name}
            src={image}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        )}
      </div>
      <div className="p-5">
        <span className="text-rize-green text-[10px] font-bold uppercase tracking-tighter">
          {role}
        </span>
        <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
          {name}
        </h5>
        {subtitle && (
          <p className="text-slate-500 text-xs">{subtitle}</p>
        )}
        {title && !subtitle && (
          <p className="text-slate-500 text-xs">{title}</p>
        )}
      </div>
    </div>
  );
}
