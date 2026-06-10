import { useCallback, useEffect, useState } from "react";
import {
  FaExternalLinkAlt,
  FaFilePdf,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import {
  DOCUMENTS_BUCKET,
  getSignedDocumentUrl,
  sanitizeFileName,
  validatePdf,
} from "../../lib/documents";
import "../../styles/admin.css";

const initialForm = {
  title: "",
  description: "",
  category: "Legal",
  isPublished: false,
};

async function fetchDocuments() {
  return supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
}

function AdminDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await fetchDocuments();

    if (loadError) {
      setError(
        "No fue posible cargar los documentos. Revisa las políticas de Supabase.",
      );
    } else {
      setDocuments(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;

    fetchDocuments().then(({ data, error: loadError }) => {
      if (!active) return;

      if (loadError) {
        setError(
          "No fue posible cargar los documentos. Revisa las políticas de Supabase.",
        );
      } else {
        setDocuments(data ?? []);
      }

      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    setMessage("");

    const fileError = validatePdf(file);
    if (fileError) {
      setError(fileError);
      return;
    }

    setSubmitting(true);
    const filePath = `${user.id}/${crypto.randomUUID()}-${sanitizeFileName(
      file.name,
    )}`;

    const { error: uploadError } = await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      setSubmitting(false);
      setError("No fue posible subir el PDF.");
      return;
    }

    const { error: insertError } = await supabase.from("documents").insert({
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category.trim(),
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      is_published: form.isPublished,
      created_by: user.id,
    });

    if (insertError) {
      await supabase.storage.from(DOCUMENTS_BUCKET).remove([filePath]);
      setSubmitting(false);
      setError("El PDF subió, pero no fue posible guardar su información.");
      return;
    }

    setForm(initialForm);
    setFile(null);
    formElement.reset();
    setSubmitting(false);
    setMessage("Documento guardado correctamente.");
    await loadDocuments();
  };

  const togglePublished = async (document) => {
    setError("");
    const { error: updateError } = await supabase
      .from("documents")
      .update({ is_published: !document.is_published })
      .eq("id", document.id);

    if (updateError) {
      setError("No fue posible actualizar el estado del documento.");
      return;
    }

    await loadDocuments();
  };

  const deleteDocument = async (document) => {
    const confirmed = window.confirm(
      `¿Eliminar definitivamente "${document.title}"?`,
    );
    if (!confirmed) return;

    setError("");
    const { error: deleteError } = await supabase
      .from("documents")
      .delete()
      .eq("id", document.id);

    if (deleteError) {
      setError("No fue posible eliminar el registro.");
      return;
    }

    await supabase.storage
      .from(DOCUMENTS_BUCKET)
      .remove([document.file_path]);
    await loadDocuments();
  };

  const openDocument = async (document) => {
    try {
      const signedUrl = await getSignedDocumentUrl(document.file_path);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      setError("No fue posible abrir el documento.");
    }
  };

  return (
    <section className="admin-page">
      <div className="container admin-dashboard">
        <header className="admin-dashboard__header">
          <div>
            <span className="eyebrow">Área privada</span>
            <h1>Documentos de transparencia</h1>
            <p>Sesión iniciada como {user.email}</p>
          </div>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => supabase.auth.signOut()}
          >
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </header>

        <div className="admin-dashboard__grid">
          <form className="admin-card admin-form" onSubmit={handleSubmit}>
            <h2>Subir nuevo PDF</h2>
            <label>
              Nombre del documento
              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
              />
            </label>
            <label>
              Categoría
              <input
                type="text"
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                required
              />
            </label>
            <label>
              Descripción
              <textarea
                rows="4"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </label>
            <label>
              Archivo PDF, máximo 10 MB
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) => setFile(event.target.files[0] ?? null)}
                required
              />
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(event) =>
                  setForm({ ...form, isPublished: event.target.checked })
                }
              />
              Publicar inmediatamente
            </label>

            {error && <p className="admin-message admin-message--error">{error}</p>}
            {message && (
              <p className="admin-message admin-message--success">{message}</p>
            )}

            <button className="button button--primary" disabled={submitting}>
              {submitting ? "Subiendo..." : "Guardar documento"}
            </button>
          </form>

          <div className="admin-card admin-documents">
            <h2>Documentos cargados</h2>
            {loading ? (
              <p>Cargando documentos...</p>
            ) : documents.length === 0 ? (
              <p>Aún no hay documentos cargados.</p>
            ) : (
              <div className="admin-documents__list">
                {documents.map((document) => (
                  <article key={document.id}>
                    <span className="admin-document__icon">
                      <FaFilePdf />
                    </span>
                    <div className="admin-document__content">
                      <small>{document.category}</small>
                      <h3>{document.title}</h3>
                      <span
                        className={
                          document.is_published
                            ? "admin-status admin-status--published"
                            : "admin-status"
                        }
                      >
                        {document.is_published ? "Publicado" : "Borrador"}
                      </span>
                    </div>
                    <div className="admin-document__actions">
                      <button
                        type="button"
                        onClick={() => openDocument(document)}
                        aria-label={`Abrir ${document.title}`}
                      >
                        <FaExternalLinkAlt />
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePublished(document)}
                      >
                        {document.is_published ? "Ocultar" : "Publicar"}
                      </button>
                      <button
                        className="admin-document__delete"
                        type="button"
                        onClick={() => deleteDocument(document)}
                        aria-label={`Eliminar ${document.title}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminDocuments;
