"use cache";

import { cacheLife } from "next/cache";
import { Suspense } from "react";
import { Sidebar } from "@/components";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // cacheLife aquí afecta a toda la carcasa del layout (Sidebar + wrappers)
  // los children tienen su propio ciclo de caché independiente
  cacheLife("weeks");

  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        <Sidebar />

        <div className="p-2 w-full text-slate-900">
          <Suspense fallback={<p>Cargando...</p>}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
