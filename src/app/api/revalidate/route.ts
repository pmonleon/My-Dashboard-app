import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Ejemplos de uso:
//   GET /api/revalidate?tag=pokemons        → invalida todos los pokemons
//   GET /api/revalidate?tag=pokemon-25      → invalida solo el pokemon #25

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return NextResponse.json({ error: "Falta el parámetro ?tag=" }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({
    revalidated: true,
    tag,
    now: Date.now(),
  });
}
