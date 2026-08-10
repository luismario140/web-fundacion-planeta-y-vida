import { Link } from "react-router-dom";
import { FaMapMarkedAlt } from "react-icons/fa";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import heroImage from "../assets/imgbannerN/imagen2.jpg";
import antioquiaImage from "../assets/imgbannerN/imagen4.jpg";
import chocoImage from "../assets/imgbannerN/imagen1.jpg";

const territories = [
  {
    name: "Antioquia",
    label: "Base de articulación",
    image: antioquiaImage,
    alt: "Paisaje rural de Antioquia",
    text: "Medellín funciona como base institucional para gestión, formación y alianzas. La proyección territorial prioriza zonas urbanas y corredores rurales como Urabá y Bajo Cauca.",
  },
  {
    name: "Chocó",
    label: "Territorio biocultural prioritario",
    image: chocoImage,
    alt: "Bosque húmedo y río en el Chocó",
    text: "Acompañamos oportunidades en territorios costeros, anfibios y rurales, reconociendo la biodiversidad, los saberes afrodescendientes y las dinámicas del Atrato, Darién, San Juan y Pacífico Norte.",
  },
  {
    name: "Proyección nacional",
    label: "Modelos y alianzas",
    image: heroImage,
    alt: "Río rodeado por bosque",
    text: "Proyectamos capacidades, metodologías y alianzas hacia otros territorios de Colombia donde exista pertinencia social, ambiental, cultural y productiva.",
  },
];

function Territorios() {
  return (
    <>
      <PageHero
        eyebrow="Territorios"
        title="La transformación empieza por comprender dónde ocurre"
        text="Nuestra acción prioriza territorios urbanos, rurales, costeros, anfibios y comunitarios, con especial atención a comunidades afrodescendientes, rurales y poblaciones con retos sociales, ambientales y económicos."
        image={heroImage}
        imageAlt="Río entre bosques tropicales"
        settingKey="territorios_hero"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Cobertura estratégica"
            title="Presencia situada, visión nacional"
            text="Nuestra cobertura se construye a partir de relaciones, lectura del contexto y capacidad real de operación."
          />
          <div className="territory-grid">
            {territories.map((territory) => (
              <article className="territory-card" key={territory.name}>
                <img src={territory.image} alt={territory.alt} />
                <div className="territory-card__content">
                  <small>
                    <FaMapMarkedAlt /> {territory.label}
                  </small>
                  <h2>{territory.name}</h2>
                  <p>{territory.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container territory-approach">
          <div>
            <span className="eyebrow">Enfoque de entrada</span>
            <h2>No llegamos con respuestas prediseñadas</h2>
          </div>
          <div className="territory-approach__items">
            <p><strong>Escuchamos</strong> prioridades, memorias y saberes locales.</p>
            <p><strong>Mapeamos</strong> capacidades comunitarias e institucionales.</p>
            <p><strong>Articulamos</strong> recursos alrededor de una visión compartida.</p>
            <p><strong>Acompañamos</strong> la apropiación y sostenibilidad del proceso.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container callout">
          <div>
            <span className="eyebrow">Acción territorial</span>
            <h2>¿Representas una comunidad o entidad territorial?</h2>
            <p>
              Conversemos sobre necesidades, capacidades existentes y posibles
              rutas de articulación.
            </p>
          </div>
          <Link className="button button--primary" to="/contacto">
            Iniciar conversación
          </Link>
        </div>
      </section>
    </>
  );
}

export default Territorios;
