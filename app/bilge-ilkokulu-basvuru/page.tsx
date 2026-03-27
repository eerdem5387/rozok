"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MESLEKLER, SINIFLAR } from "@/lib/bursluluk-constants";

const SCHOOL_NAME = "RİZE - GÜNEYSU - ÖZEL GÜNEYSU OKULLARI ORTAOKULU";
const inputClass =
  "w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-2.5";
const labelClass = "text-sm font-semibold text-slate-600 dark:text-slate-400 block mb-1.5";

export default function BilgeIlkokuluBasvuruPage() {
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
      const res = await fetch("/api/bilge-ilkokulu-basvuru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: formData.get("studentName"),
          tcKimlik: formData.get("tcKimlik"),
          grade: formData.get("grade"),
          fatherName: formData.get("fatherName"),
          fatherMeslek: formData.get("fatherMeslek"),
          fatherPhone: normalizePhone(formData.get("fatherPhone") as string),
          fatherWorkAddress: formData.get("fatherWorkAddress"),
          motherName: formData.get("motherName"),
          motherMeslek: formData.get("motherMeslek"),
          motherPhone: normalizePhone(formData.get("motherPhone") as string),
          motherWorkAddress: formData.get("motherWorkAddress"),
          email: formData.get("email"),
          examDay: "Cumartesi",
          examSession: "10:00",
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
    <main className="container mx-auto px-4 md:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8 border border-slate-100 dark:border-slate-800">
          <h1 className="text-2xl font-bold mb-8">Özel Güneysu Okulları Ortaokulu Başvuru Formu</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="studentName" className={labelClass}>
                  Öğrenci Ad Soyad *
                </label>
                <input id="studentName" name="studentName" required className={inputClass} />
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
                  className={inputClass}
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
              <div>
                <label htmlFor="currentSchoolDisplay" className={labelClass}>
                  Okul
                </label>
                <input id="currentSchoolDisplay" value={SCHOOL_NAME} readOnly className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="examDayDisplay" className={labelClass}>
                  Sınav Günü
                </label>
                <input id="examDayDisplay" value="Cumartesi" readOnly className={inputClass} />
              </div>
              <div>
                <label htmlFor="examSessionDisplay" className={labelClass}>
                  Sınav Seansı
                </label>
                <input id="examSessionDisplay" value="Saat 10:00" readOnly className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fatherName" className={labelClass}>
                  Baba Ad Soyad *
                </label>
                <input id="fatherName" name="fatherName" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="fatherMeslek" className={labelClass}>
                  Baba Meslek *
                </label>
                <select id="fatherMeslek" name="fatherMeslek" required className={inputClass}>
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
                  Baba Cep Telefonu *
                </label>
                <input
                  id="fatherPhone"
                  name="fatherPhone"
                  type="tel"
                  required
                  pattern="0?5[0-9]{9}"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="fatherWorkAddress" className={labelClass}>
                  Baba İş Adresi *
                </label>
                <input id="fatherWorkAddress" name="fatherWorkAddress" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="motherName" className={labelClass}>
                  Anne Ad Soyad *
                </label>
                <input id="motherName" name="motherName" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="motherMeslek" className={labelClass}>
                  Anne Meslek *
                </label>
                <select id="motherMeslek" name="motherMeslek" required className={inputClass}>
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
                  Anne Cep Telefonu *
                </label>
                <input
                  id="motherPhone"
                  name="motherPhone"
                  type="tel"
                  required
                  pattern="0?5[0-9]{9}"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="motherWorkAddress" className={labelClass}>
                  Anne İş Adresi *
                </label>
                <input id="motherWorkAddress" name="motherWorkAddress" required className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                E-Posta *
              </label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={kvkkOnay}
                onChange={(e) => setKvkkOnay(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-primary focus:ring-primary shrink-0"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                KVKK aydınlatma metni kapsamında kişisel verilerimin işlenmesini kabul ediyorum. *
              </span>
            </label>

            <div className="flex justify-end gap-4">
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
                className="px-10 py-3 rounded-lg font-bold bg-primary text-white hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

