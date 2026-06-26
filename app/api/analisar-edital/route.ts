import { Buffer } from "node:buffer";
import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { extractOpportunityFromText } from "@/lib/extract-opportunity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Nenhum arquivo PDF foi enviado." },
        { status: 400 },
      );
    }

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        { error: "Envie um arquivo no formato PDF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "O arquivo deve ter no máximo 10 MB." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parser = new PDFParse({
      data: buffer,
    });

    const parsed = await parser.getText();
    await parser.destroy();

    const text = parsed.text ?? "";

    if (text.trim().length < 80) {
      return NextResponse.json(
        {
          error:
            "Não foi possível extrair texto suficiente do PDF. Talvez ele seja uma imagem escaneada.",
        },
        { status: 422 },
      );
    }

    const opportunity = extractOpportunityFromText(text, file.name);

    return NextResponse.json({
      ok: true,
      fileName: file.name,
      textLength: text.length,
      rawTextPreview: text.slice(0, 1200),
      opportunity,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erro inesperado ao analisar o PDF.",
      },
      { status: 500 },
    );
  }
}