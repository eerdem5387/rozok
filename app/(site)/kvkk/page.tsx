import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Rize Özel Okullar Birliği",
  description: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <main className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-primary">
          Anasayfa
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700 dark:text-slate-300">KVKK Aydınlatma Metni</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <span className="w-1.5 h-10 bg-primary rounded-full" />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          KVKK Aydınlatma Metni
        </h1>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
        <p className="lead">
          Rize Özel Okullar Birliği (&quot;Birliğimiz&quot;) olarak, 6698 sayılı Kişisel
          Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında veri sorumlusu sıfatıyla
          kişisel verilerinizi işlemekteyiz. Bu aydınlatma metni, kişisel verilerinizin
          hangi amaçla, hangi hukuki sebeplerle işlendiği ve haklarınız hakkında sizi
          bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          1. Kişisel Verilerin İşlenme Amaçları
        </h2>
        <p>
          Toplanan kişisel verileriniz; bursluluk sınavı başvuru süreçlerinin
          yürütülmesi, iletişim faaliyetlerinin gerçekleştirilmesi, yasal yükümlülüklerin
          yerine getirilmesi ve Birliğimizin meşru menfaatleri kapsamında hizmet
          kalitesinin artırılması amacıyla işlenmektedir.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          2. İşlenen Kişisel Veri Kategorileri
        </h2>
        <p>
          Başvuru formu ve iletişim kanalları aracılığıyla; kimlik bilgileriniz (ad,
          soyad, T.C. kimlik numarası), iletişim bilgileriniz (telefon, e-posta, adres),
          veli/öğrenci bilgileri ve sınav/başvuru ile ilgili diğer bilgileriniz
          işlenebilmektedir.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          3. Verilerin Aktarılması
        </h2>
        <p>
          Kişisel verileriniz, yalnızca yasal zorunluluklar veya hizmetin ifası için
          gerekli olan hallerde, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen şartlara
          uygun olarak ilgili kurum ve kuruluşlarla paylaşılabilir.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          4. Veri Toplamanın Yöntemi ve Hukuki Sebebi
        </h2>
        <p>
          Kişisel verileriniz, başvuru formları, e-posta, telefon ve fiziksel başvuru
          yolları ile toplanmakta olup; KVKK&apos;nın 5. maddesinde belirtilen açık rızanız,
          sözleşmenin ifası, hukuki yükümlülük ve meşru menfaat hukuki sebeplerine
          dayanılarak işlenmektedir.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          5. Haklarınız
        </h2>
        <p>
          KVKK&apos;nın 11. maddesi uyarınca kişisel verilerinizle ilgili olarak; öğrenme,
          düzeltme, silme, itiraz etme, otomatik sistemler vasıtasıyla analiz edilmesine
          itiraz ve kanuna aykırı işlenmesi halinde zararın giderilmesini talep etme
          haklarına sahipsiniz. Bu haklarınızı kullanmak için{" "}
          <Link href="/iletisim" className="text-primary font-medium hover:underline">
            İletişim
          </Link>{" "}
          sayfamız üzerinden veya info@rizeozelokullar.org.tr adresiyle Birlikimize
          başvurabilirsiniz.
        </p>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          6. İletişim
        </h2>
        <p>
          Kişisel verilerinizle ilgili sorularınız ve talepleriniz için: Rize Özel
          Okullar Birliği, Atatürk Cad. No:53 Merkez, Rize; e-posta:
          info@rizeozelokullar.org.tr; telefon: +90 (464) 213 00 00.
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-12">
          Bu metin, KVKK kapsamında bilgilendirme amacıyla yayımlanmıştır. Güncel metin
          için Birlik web sitesini ziyaret edebilirsiniz.
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <Link
          href="/bursluluk"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <span className="material-icons text-lg">arrow_back</span>
          Bursluluk Başvurusuna Dön
        </Link>
      </div>
    </main>
  );
}
