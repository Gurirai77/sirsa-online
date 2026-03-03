import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;

  const restaurant = restaurants.find(
    (r) => r.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!restaurant) return notFound();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    restaurant.address
  )}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    image: restaurant.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address,
      addressLocality: "Sirsa",
      addressRegion: "Haryana",
      addressCountry: "India",
    },
    telephone: restaurant.phone,
    servesCuisine: restaurant.cuisine,
    description: restaurant.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating,
      reviewCount: "120",
    },
  };

  return (
    <div className="detail-page">

      {/* HERO SECTION */}
      <div className="detail-hero">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          priority
          className="detail-hero-img"
        />
        <div className="detail-hero-overlay"></div>
        <h1 className="detail-hero-title">
          {restaurant.name}
        </h1>
      </div>

      {/* BODY */}
      <div className="detail-body">

        <p className="detail-description">
          {restaurant.description}
        </p>

        <div className="detail-actions">
          <a
            href={`tel:${restaurant.phone}`}
            className="detail-btn detail-btn-success"
          >
            📞 Call Now
          </a>

          <a
            href={mapUrl}
            target="_blank"
            className="detail-btn detail-btn-primary"
          >
            📍 Open in Maps
          </a>
        </div>

        <div className="detail-info">
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Timings:</strong> {restaurant.timings}</p>
          <p><strong>Rating:</strong> ⭐ {restaurant.rating}</p>
        </div>

        <h3 style={{ marginBottom: "15px" }}>Key Features</h3>
        <div className="detail-badges">
          {restaurant.features.map((feature, index) => (
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