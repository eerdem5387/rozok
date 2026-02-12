"use client";

import { useRouter } from "next/navigation";
import { SINIFLAR } from "@/lib/bursluluk-constants";

const inputClass =
  "rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary";

export default function BasvurularFiltreVeExport({
  initialGrade,
  initialDateFrom,
  initialDateTo,
  initialRefNo,
  initialStudentName,
}: {
  initialGrade?: string;
  initialDateFrom?: string;
  initialDateTo?: string;
  initialRefNo?: string;
  initialStudentName?: string;
}) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();
    (["grade", "dateFrom", "dateTo", "refNo", "studentName"] as const).forEach((key) => {
      const v = data.get(key);
      if (v && String(v).trim()) params.set(key, String(v).trim());
    });
    router.push(`/admin/basvurular?${params.toString()}`);
  }

  function handleClear() {
    router.push("/admin/basvurular");
  }

  const hasFilters =
    initialGrade || initialDateFrom || initialDateTo || initialRefNo || initialStudentName;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-icons text-slate-500">filter_list</span>
        <h2 className="font-semibold text-slate-900 dark:text-white">Filtrele</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Sınıf
          </label>
          <select name="grade" className={inputClass} defaultValue={initialGrade ?? ""}>
            <option value="">Tümü</option>
            {SINIFLAR.map((g) => (
              <option key={g} value={String(g)}>
                {g}. Sınıf
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Başlangıç Tarihi
          </label>
          <input
            type="date"
            name="dateFrom"
            className={inputClass}
            defaultValue={initialDateFrom ?? ""}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Bitiş Tarihi
          </label>
          <input
            type="date"
            name="dateTo"
            className={inputClass}
            defaultValue={initialDateTo ?? ""}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Ref No
          </label>
          <input
            type="text"
            name="refNo"
            placeholder="Örn: #ROB-2026"
            className={inputClass}
            defaultValue={initialRefNo ?? ""}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Öğrenci Adı
          </label>
          <input
            type="text"
            name="studentName"
            placeholder="Ad veya soyad"
            className={inputClass}
            defaultValue={initialStudentName ?? ""}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors text-sm"
          >
            Uygula
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              Temizle
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
