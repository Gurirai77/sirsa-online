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
    <div className="detail-container">
      <h1>{restaurant.name}</h1>

      <Image
        src={restaurant.image}
        alt={restaurant.name}
        width={1200}
        height={700}
        quality={100}
        priority
        className="detail-img"
      />

      <p className="description">{restaurant.description}</p>

      <div className="action-buttons">
        <a href={`tel:${restaurant.phone}`} className="call-btn">
          📞 Call Now
        </a>

        <a href={mapUrl} target="_blank" className="map-btn">
          📍 Open in Maps
        </a>
      </div>

      <div className="info-box">
        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
        <p><strong>Timings:</strong> {restaurant.timings}</p>
        <p><strong>Rating:</strong> ⭐ {restaurant.rating}</p>
      </div>

      <div className="features-section">
        <h3>Key Features</h3>
        <div className="badge-container">
          {restaurant.features.map((feature, index) => (
            <span key={index} className="badge">
              ✔ {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />
    </div>
  );
}