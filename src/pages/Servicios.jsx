import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { capabilities } from "../data/institutionalData";
import heroImage from "../assets/imgbannerN/imagen3.jpg";

function Servicios() {
  return (
    <>
      <PageHero
        eyebrow="Qué hacemos"
        title="Capacidades institucionales para operar procesos de alto impacto"
        text="No ofrecemos acciones aisladas: estructuramos rutas de trabajo que combinan conocimiento técnico, participación comunitaria, gestión territorial y articulación interinstitucional."
        image={heroImage}
        imageAlt="Jornada comunitaria con niñas, niños y jóvenes"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Áreas de capacidad"
            title="Una respuesta integral a desafíos conectados"
            text="Cada capacidad puede funcionar como una línea especializada o integrarse con otras para construir programas territoriales más robustos."
          />
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, text }, index) => (
              <article className="capability-card" key={title}>
                <span className="capability-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container process-grid">
          <div>
            <span className="eyebrow">Nuestra forma de operar</span>
            <h2>De la lectura territorial a la sostenibilidad del proceso</h2>
          </div>
          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <strong>Escucha y diagnóstico</strong>
                <p>Comprendemos actores, capacidades, riesgos y oportunidades.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Diseño participativo</strong>
                <p>Construimos objetivos y rutas con comunidades y aliados.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Operación y acompañamiento</strong>
                <p>Implementamos con equipos, metodologías y gestión local.</p>
              </div>
            </li>
            <li>
              <span>04</span>
              <div>
                <strong>Seguimiento y aprendizaje</strong>
                <p>Documentamos avances y fortalecemos capacidades instaladas.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container callout">
          <div>
            <span className="eyebrow">Conversemos</span>
            <h2>¿Tienes un reto territorial o una convocatoria en marcha?</h2>
            <p>
              Podemos explorar capacidades, alcance, aliados y una ruta de
              estructuración pertinente.
            </p>
          </div>
          <Link className="button button--primary" to="/contacto">
            Contactar al equipo
          </Link>
        </div>
      </section>
    </>
  );
}

export default Servicios;
