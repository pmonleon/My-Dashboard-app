"use cache";

import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";

interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
}

export async function PokemonCached({ id }: { id: number }) {
  cacheTag("pokemons", `pokemon-${id}`);
  cacheLife({
    stale: 60,       // el browser sirve desde caché hasta 60s
    revalidate: 60,  // Next.js regenera en background cada 60s
    expire: 300,     // máximo absoluto: 5 minutos
  });

  const pokemon: PokemonData = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
  ).then((r) => r.json());

  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 max-w-md">
      <Image
        alt={pokemon.name}
        className="w-24 h-24"
        src={pokemon.sprites.front_default}
        width={96}
        height={96}
      />
      <div className="flex flex-col gap-1 text-slate-700">
        <span className="text-xs text-slate-400 font-mono">
          use cache · revalidate 60s
        </span>
        <span className="text-xl font-bold capitalize">{pokemon.name}</span>
        <span className="text-sm">#{pokemon.id}</span>
        <span className="text-sm">
          Altura: {pokemon.height / 10}m · Peso: {pokemon.weight / 10}kg
        </span>
      </div>
    </div>
  );
}
