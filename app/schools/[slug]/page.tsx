import { schools } from "@/data/schools";
import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolPage({ params }: Props) {
  const { slug } = await params;

  const school = schools.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!school) return notFound();

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    school.address
  )}`;

  const schemaData = {
  "@context": "https://schema.org",
  "@type": "School",
  name: school.name,
  image: `https://yourdomain.com${school.image}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: school.address,
    addressLocality: "Sirsa",
    addressRegion: "Haryana",
    addressCountry: "India",
  },
  telephone: school.phone,
  description: school.description,
};

  return (
    <div className="detail-container">
      <h1>{school.name}</h1>

      <Image
        src={school.image}
        alt={school.name}
  width={1200}
  height={700}
  quality={100}
  priority
        className="detail-img"
      />

      <p className="description">{school.description}</p>

      {/* Action Buttons */}
      <div className="action-buttons">
        <a href={`tel:${school.phone}`} className="call-btn">
          📞 Call Now
        </a>

        <a href={mapUrl} target="_blank" className="map-btn">
          📍 Open in Maps
        </a>
      </div>

      {/* Info Section */}
      <div className="info-box">
        <p><strong>Board:</strong> {school.board}</p>
        <p><strong>Timings:</strong> {school.timings}</p>
        <p><strong>Facilities:</strong> {school.facilities}</p>
      </div>

      {/* Features Badges */}
      <div className="features-section">
        <h3>Key Features</h3>
        <div className="badge-container">
          {school.features.map((feature, index) => (
            <span key={index} className="badge">
              ✔ {feature}
            </span>
          ))}
        </div>
      </div>

<Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(schemaData),
  }}
/>
    </div>
  );
}