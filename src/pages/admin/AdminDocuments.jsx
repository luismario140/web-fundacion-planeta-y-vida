import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaCloudUploadAlt,
  FaExternalLinkAlt,
  FaFilePdf,
  FaHome,
  FaImage,
  FaLayerGroup,
  FaPenNib,
  FaRegFileAlt,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useSiteSettings from "../../hooks/useSiteSettings";
import { SITE_ASSETS_BUCKET } from "../../context/SiteSettingsProvider";
import { supabase } from "../../lib/supabase";
import {
  DOCUMENTS_BUCKET,
  getSignedDocumentUrl,
  sanitizeFileName,
  validatePdf,
} from "../../lib/documents";
import logoFallback from "../../assets/logo.png";
import homeFallback from "../../assets/imgbannerN/imagen3.jpg";
import nosotrosFallback from "../../assets/imgbannerN/imagen4.jpg";
import serviciosFallback from "../../assets/imgbannerN/imagen3.jpg";
import territoriosFallback from "../../assets/imgbannerN/imagen2.jpg";
import proyectosFallback from "../../assets/imgbannerN/imagen1.jpg";
import transparenciaFallback from "../../assets/imgbannerN/imagen2.jpg";
import contactoFallback from "../../assets/imgbannerN/imagen4.jpg";
import vinculateFallback from "../../assets/imgbannerN/imagen3.jpg";
import "../../styles/admin.css";

const initialForm = {
  title: "",
  description: "",
  category: "Legal",
  isPublished: false,
};

const visualSettings = [
  {
    key: "site_logo",
    label: "Logo principal",
    help: "Aparece en el menu superior y en el pie de pagina.",
    fallback: logoFallback,
  },
  {
    key: "home_hero",
    label: "Fondo de inicio",
    help: "Imagen principal de la primera pantalla.",
    fallback: homeFallback,
  },
  {
    key: "nosotros_hero",
    label: "Fondo de quienes somos",
    help: "Portada de la pagina institucional.",
    fallback: nosotrosFallback,
  },
  {
    key: "servicios_hero",
    label: "Fondo de que hacemos",
    help: "Portada de capacidades y servicios.",
    fallback: serviciosFallback,
  },
  {
    key: "territorios_hero",
    label: "Fondo de territorios",
    help: "Portada de presencia territorial.",
    fallback: territoriosFallback,
  },
  {
    key: "proyectos_hero",
    label: "Fondo de proyectos",
    help: "Portada del portafolio institucional.",
    fallback: proyectosFallback,
  },
  {
    key: "transparencia_hero",
    label: "Fondo de transparencia",
    help: "Portada publica de documentos.",
    fallback: transparenciaFallback,
  },
  {
    key: "contacto_hero",
    label: "Fondo de contacto",
    help: "Portada de canales institucionales.",
    fallback: contactoFallback,
  },
  {
    key: "vinculate_hero",
    label: "Fondo de vinculate",
    help: "Portada de vinculacion y alianzas.",
    fallback: vinculateFallback,
  },
];

async function fetchDocuments() {
  return supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
}

function AdminDocuments() {
  const { user } = useAuth();
  const { assets, settings, available, refreshSettings } = useSiteSettings();
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState("overview");
  const [documents, setDocuments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [visualMessage, setVisualMessage] = useState("");
  const [visualError, setVisualError] = useState("");
  const [uploadingKey, setUploadingKey] = useState("");

  const publishedCount = useMemo(
    () => documents.filter((document) => document.is_published).length,
    [documents],
  );

  const draftCount = documents.length - publishedCount;

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await fetchDocuments();

    if (loadError) {
      setError(
        "No fue posible cargar los documentos. Revisa las politicas de Supabase.",
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
          "No fue posible cargar los documentos. Revisa las politicas de Supabase.",
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

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
      setError("El PDF subio, pero no fue posible guardar su informacion.");
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
      `Eliminar definitivamente "${document.title}"?`,
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

    await supabase.storage.from(DOCUMENTS_BUCKET).remove([document.file_path]);
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

  const uploadVisualAsset = async (setting, selectedFile) => {
    setVisualError("");
    setVisualMessage("");

    if (!selectedFile) return;

    if (!available) {
      setVisualError(
        "Primero ejecuta la actualizacion SQL de configuracion visual en Supabase.",
      );
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setVisualError("Selecciona una imagen valida.");
      return;
    }

    if (selectedFile.size > 5242880) {
      setVisualError("La imagen no debe superar 5 MB.");
      return;
    }

    setUploadingKey(setting.key);
    const filePath = `${setting.key}/${crypto.randomUUID()}-${sanitizeFileName(
      selectedFile.name,
    )}`;

    const { error: uploadError } = await supabase.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(filePath, selectedFile, {
        cacheControl: "3600",
        contentType: selectedFile.type,
        upsert: false,
      });

    if (uploadError) {
      setUploadingKey("");
      setVisualError("No fue posible subir la imagen.");
      return;
    }

    const { error: saveError } = await supabase.from("site_settings").upsert({
      key: setting.key,
      value: filePath,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    });

    if (saveError) {
      await supabase.storage.from(SITE_ASSETS_BUCKET).remove([filePath]);
      setUploadingKey("");
      setVisualError("La imagen subio, pero no fue posible guardarla.");
      return;
    }

    setUploadingKey("");
    setVisualMessage(`${setting.label} actualizado correctamente.`);
    await refreshSettings();
  };

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar" aria-label="Panel administrativo">
        <div className="admin-sidebar__brand">
          <img src={assets.site_logo || logoFallback} alt="" />
          <div>
            <strong>Planeta y Vida</strong>
            <span>Panel privado</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Acciones administrativas">
          <button
            className={activePanel === "overview" ? "is-active" : ""}
            type="button"
            onClick={() => setActivePanel("overview")}
          >
            <FaHome /> Inicio
          </button>
          <button
            className={activePanel === "documents" ? "is-active" : ""}
            type="button"
            onClick={() => setActivePanel("documents")}
          >
            <FaRegFileAlt /> Documentos
          </button>
          <button
            className={activePanel === "visuals" ? "is-active" : ""}
            type="button"
            onClick={() => setActivePanel("visuals")}
          >
            <FaImage /> Logo y fondos
          </button>
        </nav>

        <button className="admin-sidebar__logout" type="button" onClick={handleSignOut}>
          <FaSignOutAlt /> Cerrar sesion
        </button>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Sesion activa</span>
            <h1>Dashboard administrativo</h1>
            <p>{user.email}</p>
          </div>
          <button className="admin-icon-button" type="button" onClick={handleSignOut} aria-label="Cerrar sesion">
            <FaSignOutAlt />
          </button>
        </header>

        {activePanel === "overview" && (
          <div className="admin-panel">
            <div className="admin-actions">
              <button type="button" onClick={() => setActivePanel("documents")}>
                <span><FaFilePdf /></span>
                <strong>Gestionar documentos</strong>
                <small>Subir PDF, publicar, ocultar o eliminar archivos.</small>
              </button>
              <button type="button" onClick={() => setActivePanel("visuals")}>
                <span><FaPenNib /></span>
                <strong>Cambiar identidad visual</strong>
                <small>Actualizar logo y fondos principales del sitio.</small>
              </button>
            </div>

            <div className="admin-metrics">
              <article>
                <FaLayerGroup />
                <span>{documents.length}</span>
                <small>Documentos totales</small>
              </article>
              <article>
                <FaCheckCircle />
                <span>{publishedCount}</span>
                <small>Publicados</small>
              </article>
              <article>
                <FaRegFileAlt />
                <span>{draftCount}</span>
                <small>Borradores</small>
              </article>
            </div>
          </div>
        )}

        {activePanel === "documents" && (
          <div className="admin-panel admin-dashboard__grid">
            <form className="admin-card admin-form" onSubmit={handleSubmit}>
              <div className="admin-card__heading">
                <FaCloudUploadAlt />
                <div>
                  <h2>Subir nuevo PDF</h2>
                  <p>Agrega documentos institucionales a transparencia.</p>
                </div>
              </div>
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
                Categoria
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
                Descripcion
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                />
              </label>
              <label>
                Archivo PDF, maximo 10 MB
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
              <div className="admin-card__heading">
                <FaFilePdf />
                <div>
                  <h2>Documentos cargados</h2>
                  <p>Controla que queda publico y que queda como borrador.</p>
                </div>
              </div>
              {loading ? (
                <p>Cargando documentos...</p>
              ) : documents.length === 0 ? (
                <p>Aun no hay documentos cargados.</p>
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
        )}

        {activePanel === "visuals" && (
          <div className="admin-panel">
            <div className="admin-visuals">
              <div className="admin-card__heading">
                <FaImage />
                <div>
                  <h2>Logo e imagenes de fondo</h2>
                  <p>Sube imagenes livianas. Se aplican al sitio publico al guardar.</p>
                </div>
              </div>

              {!available && (
                <p className="admin-message admin-message--error">
                  Falta ejecutar la actualizacion SQL de site_settings y site-assets.
                </p>
              )}
              {visualError && (
                <p className="admin-message admin-message--error">{visualError}</p>
              )}
              {visualMessage && (
                <p className="admin-message admin-message--success">{visualMessage}</p>
              )}

              <div className="admin-visuals__grid">
                {visualSettings.map((setting) => (
                  <article className="admin-visual-card" key={setting.key}>
                    <img
                      src={assets[setting.key] || setting.fallback}
                      alt=""
                    />
                    <div>
                      <h3>{setting.label}</h3>
                      <p>{setting.help}</p>
                      {settings[setting.key] && <small>Personalizado</small>}
                    </div>
                    <label className="admin-upload-button">
                      <FaCloudUploadAlt />
                      {uploadingKey === setting.key ? "Subiendo..." : "Cambiar"}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingKey === setting.key}
                        onChange={(event) =>
                          uploadVisualAsset(setting, event.target.files[0] ?? null)
                        }
                      />
                    </label>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDocuments;
