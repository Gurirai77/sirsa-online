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
    <div className="restaurant-page-container">
      <h1 className="restaurant-page-title">Restaurants in Sirsa</h1>

      <div className="restaurant-page-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-page-card">
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              width={600}
              height={400}
              quality={100}
              className="restaurant-page-image"
            />

            <div className="restaurant-page-content">
              <h2 className="restaurant-page-name">{restaurant.name}</h2>

              <p className="restaurant-page-cuisine">
                {restaurant.cuisine}
              </p>

              <p className="restaurant-page-rating">
                ⭐ {restaurant.rating} Rating
              </p>

              <p className="restaurant-page-desc">
                {restaurant.description.substring(0, 120)}...
              </p>

              <div className="restaurant-page-buttons">
                <a
                  href={`tel:${restaurant.phone}`}
                  className="restaurant-page-call-btn"
                >
                  📞 Call
                </a>

                <Link
                  href={`/restaurants/${restaurant.slug}`}
                  className="restaurant-page-details-btn"
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