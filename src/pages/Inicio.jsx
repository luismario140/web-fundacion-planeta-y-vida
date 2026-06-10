import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "../components/SectionHeading";
import {
  capabilities,
  institutionalPillars,
  projects,
} from "../data/institutionalData";
import heroImage from "../assets/imgbannerN/imagen3.jpg";
import territoryImage from "../assets/imgbannerN/imagen2.jpg";

function Inicio() {
  return (
    <>
      <section className="home-hero">
        <img
          className="home-hero__image"
          src={heroImage}
          alt="Actividad comunitaria con niñas, niños y jóvenes"
        />
        <div className="home-hero__overlay" />
        <div className="container home-hero__content">
          
          <h2 className="home-hero__foundation">
            <span className="home-hero__name">Planeta y Vida</span>
            <span className="home-hero__institution">
              Fundación Social Integral
            </span>
          </h2>

          <span className="eyebrow eyebrow--light">
            Plataforma territorial de operación social, ambiental y productiva
          </span>
          <span className="home-hero__tagline">
            Transformamos territorios, cuidamos la vida
          </span>
          <p>
            En la Fundación Social Integral Planeta y Vida articulamos desarrollo
            social, bioeconomía comunitaria, cultura, ambiente e innovación
            social para construir bienestar colectivo y sostenibilidad desde
            Antioquia y Chocó, con proyección nacional.
          </p>
          <div className="button-group">
            <Link className="button button--primary" to="/nosotros">
              Conocer la Fundación
            </Link>
            <Link className="button button--light" to="/proyectos">
              Ver proyectos
            </Link>
            <Link className="button button--ghost-light" to="/vinculate">
              Vincularme
            </Link>
          </div>
        </div>
      </section>

      <section className="impact-strip" aria-label="Alcance institucional">
        <div className="container impact-strip__grid">
          <div>
            <strong>Antioquia</strong>
            <span>Base de articulación y operación</span>
          </div>
          <div>
            <strong>Chocó</strong>
            <span>Territorios bioculturales prioritarios</span>
          </div>
          <div>
            <strong>Proyección nacional</strong>
            <span>Alianzas y modelos replicables</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Nuestra identidad"
            title="Una plataforma para convertir capacidades en impacto territorial"
            text="Somos una organización social con enfoque territorial, diferencial y afrodescendiente. Diseñamos, estructuramos y operamos procesos que conectan comunidades, instituciones y aliados."
            align="center"
          />
          <div className="pillar-grid">
            {institutionalPillars.map(({ icon: Icon, title, text }) => (
              <article className="pillar-card" key={title}>
                <span className="icon-box">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Qué hacemos"
            title="Capacidades que se articulan alrededor de la vida"
            text="Integramos conocimiento técnico, participación comunitaria y gestión institucional para responder a retos sociales, ambientales y económicos."
          />
          <div className="capability-grid capability-grid--compact">
            {capabilities.slice(0, 6).map(({ icon: Icon, title, text }) => (
              <article className="capability-card" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="section-action">
            <Link className="text-link" to="/que-hacemos">
              Conocer todas nuestras capacidades <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-feature">
          <div className="split-feature__image">
            <img
              src={territoryImage}
              alt="Paisaje de bosque y río en un territorio biodiverso"
            />
            <span className="split-feature__badge">
              <FaMapMarkerAlt /> Antioquia · Chocó · Colombia
            </span>
          </div>
          <div className="split-feature__content">
            <span className="eyebrow">Presencia territorial</span>
            <h2>Trabajamos desde el territorio, con quienes lo habitan</h2>
            <p>
              Nuestra acción prioriza territorios urbanos, rurales, costeros,
              anfibios y comunitarios, con especial atención a comunidades
              afrodescendientes, rurales y poblaciones con retos sociales,
              ambientales y económicos.
            </p>
            <Link className="button button--secondary" to="/territorios">
              Explorar territorios
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHeading
            eyebrow="Proyectos bandera"
            title="Iniciativas preparadas para sumar aliados"
            text="Portafolio de proyectos orientado a cooperación, inversión social y articulación pública, privada y comunitaria."
          />
          <div className="project-preview">
            {projects.slice(0, 3).map((project, index) => (
              <article className="project-preview__card" key={project.title}>
                <span>0{index + 1}</span>
                <small>{project.line}</small>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </article>
            ))}
          </div>
          <div className="section-action section-action--light">
            <Link className="button button--primary" to="/proyectos">
              Ver portafolio de proyectos
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container callout">
          <div>
            <span className="eyebrow">Construyamos juntos</span>
            <h2>Tu organización también puede activar oportunidades</h2>
            <p>
              Conversemos sobre cooperación, voluntariado, donaciones o alianzas
              para llevar capacidades concretas a comunidades y territorios.
            </p>
          </div>
          <Link className="button button--primary" to="/vinculate">
            Conocer formas de vinculación
          </Link>
        </div>
      </section>
    </>
  );
}

export default Inicio;
