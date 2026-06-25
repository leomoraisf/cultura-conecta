"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function parseTags(tagsText: string): string[] {
  return tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function createArtist(formData: FormData) {
  const name = String(formData.get("name") || "");
  const city = String(formData.get("city") || "");
  const area = String(formData.get("area") || "");
  const description = String(formData.get("description") || "");
  const tagsText = String(formData.get("tags") || "");

  if (!name || !city || !area || !description || !tagsText) {
    throw new Error("Preencha todos os campos do artista.");
  }

  await prisma.artist.create({
    data: {
      name,
      city,
      area,
      description,
      tags: parseTags(tagsText),
    },
  });

  revalidatePath("/artistas");
}