"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const tourismPlaces = [
    { name: "Tara Baba Kutiya", image: "/tourism/tara-baba-kutiya.jpg", location: "Sirsa City" },
    { name: "Atlantic Water Park", image: "/tourism/atlantic-water-park.jpg", location: "Hisar Road" },
    { name: "Ohm Cine Garden", image: "/tourism/ohm-cine-garden.jpg", location: "Dabwali Road" },
    { name: "Surkhab Tourist Complex", image: "/tourism/surkhab-tourist-complex.jpg", location: "Rania Road" },
    { name: "Gurudwara Chilla Sahib", image: "/tourism/gurudwara-chilla-sahib.jpg", location: "Rania" },
    { name: "Dera Sacha Sauda", image: "/tourism/dera-sacha-sauda-sirsa.jpg", location: "Sirsa" },
  ];

  const restaurants = [
    { name: "Amritsar Haveli", image: "/restaurants/amritsar-haveli-image.jpg", cuisine: "North Indian", rating: "4.5" },
    { name: "Kashish Restaurant", image: "/restaurants/kashish-image.jpg", cuisine: "Multi-cuisine", rating: "4.3" },
    { name: "Luxmi Sweets", image: "/restaurants/luxmi-sweets-sirsa.jpg", cuisine: "Sweets & Snacks", rating: "4.4" },
    { name: "Yellow Chilli", image: "/restaurants/yellow-chilli-image.jpg", cuisine: "Fine Dining", rating: "4.6" },
    { name: "Dessert House", image: "/restaurants/dessert.jpg", cuisine: "Desserts", rating: "4.2" },
    { name: "Salsa Bistro", image: "/restaurants/salsa-bistro-image.jpg", cuisine: "Continental", rating: "4.3" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-background">
          <Image
            src="/tourism/tara-baba-kutiya.jpg"
            alt="Tara Baba Kutiya"
            fill
            priority
            className="hero-image"
          />
        </div>

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            सिरसा की हर जानकारी, अब एक ही जगह।
            <span>Discover Sirsa - The City of Saints</span>
          </h1>

          <div className="search-wrapper">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search for Schools, Restaurants, News..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <Search />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* TOURISM SECTION */}
      <section className="section-wrapper">
        <div className="section-header">
          <h2 className="section-title">Explore Sirsa</h2>
          <p className="section-subtitle">Discover the most beautiful places in Sirsa</p>
        </div>

        <div className="tourism-grid">
          {tourismPlaces.map((place, index) => (
            <div 
              key={index} 
              className="tourism-card"
              onClick={() => router.push("/tourism")}
            >
              <Image
                src={place.image}
                alt={place.name}
                fill
                className="tourism-image"
              />
              <div className="tourism-overlay">
                <h3 className="tourism-name">{place.name}</h3>
                <p className="tourism-location">📍 {place.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="explore-card">
          <h2>Top Places to Visit in Sirsa</h2>
          <button
            onClick={() => router.push("/tourism")}
            className="explore-button"
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* RESTAURANT SECTION */}
      <section className="section-wrapper" style={{ background: "linear-gradient(135deg, #e9ecef 0%, #f5f7fa 100%)" }}>
        <div className="section-header">
          <h2 className="section-title">Food Paradise</h2>
          <p className="section-subtitle">Best restaurants & food spots in Sirsa</p>
        </div>

        <div className="restaurant-grid">
          {restaurants.map((restaurant, index) => (
            <div 
              key={index} 
              className="restaurant-card"
              onClick={() => router.push("/restaurants")}
            >
              <div className="restaurant-rating">
                ⭐ {restaurant.rating}
              </div>
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-cuisine">🍽️ {restaurant.cuisine}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="restaurant-explore-card">
          <h2>Best Restaurants & Food Spots in Sirsa</h2>
          <button
            onClick={() => router.push("/restaurants")}
            className="restaurant-button"
          >
            Discover Places to Eat
          </button>
        </div>
      </section>
    </>
  );
}