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
    <div className="detail-container">
      <h1>{place.name}</h1>

      <Image
        src={place.image}
        alt={place.name}
        width={1200}
        height={700}
        quality={100}
        priority
        className="detail-img"
      />

      <p className="description">{place.description}</p>

      <div className="action-buttons">
        <a href={mapUrl} target="_blank" className="map-btn">
          📍 Open in Maps
        </a>
      </div>

      <div className="info-box">
        <p><strong>Type:</strong> {place.type}</p>
        <p><strong>Timings:</strong> {place.timings}</p>
        <p><strong>Rating:</strong> ⭐ {place.rating}</p>
      </div>

      <div className="features-section">
        <h3>Key Highlights</h3>
        <div className="badge-container">
          {place.features.map((feature, index) => (
            <span key={index} className="badge">
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