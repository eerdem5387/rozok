import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminMesajlarPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        İletişim Mesajları
      </h1>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {messages.length === 0 ? (
          <p className="p-8 text-center text-slate-500">
            Henüz mesaj yok.
          </p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-6 ${!m.read ? "bg-primary/5" : ""}`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {m.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {m.email} {m.phone && `• ${m.phone}`}
                    </p>
                    {m.subject && (
                      <p className="text-sm text-slate-500 mt-1">
                        Konu: {m.subject}
                      </p>
                    )}
                    <p className="mt-2 text-slate-700 dark:text-slate-300">
                      {m.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(m.createdAt).toLocaleString("tr-TR")}
                    </p>
                  </div>
                  {!m.read && (
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded">
                      Yeni
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
