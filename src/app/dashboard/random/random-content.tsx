'use cache';

// Con 'use cache' este componente se ejecuta UNA sola vez en el servidor
// y el resultado se cachea. El cliente recibe exactamente el mismo HTML
// → no hay error de hidratación.
//
// Prueba: quita 'use cache' y recarga varias veces → verás el error de
// hidratación en consola porque servidor y cliente generan valores distintos.

export async function RandomContent() {
  const random = Math.random();
  const now = Date.now();
  const date = new Date();
  const uuid = crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(4));

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 max-w-md text-slate-800 font-mono text-sm">
      <Row label="Math.random()" value={String(random)} />
      <Row label="Date.now()" value={String(now)} />
      <Row label="new Date()" value={date.toISOString()} />
      <Row label="crypto.randomUUID()" value={uuid} />
      <Row label="getRandomValues()" value={Array.from(bytes).join(", ")} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-slate-700 break-all">{value}</span>
    </div>
  );
}
