'use client';

import { useState } from 'react';

interface PokemonData {
  id: number;
  name: string;
  sprites: { front_default: string };
}

export function PokemonClient() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (id: number) => {
    setLoading(true);
    const data: PokemonData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    ).then((r) => r.json());
    setPokemon(data);
    setLoading(false);
  };

  const handleNext = () => {
    const nextId = pokemonId + 1;
    setPokemonId(nextId);
    fetchPokemon(nextId);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 max-w-md">
      <span className="text-xs text-slate-400 font-mono">
        use client · useState · fetch en el cliente
      </span>

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          max={151}
          value={pokemonId}
          onChange={(e) => setPokemonId(Number(e.target.value))}
          className="border rounded px-3 py-1 w-24 text-slate-700"
        />
        <button
          onClick={() => fetchPokemon(pokemonId)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
        <button
          onClick={handleNext}
          className="bg-slate-200 text-slate-700 px-4 py-1 rounded hover:bg-slate-300"
        >
          Siguiente →
        </button>
      </div>

      {loading && <p className="text-slate-400 text-sm">Cargando...</p>}

      {!loading && pokemon && (
        <div className="flex items-center gap-4 text-slate-700">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-20 h-20"
          />
          <div>
            <p className="text-xl font-bold capitalize">{pokemon.name}</p>
            <p className="text-sm">#{pokemon.id}</p>
          </div>
        </div>
      )}

      {!loading && !pokemon && (
        <p className="text-slate-400 text-sm">Pulsa Buscar o Siguiente para cargar un pokémon.</p>
      )}
    </div>
  );
}
