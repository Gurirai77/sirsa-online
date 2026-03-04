import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ DYNAMIC METADATA FOR RESTAURANTS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const restaurant = restaurants.find(
    (r) => r.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!restaurant) {
    return {
      title: "Restaurant Not Found | Sirsa Online",
      description: "The requested restaurant could not be found in Sirsa.",
    };
  }

  return {
    title: `${restaurant.name} - ${restaurant.cuisine} Restaurant in Sirsa | Sirsa Online`,
    description: restaurant.description.substring(0, 160),
    keywords: `${restaurant.name}, ${restaurant.cuisine} restaurant, Sirsa restaurants, Haryana, food, dining, ${restaurant.features?.join(', ') || 'best restaurant'}`,
    openGraph: {
      title: `${restaurant.name} - Best ${restaurant.cuisine} Restaurant in Sirsa`,
      description: restaurant.description.substring(0, 160),
      images: restaurant.image ? [restaurant.image] : [],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${restaurant.name} - Sirsa Restaurants`,
      description: restaurant.description.substring(0, 160),
      images: restaurant.image ? [restaurant.image] : [],
    },
    alternates: {
      canonical: `https://sirsa.online/restaurants/${restaurant.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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