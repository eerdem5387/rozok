import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-14 h-14 shrink-0">
                <Image src="/rozok-logo.svg" alt="RÖOB" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold tracking-tight">RİZE ÖOB</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Rize Özel Okullar Birliği olarak şehrimizdeki eğitim standartlarını
              yükseltmek için var gücümüzle çalışıyoruz.
            </p>
          </div>
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">
              Hızlı Linkler
            </h6>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <Link href="/hakkimizda" className="hover:text-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/okullar" className="hover:text-primary transition-colors">
                  Okullarımız
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="hover:text-primary transition-colors">
                  Etkinlik Takvimi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-primary transition-colors">
                  Üyelik Koşulları
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">
              İletişim
            </h6>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <span className="material-icons text-primary text-sm mt-1">
                  location_on
                </span>
                <span>Atatürk Cad. No:53 Merkez, Rize</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons text-primary text-sm">phone</span>
                <span>+90 (464) 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons text-primary text-sm">mail</span>
                <span>info@rizeoob.org.tr</span>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-sm font-bold uppercase tracking-widest mb-6">
              Bülten
            </h6>
            <p className="text-xs text-slate-400 mb-4">
              Gelişmelerden haberdar olmak için kaydolun.
            </p>
            <form className="flex">
              <input
                className="bg-slate-800 border-none rounded-l-lg text-sm px-4 py-2 w-full focus:ring-1 focus:ring-primary"
                placeholder="E-posta adresi"
                type="email"
              />
              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors"
              >
                <span className="material-icons text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Rize Özel Okullar Birliği. Tüm Hakları Saklıdır.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white">
              Kullanım Şartları
            </Link>
            <Link href="/kvkk" className="hover:text-white">
              KVKK
            </Link>
            <Link href="#" className="hover:text-white">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
