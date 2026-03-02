import { restaurants } from "@/data/restaurants";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Best Restaurants in Sirsa | Sirsa Portal",
  description:
    "Explore top restaurants in Sirsa with ratings, contact details, cuisine and directions.",
};

export default function RestaurantsPage() {
  return (
    <div className="restaurants-container">
      <h1 className="page-title">Restaurants in Sirsa</h1>

      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              width={600}
              height={400}
              quality={100}
              className="card-image"
            />

            <div className="card-content">
              <h2>{restaurant.name}</h2>

              <p className="cuisine">{restaurant.cuisine}</p>
              <p className="rating">⭐ {restaurant.rating} Rating</p>

              <p className="card-desc">
                {restaurant.description.substring(0, 120)}...
              </p>

              <div className="card-buttons">
                <a href={`tel:${restaurant.phone}`} className="call-btn">
                  📞 Call
                </a>

                <Link
                  href={`/restaurants/${restaurant.slug}`}
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