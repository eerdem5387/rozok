"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RIZE_OKULLARI, MESLEKLER, SINIFLAR } from "@/lib/bursluluk-constants";

const inputClass =
  "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-2.5";
const labelClass = "text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-1.5";

export default function BurslulukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState("8");
  const [kvkkOnay, setKvkkOnay] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!kvkkOnay) {
      alert("Başvuru yapabilmek için KVKK aydınlatma metnini kabul etmeniz gerekmektedir.");
      return;
    }
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const normalizePhone = (v: string | null) => {
      const digits = (v || "").replace(/\D/g, "");
      return digits.startsWith("0") ? digits.slice(1) : digits;
    };
    try {
      const res = await fetch("/api/bursluluk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: formData.get("studentName"),
          tcKimlik: formData.get("tcKimlik"),
          grade: formData.get("grade"),
          currentSchool: formData.get("currentSchool"),
          fatherName: formData.get("fatherName"),
          fatherMeslek: formData.get("fatherMeslek"),
          fatherPhone: normalizePhone(formData.get("fatherPhone") as string),
          fatherWorkAddress: formData.get("fatherWorkAddress"),
          motherName: formData.get("motherName"),
          motherMeslek: formData.get("motherMeslek"),
          motherPhone: normalizePhone(formData.get("motherPhone") as string),
          motherWorkAddress: formData.get("motherWorkAddress"),
          email: formData.get("email"),
          kvkkOnay: true,
        }),
      });
      const data = await res.json();
      if (data.refNo) {
        router.push(`/bursluluk/tamamlandi?ref=${encodeURIComponent(data.refNo)}`);
      } else {
        alert(data.error || "Başvuru gönderilemedi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="bg-white dark:bg-slate-900 border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0">
              <Image src="/rozok-logo.svg" alt="Rize Özel Okullar Birliği" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Rize Özel Okullar Birliği
              </h1>
              <p className="text-xs text-slate-500 uppercase font-medium">
                Bursluluk Sınavı Kayıt Sistemi
              </p>
            </div>
          </a>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
            2026-2027 Dönemi
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Öğrenci Bilgileri */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Öğrenci Bilgileri
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="studentName" className={labelClass}>
                        Öğrenci Ad Soyad *
                      </label>
                      <input
                        id="studentName"
                        name="studentName"
                        required
                        className={inputClass}
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    <div>
                      <label htmlFor="tcKimlik" className={labelClass}>
                        T.C. Kimlik No *
                      </label>
                      <input
                        id="tcKimlik"
                        name="tcKimlik"
                        required
                        maxLength={11}
                        pattern="[0-9]{11}"
                        title="11 haneli kimlik numarası"
                        className={inputClass}
                        placeholder="11 haneli"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Sınıf *</label>
                      <div className="flex gap-3 flex-wrap">
                        {SINIFLAR.map((g) => (
                          <label key={g} className="cursor-pointer flex items-center gap-2">
                            <input
                              type="radio"
                              name="grade"
                              value={String(g)}
                              checked={grade === String(g)}
                              onChange={() => setGrade(String(g))}
                              className="rounded-full border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="font-medium">{g}. Sınıf</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="currentSchool" className={labelClass}>
                        Okul *
                      </label>
                      <select
                        id="currentSchool"
                        name="currentSchool"
                        required
                        className={inputClass}
                      >
                        <option value="">Okul seçiniz</option>
                        {RIZE_OKULLARI.map((okul) => (
                          <option key={okul} value={okul}>
                            {okul}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Baba Bilgileri */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Baba Bilgileri
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fatherName" className={labelClass}>
                        Baba Ad Soyad *
                      </label>
                      <input
                        id="fatherName"
                        name="fatherName"
                        required
                        className={inputClass}
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div>
                      <label htmlFor="fatherMeslek" className={labelClass}>
                        Meslek *
                      </label>
                      <select
                        id="fatherMeslek"
                        name="fatherMeslek"
                        required
                        className={inputClass}
                      >
                        <option value="">Meslek seçiniz</option>
                        {MESLEKLER.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="fatherPhone" className={labelClass}>
                        Cep Telefonu *
                      </label>
                      <input
                        id="fatherPhone"
                        name="fatherPhone"
                        type="tel"
                        required
                        pattern="0?5[0-9]{9}"
                        title="5 ile başlayan 10 hane (örn: 5333333333)"
                        className={inputClass}
                        placeholder="5xxxxxxxxx"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="fatherWorkAddress" className={labelClass}>
                        İş Adresi *
                      </label>
                      <input
                        id="fatherWorkAddress"
                        name="fatherWorkAddress"
                        required
                        className={inputClass}
                        placeholder="İş adresi"
                      />
                    </div>
                  </div>
                </div>

                {/* Anne Bilgileri */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Anne Bilgileri
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="motherName" className={labelClass}>
                        Anne Ad Soyad *
                      </label>
                      <input
                        id="motherName"
                        name="motherName"
                        required
                        className={inputClass}
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div>
                      <label htmlFor="motherMeslek" className={labelClass}>
                        Meslek *
                      </label>
                      <select
                        id="motherMeslek"
                        name="motherMeslek"
                        required
                        className={inputClass}
                      >
                        <option value="">Meslek seçiniz</option>
                        {MESLEKLER.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="motherPhone" className={labelClass}>
                        Cep Telefonu *
                      </label>
                      <input
                        id="motherPhone"
                        name="motherPhone"
                        type="tel"
                        required
                        pattern="0?5[0-9]{9}"
                        title="5 ile başlayan 10 hane (örn: 5333333333)"
                        className={inputClass}
                        placeholder="5xxxxxxxxx"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="motherWorkAddress" className={labelClass}>
                        İş Adresi *
                      </label>
                      <input
                        id="motherWorkAddress"
                        name="motherWorkAddress"
                        required
                        className={inputClass}
                        placeholder="İş adresi"
                      />
                    </div>
                  </div>
                </div>

                {/* İletişim Bilgileri */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      İletişim Bilgileri
                    </h2>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      E-Posta *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                {/* KVKK Onay */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-800/50">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={kvkkOnay}
                      onChange={(e) => setKvkkOnay(e.target.checked)}
                      className="mt-1 rounded border-slate-300 text-primary focus:ring-primary shrink-0"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                      <a
                        href="/kvkk"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-primary hover:underline focus:outline-none"
                      >
                        KVKK Aydınlatma Metni
                      </a>{" "}
                      kapsamında kişisel verilerimin işlenmesini ve başvuru sürecinde
                      kullanılmasını kabul ediyorum. *
                    </span>
                  </label>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="px-6 py-3 rounded-lg font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3 rounded-lg font-bold bg-primary text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                    <span className="material-icons text-sm">arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-xl p-6 sticky top-28 overflow-hidden">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-icons text-primary">event_note</span>
                Sınav Bilgileri
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-primary">Mart</span>
                    <span className="text-xl font-bold">28</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Cumartesi Sınavı</h4>
                    <p className="text-sm text-slate-400">
                      İlkokul ve Ortaokul grupları için ilk oturumlar.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold uppercase text-primary">Mart</span>
                    <span className="text-xl font-bold">29</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Pazar Sınavı</h4>
                    <p className="text-sm text-slate-400">
                      Lise kademesi ve telafi oturumları.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-bold mb-1">
                    <span className="material-icons text-sm">location_on</span>
                    Rize Merkez
                  </div>
                  <p className="text-xs text-slate-300">
                    Sınav yeri başvurunuz onaylandıktan sonra SMS ile bildirilecektir.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-400">Başvuru Ücreti</span>
                  <span className="text-lg font-bold text-primary">ÜCRETSİZ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-slate-500">
            © 2026 Rize Özel Okullar Birliği. Tüm hakları saklıdır. |
            <a href="/kvkk" className="hover:text-primary transition-colors ml-2">
              KVKK Aydınlatma Metni
            </a>
            |
            <a href="#" className="hover:text-primary transition-colors ml-2">
              Çerez Politikası
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
