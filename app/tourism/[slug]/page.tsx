import { tourismPlaces } from "@/data/tourism";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ SIMPLE DYNAMIC METADATA - Jo data hai usi se kaam chal jayega
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const place = tourismPlaces.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!place) {
    return {
      title: "Place Not Found | Sirsa Online",
      description: "The requested tourist place could not be found in Sirsa.",
    };
  }

  // Jo data hai usi se metadata banao
  return {
    title: `${place.name} - ${place.type} in Sirsa | Sirsa Online`,
    description: place.description ? place.description.substring(0, 160) : `Visit ${place.name}, a famous ${place.type} in Sirsa. Check timings, location and more.`,
    openGraph: {
      title: `${place.name} - Sirsa Tourism`,
      description: place.description ? place.description.substring(0, 160) : `Explore ${place.name} in Sirsa.`,
      images: place.image ? [place.image] : [],
    },
  };
}

export default async function TourismDetail({ params }: Props) {
  const { slug } = await params;

  const place = tourismPlaces.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!place) return notFound();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.address || place.name + " Sirsa"
  )}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.name,
    image: place.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address || place.name,
      addressLocality: "Sirsa",
      addressRegion: "Haryana",
      addressCountry: "India",
    },
    description: place.description || `${place.name} is a famous ${place.type} in Sirsa.`,
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
          {place.description || `Explore ${place.name}, one of the popular ${place.type} places in Sirsa.`}
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
          <p><strong>Type:</strong> {place.type || "Tourist Place"}</p>
          <p><strong>Timings:</strong> {place.timings || "Open daily"}</p>
          <p><strong>Rating:</strong> ⭐ {place.rating || "4.0"}</p>
        </div>

        <h3 style={{ marginBottom: "15px" }}>Key Highlights</h3>
        <div className="detail-badges">
          {place.features && place.features.length > 0 ? (
            place.features.map((feature, index) => (
              <span key={index} className="detail-badge">
                ✔ {feature}
              </span>
            ))
          ) : (
            <>
              <span className="detail-badge">✔ Popular Destination</span>
              <span className="detail-badge">✔ Family Friendly</span>
              <span className="detail-badge">✔ Must Visit</span>
            </>
          )}
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