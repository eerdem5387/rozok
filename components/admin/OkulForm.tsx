"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  okul?: {
    id: string;
    name: string;
    slug: string;
    district: string;
    level: string;
    description: string | null;
    image: string | null;
    logo: string | null;
    websiteUrl: string | null;
    phone: string | null;
    address: string | null;
    email: string | null;
    about: string | null;
    facilities: string | null;
    published: boolean;
  };
};

export function OkulForm({ okul }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name"),
      slug: formData.get("slug") || (formData.get("name") as string)?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      district: formData.get("district"),
      level: formData.get("level"),
      description: formData.get("description") || null,
      image: formData.get("image") || null,
      logo: formData.get("logo") || null,
      websiteUrl: formData.get("websiteUrl") || null,
      phone: formData.get("phone") || null,
      address: formData.get("address") || null,
      email: formData.get("email") || null,
      about: formData.get("about") || null,
      facilities: formData.get("facilities") || null,
      published: formData.get("published") === "on",
    };
    try {
      const url = okul ? `/api/admin/okullar/${okul.id}` : "/api/admin/okullar";
      const res = await fetch(url, {
        method: okul ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Kaydedilemedi.");
        return;
      }
      router.push("/admin/okullar");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Okul Adı *
        </label>
        <input
          name="name"
          required
          defaultValue={okul?.name}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Slug (URL)
        </label>
        <input
          name="slug"
          defaultValue={okul?.slug}
          placeholder="otomatik üretilir"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            İlçe *
          </label>
          <input
            name="district"
            required
            defaultValue={okul?.district}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Kademe *
          </label>
          <select
            name="level"
            required
            defaultValue={okul?.level}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          >
            <option value="Anaokulu">Anaokulu</option>
            <option value="İlkokul">İlkokul</option>
            <option value="Ortaokul">Ortaokul</option>
            <option value="Lise">Lise</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Kısa Açıklama
        </label>
        <textarea
          name="description"
          rows={2}
          defaultValue={okul?.description || ""}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Web Sitesi URL
        </label>
        <input
          name="websiteUrl"
          type="url"
          defaultValue={okul?.websiteUrl || ""}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Telefon
          </label>
          <input
            name="phone"
            defaultValue={okul?.phone || ""}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            E-posta
          </label>
          <input
            name="email"
            type="email"
            defaultValue={okul?.email || ""}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Adres
        </label>
        <input
          name="address"
          defaultValue={okul?.address || ""}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Görsel URL
        </label>
        <input
          name="image"
          type="url"
          defaultValue={okul?.image || ""}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
        />
      </div>
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={okul?.published ?? true}
            className="rounded border-slate-300 text-primary"
          />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Yayında
          </span>
        </label>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Kaydediliyor..." : okul ? "Güncelle" : "Ekle"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
