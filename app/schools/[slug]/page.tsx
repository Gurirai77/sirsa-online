import { schools } from "@/data/schools";
import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// ✅ DYNAMIC METADATA FOR SCHOOLS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const school = schools.find(
    (s) => s.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!school) {
    return {
      title: "School Not Found | Sirsa Online",
      description: "The requested school could not be found in Sirsa.",
    };
  }

  return {
    title: `${school.name} - ${school.board} School in Sirsa | Sirsa Online`,
    description: school.description.substring(0, 160),
    keywords: `${school.name}, ${school.board} school, Sirsa schools, Haryana, education, ${school.features?.join(', ') || 'best school'}`,
    openGraph: {
      title: `${school.name} - Best ${school.board} School in Sirsa`,
      description: school.description.substring(0, 160),
      images: school.image ? [school.image] : [],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${school.name} - Sirsa Schools`,
      description: school.description.substring(0, 160),
      images: school.image ? [school.image] : [],
    },
    alternates: {
      canonical: `https://sirsa.online/schools/${school.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
    <div className="detail-page">

      {/* HERO */}
      <div className="detail-hero">
        <Image
          src={school.image}
          alt={school.name}
          fill
          priority
          className="detail-hero-img"
        />
        <div className="detail-hero-overlay"></div>
        <h1 className="detail-hero-title">
          {school.name}
        </h1>
      </div>

      {/* BODY */}
      <div className="detail-body">

        <p className="detail-description">
          {school.description}
        </p>

        <div className="detail-actions">
          <a
            href={`tel:${school.phone}`}
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
          <p><strong>Board:</strong> {school.board}</p>
          <p><strong>Timings:</strong> {school.timings}</p>
          <p><strong>Facilities:</strong> {school.facilities}</p>
        </div>

        <h3 style={{ marginBottom: "15px" }}>Key Features</h3>
        <div className="detail-badges">
          {school.features.map((feature, index) => (
            <span key={index} className="detail-badge">
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