function PageHero({ eyebrow, title, text, image, imageAlt = "" }) {
  return (
    <section className={`page-hero ${image ? "page-hero--image" : ""}`}>
      {image && (
        <img className="page-hero__background" src={image} alt={imageAlt} />
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
