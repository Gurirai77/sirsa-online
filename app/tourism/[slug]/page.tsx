import { tourismPlaces } from "@/data/tourism";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TourismDetail({ params }: Props) {
  const { slug } = await params;

  const place = tourismPlaces.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!place) return notFound();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.address
  )}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.name,
    image: place.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address,
      addressLocality: "Sirsa",
      addressRegion: "Haryana",
      addressCountry: "India",
    },
    description: place.description,
  };

  return (
    <div className="detail-page">

      {/* HERO */}
      <div className="detail-hero">
        <Image
          src={place.image}
          alt={place.name}
          fill
          priority
          className="detail-hero-img"
        />
        <div className="detail-hero-overlay"></div>
        <h1 className="detail-hero-title">
          {place.name}
        </h1>
      </div>

      {/* BODY */}
      <div className="detail-body">

        <p className="detail-description">
          {place.description}
        </p>

        <div className="detail-actions">
          <a
            href={mapUrl}
            target="_blank"
            className="detail-btn detail-btn-primary"
          >
            📍 Open in Maps
          </a>
        </div>

        <div className="detail-info">
          <p><strong>Type:</strong> {place.type}</p>
          <p><strong>Timings:</strong> {place.timings}</p>
          <p><strong>Rating:</strong> ⭐ {place.rating}</p>
        </div>

        <h3 style={{ marginBottom: "15px" }}>Key Highlights</h3>
        <div className="detail-badges">
          {place.features.map((feature, index) => (
            <span key={index} className="detail-badge">
              ✔ {feature}
            </span>
          ))}
        </div>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </div>
  );
}