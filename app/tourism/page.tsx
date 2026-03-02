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
    <div className="restaurants-container">
      <h1 className="page-title">Tourist Places in Sirsa</h1>

      <div className="restaurants-grid">
        {tourismPlaces.map((place) => (
          <div key={place.id} className="restaurant-card">
            <Image
              src={place.image}
              alt={place.name}
              width={600}
              height={400}
              quality={100}
              className="card-image"
            />

            <div className="card-content">
              <h2>{place.name}</h2>
              <p className="cuisine">{place.type}</p>
              <p>⭐ {place.rating} Rating</p>

              <p className="card-desc">
                {place.description.substring(0, 120)}...
              </p>

              <div className="card-buttons">
                <Link
                  href={`/tourism/${place.slug}`}
                  className="details-btn"
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