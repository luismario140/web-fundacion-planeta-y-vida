import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/bannerSlider.css";
import imagen1 from "../assets/imgbannerN/imagen1.jpg";
import imagen2 from "../assets/imgbannerN/imagen2.jpg";
import imagen3 from "../assets/imgbannerN/imagen3.jpg";
import imagen4 from "../assets/imgbannerN/imagen4.jpg";

const images = [
  { src: imagen3, alt: "Jornada comunitaria con niñas, niños y jóvenes" },
  { src: imagen1, alt: "Bosque y fuentes de agua del territorio" },
  { src: imagen2, alt: "Paisaje biodiverso atravesado por un río" },
  { src: imagen4, alt: "Paisaje rural de Antioquia" },
];

function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % images.length);
  const previous = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <section className="slider" aria-label="Imágenes de comunidad y territorio">
      <div className="container slider__container">
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="slider__image"
        />
        <button
          className="slider__button slider__button--left"
          type="button"
          onClick={previous}
          aria-label="Ver imagen anterior"
        >
          <FaChevronLeft />
        </button>
        <button
          className="slider__button slider__button--right"
          type="button"
          onClick={next}
          aria-label="Ver imagen siguiente"
        >
          <FaChevronRight />
        </button>
        <div className="slider__counter" aria-live="polite">
          {current + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}

export default BannerSlider;
