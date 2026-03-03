import { tourismPlaces } from "@/data/tourism";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Best Tourist Places in Sirsa | Sirsa Portal",
  description:
    "Explore famous tourist attractions in Sirsa including parks, religious places and historical spots.",
};

export default function TourismPage() {
  return (
    <div className="tourism-page-container">
      <h1 className="tourism-page-title">
        Tourist Places in Sirsa
      </h1>

      <div className="tourism-page-grid">
        {tourismPlaces.map((place) => (
          <div key={place.id} className="tourism-page-card">
            <Image
              src={place.image}
              alt={place.name}
              width={600}
              height={400}
              quality={100}
              className="tourism-page-image"
            />

            <div className="tourism-page-content">
              <h2 className="tourism-page-name">
                {place.name}
              </h2>

              <p className="tourism-page-type">
                {place.type}
              </p>

              <p className="tourism-page-rating">
                ⭐ {place.rating} Rating
              </p>

              <p className="tourism-page-desc">
                {place.description.substring(0, 120)}...
              </p>

              <div className="tourism-page-buttons">
                <Link
                  href={`/tourism/${place.slug}`}
                  className="tourism-page-details-btn"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}