import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import BannerSlider from "../components/BannerSlider";
import { institutionalPillars } from "../data/institutionalData";
import heroImage from "../assets/imgbannerN/imagen4.jpg";

function Nosotros() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Una organización que articula vida, territorio y oportunidades"
        text="Somos una organización social con enfoque territorial, diferencial y afrodescendiente, orientada a diseñar, estructurar y operar procesos sociales, ambientales y productivos que conectan a comunidades, instituciones y aliados para generar impacto real."
        image={heroImage}
        imageAlt="Paisaje rural de Antioquia"
      />

      <section className="section">
        <div className="container intro-grid">
          <div>
            <span className="eyebrow">Presentación institucional</span>
            <h2>Capacidad técnica con sentido humano y comunitario</h2>
          </div>
          <div className="rich-text">
            <p>
              La Fundación Social Integral Planeta y Vida es una entidad sin
              ánimo de lucro constituida en Colombia, con domicilio principal en
              Medellín. Nuestro trabajo reconoce la diversidad étnica, cultural,
              territorial y de género.
            </p>
            <p>
              Integramos protección social, bienestar psicosocial, niñez y
              familia, bioeconomía comunitaria, seguridad alimentaria, cultura,
              turismo regenerativo, ambiente e innovación social.
            </p>
          </div>
        </div>
      </section>

      <BannerSlider />

      <section className="section section--soft">
        <div className="container">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Tres principios sostienen nuestra operación"
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

      <section className="section">
        <div className="container values-grid">
          <article className="value-card value-card--green">
            <span>01</span>
            <h3>Propósito</h3>
            <p>
              Contribuir al bienestar colectivo y a la sostenibilidad de los
              territorios mediante procesos que protegen la vida y fortalecen
              capacidades locales.
            </p>
          </article>
          <article className="value-card value-card--blue">
            <span>02</span>
            <h3>Enfoque territorial</h3>
            <p>
              Partimos de las realidades, activos, saberes y prioridades de cada
              comunidad para construir respuestas pertinentes y sostenibles.
            </p>
          </article>
          <article className="value-card value-card--earth">
            <span>03</span>
            <h3>Enfoque diferencial afrodescendiente</h3>
            <p>
              Reconocemos identidad, memoria, derechos colectivos y patrimonio
              biocultural como base para el desarrollo y la participación.
            </p>
          </article>
          <article className="value-card value-card--olive">
            <span>04</span>
            <h3>Capacidad de articulación</h3>
            <p>
              Convertimos alianzas sociales, ambientales y productivas en
              programas viables, acompañados y conectados con el territorio.
            </p>
          </article>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container model-grid">
          <div>
            <span className="eyebrow eyebrow--light">Modelo institucional</span>
            <h2>Plataforma Territorial de Operación Social, Ambiental y Productiva</h2>
          </div>
          <div className="model-list">
            <div>
              <strong>Desarrollo humano y comunitario</strong>
              <p>Protección, derechos, participación y bienestar psicosocial.</p>
            </div>
            <div>
              <strong>Regeneración ambiental</strong>
              <p>Restauración, educación ambiental y resiliencia climática.</p>
            </div>
            <div>
              <strong>Bioeconomía territorial</strong>
              <p>Medios de vida, seguridad alimentaria y economías locales.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container callout">
          <div>
            <span className="eyebrow">Alianzas estratégicas</span>
            <h2>Capacidades distintas, un propósito compartido</h2>
            <p>
              Articulamos organizaciones comunitarias, entidades públicas,
              cooperación, academia y empresas para generar impacto sostenible.
            </p>
          </div>
          <Link className="button button--primary" to="/vinculate">
            Aliarse con nosotros
          </Link>
        </div>
      </section>
    </>
  );
}

export default Nosotros;
