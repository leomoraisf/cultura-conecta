"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function parseTags(tagsText: string): string[] {
  return tagsText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export async function createOpportunity(formData: FormData) {
  const title = String(formData.get("title") || "");
  const institution = String(formData.get("institution") || "");
  const value = String(formData.get("value") || "");
  const deadlineText = String(formData.get("deadline") || "");
  const description = String(formData.get("description") || "");
  const tagsText = String(formData.get("tags") || "");

  if (
    !title ||
    !institution ||
    !value ||
    !deadlineText ||
    !description ||
    !tagsText
  ) {
    throw new Error("Preencha todos os campos do edital.");
  }

  await prisma.opportunity.create({
    data: {
      title,
      institution,
      value,
      deadline: new Date(deadlineText),
      description,
      tags: parseTags(tagsText),
    },
  });

  revalidatePath("/editais");
  revalidatePath("/matches");
  revalidatePath("/dashboard");
}