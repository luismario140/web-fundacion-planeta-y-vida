import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { involvementOptions } from "../data/institutionalData";
import heroImage from "../assets/imgbannerN/imagen3.jpg";

function Vinculate() {
  return (
    <>
      <PageHero
        eyebrow="Vincúlate"
        title="Hay muchas formas de poner tus capacidades al servicio de la vida"
        text="Personas, organizaciones, empresas e instituciones pueden sumar recursos, conocimiento, tiempo y redes para ampliar el impacto en comunidades y territorios."
        image={heroImage}
        imageAlt="Comunidad participando en una actividad colectiva"
        settingKey="vinculate_hero"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Formas de participar"
            title="Elige la ruta que mejor se conecta contigo"
            align="center"
          />
          <div className="involvement-grid">
            {involvementOptions.map(
              ({ icon: Icon, title, text, action, href }) => (
                <article className="involvement-card" key={title}>
                  <span className="icon-box">
                    <Icon aria-hidden="true" />
                  </span>
                  <h2>{title}</h2>
                  <p>{text}</p>
                  {href.startsWith("mailto:") ? (
                    <a className="button button--secondary" href={href}>
                      {action}
                    </a>
                  ) : (
                    <Link className="button button--secondary" to={href}>
                      {action}
                    </Link>
                  )}
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container centered-copy">
          <span className="eyebrow eyebrow--light">Impacto colectivo</span>
          <h2>Una alianza valiosa empieza con una conversación clara</h2>
          <p>
            Cuéntanos qué quieres aportar, qué capacidad representas o qué reto
            buscas abordar. Nuestro equipo orientará el siguiente paso.
          </p>
          <Link className="button button--primary" to="/contacto">
            Contactar a la Fundación
          </Link>
        </div>
      </section>
    </>
  );
}

export default Vinculate;
