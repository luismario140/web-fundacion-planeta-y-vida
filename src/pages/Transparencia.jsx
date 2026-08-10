import {
  FaFilePdf,
  FaExternalLinkAlt,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import usePublishedDocuments from "../hooks/usePublishedDocuments";
import { getSignedDocumentUrl } from "../lib/documents";
import heroImage from "../assets/imgbannerN/imagen2.jpg";

function Transparencia() {
  const {
    documents: publishedDocuments,
    loading,
    configured,
  } = usePublishedDocuments();

  const openDocument = async (document) => {
    try {
      const signedUrl = await getSignedDocumentUrl(document.file_path);
      window.open(signedUrl, "_blank", "noopener,noreferrer");
    } catch {
      window.alert("No fue posible abrir el documento en este momento.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Confianza que se construye con información clara"
        text="Este espacio reúne la documentación institucional, las políticas y los canales de atención de la Fundación. Los archivos se publicarán aquí a medida que estén disponibles."
        image={heroImage}
        imageAlt="Río y bosque que representan el compromiso con el territorio"
        settingKey="transparencia_hero"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Información institucional"
            title="Documentos publicados"
            text="Consulta la documentación institucional vigente que la Fundación ha dispuesto para acceso público."
          />
          {loading ? (
            <p className="documents-empty">Cargando documentos...</p>
          ) : publishedDocuments.length > 0 ? (
            <div className="document-grid">
              {publishedDocuments.map((document) => (
                <article className="document-card" key={document.id}>
                  <span className="icon-box">
                    <FaFilePdf aria-hidden="true" />
                  </span>
                  <small className="document-card__category">
                    {document.category}
                  </small>
                  <h2>{document.title}</h2>
                  {document.description && <p>{document.description}</p>}
                  <button
                    className="text-link document-card__button"
                    type="button"
                    onClick={() => openDocument(document)}
                  >
                    Abrir PDF <FaExternalLinkAlt aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="documents-empty">
              {configured
                ? "No hay documentos publicados en este momento."
                : "La consulta documental estará disponible próximamente."}
            </p>
          )}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container transparency-note">
          <span className="eyebrow">Compromiso institucional</span>
          <h2>Información administrada y actualizada</h2>
          <p>
            Los documentos visibles en esta página son publicados directamente
            desde el área administrativa de la Fundación.
          </p>
        </div>
      </section>
    </>
  );
}

export default Transparencia;
