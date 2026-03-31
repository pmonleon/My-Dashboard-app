import { Suspense } from "react";
import { RandomContent } from "./random-content";
import { PokemonCached } from "./pokemon-cached";
import { PokemonClient } from "./pokemon-client";


export default function RandomPage() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <span className="text-5xl my-2">use cache · ejemplos</span>

      {/* 1 — Non-deterministic: por qué use cache evita el error de hidratación */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-700">
          1. Non-deterministic data (Server Component cacheado)
        </h2>
        <p className="text-slate-400 text-sm">
          Math.random, Date.now y crypto se ejecutan una sola vez en servidor.
          El cliente recibe el mismo HTML → sin error de hidratación.
        </p>
        <Suspense fallback={<p>Cargando...</p>}>
          <RandomContent />
        </Suspense>
      </section>

      {/* 2 — use cache + cacheLife: revalidate cada 60 segundos */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-700">
          2. Fetch con cacheLife (revalidate 60s)
        </h2>
        <p className="text-slate-400 text-sm">
          El componente se cachea en servidor. Cada 60s Next.js lo regenera en
          background. El usuario nunca espera un re-fetch.
        </p>
        <Suspense fallback={<p>Cargando pokémon cacheado...</p>}>
          <PokemonCached id={25} />
        </Suspense>
      </section>

      {/* 3 — use client: fetch en el navegador con useState */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-slate-700">
          3. Fetch en cliente (use client + useState)
        </h2>
        <p className="text-slate-400 text-sm">
          Componente 100% cliente. El fetch ocurre en el navegador al pulsar el
          botón. Sin SSR, sin caché de servidor, sin hidratación.
        </p>
        <PokemonClient />
      </section>
    </div>
  );
}
