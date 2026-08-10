import useSiteSettings from "../hooks/useSiteSettings";

function PageHero({ eyebrow, title, text, image, imageAlt = "", settingKey }) {
  const { assets } = useSiteSettings();
  const heroImage = settingKey ? assets[settingKey] || image : image;

  return (
    <section className={`page-hero ${heroImage ? "page-hero--image" : ""}`}>
      {heroImage && (
        <img className="page-hero__background" src={heroImage} alt={imageAlt} />
      )}
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

export default PageHero;
