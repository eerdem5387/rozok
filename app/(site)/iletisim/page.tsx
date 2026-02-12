"use client";

import { useState } from "react";

export default function IletisimPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      if (res.ok) {
        setSent(true);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-slate-900 py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Bize Ulaşın
          </h2>
          <div className="w-24 h-1.5 bg-rize-green mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Eğitim vizyonumuz ve üye okullarımız hakkında bilgi almak,
            görüşlerinizi iletmek için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Mesaj Gönderin
            </h3>
            {sent ? (
              <p className="text-rize-green font-semibold mb-4">
                Mesajınız alındı. En kısa sürede size dönüş yapacağız.
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Ad Soyad
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Örn: Ahmet Yılmaz"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    E-posta
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="orn@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Telefon
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="0 (5xx) xxx xx xx"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Konu
                  </label>
                  <input
                    name="subject"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="İletişim Sebebi"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Mesajınızı buraya yazınız..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? "Gönderiliyor..." : "Gönder"}
                <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">
                  send
                </span>
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                İletişim Bilgileri
              </h3>
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 shrink-0 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons">place</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Adres
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Atatürk Caddesi, No:45 Kat:2
                    <br />
                    Merkez, Rize / TÜRKİYE
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 shrink-0 bg-rize-green/10 text-rize-green rounded-lg flex items-center justify-center">
                  <span className="material-icons">phone</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Telefon
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    <a
                      href="tel:+904642220000"
                      className="hover:text-primary transition-colors"
                    >
                      0 (464) 222 00 00
                    </a>
                    <br />
                    <a
                      href="tel:+905300000000"
                      className="hover:text-primary transition-colors"
                    >
                      0 (530) 000 00 00
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 shrink-0 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons">email</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    E-posta
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    <a
                      href="mailto:info@rizeozelokullar.org.tr"
                      className="hover:text-primary transition-colors"
                    >
                      info@rizeozelokullar.org.tr
                    </a>
                    <br />
                    <a
                      href="mailto:destek@rizeozelokullar.org.tr"
                      className="hover:text-primary transition-colors"
                    >
                      destek@rizeozelokullar.org.tr
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="mt-12">
        <div className="w-full h-[500px] relative bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center grayscale contrast-125 opacity-70"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCz_K93TsnGFdCt4FLjqLYegHGD6XfRvA39c_s8nr34zxUSntA-ZeHrUA6V43iKhc5QnwTERFv9N_4S3NwHXHgYJuOl65du5uSx75H-wYBwda4qLXFLlg1dDLHXmtsNUZhRhGgsQyyhZq0W3gli7nTFyQugRfGE8TvZ3YDupcCMvrM2u9j986lQq-oW6BAgokDyfKNMiKL1ZNEpi2hunfd0nOAQKGcKtU123ZMoIpZzdy4GfvNFxc4EB3YpkQ6RipXoMudC_xFp3kc')`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-xl ring-4 ring-white dark:ring-slate-900 relative z-10">
                <span className="material-icons text-white text-base">school</span>
              </div>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 px-4 py-2 rounded shadow-lg border border-slate-100 dark:border-slate-800 whitespace-nowrap">
                <span className="text-xs font-bold text-slate-800 dark:text-white">
                  Rize Özel Okullar Birliği Merkezi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
