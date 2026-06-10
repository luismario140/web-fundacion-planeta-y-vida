import { supabase } from "./supabase";

export const DOCUMENTS_BUCKET = "institutional-documents";
export const MAX_PDF_SIZE = 10 * 1024 * 1024;

export function validatePdf(file) {
  if (!file) return "Selecciona un archivo PDF.";

  const isPdf =
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf");

  if (!isPdf) return "Solo se permiten archivos PDF.";
  if (file.size > MAX_PDF_SIZE) return "El PDF no puede superar 10 MB.";

  return "";
}

export function sanitizeFileName(fileName) {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

export async function getSignedDocumentUrl(filePath) {
  const { data, error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(filePath, 60 * 10);

  if (error) throw error;
  return data.signedUrl;
}
