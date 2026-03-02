"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero-wrapper">

        <div className="hero-bg">
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
          <h1>सिरसा की हर जानकारी, अब एक ही जगह।</h1>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for Schools, Restaurants, News..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* TOURISM EXPLORE SECTION */}
      <section className="explore-section">

        <div className="explore-grid">

          <Image
            src="/tourism/tara-baba-kutiya.jpg"
            alt="Tara Baba"
            width={400}
            height={250}
            className="explore-img"
          />

          <Image
            src="/tourism/atlantic-water-park.jpg"
            alt="Park"
            width={400}
            height={250}
            className="explore-img"
          />

          <Image
            src="/tourism/ohm-cine-garden.jpg"
            alt="Sirsa Gate"
            width={400}
            height={250}
            className="explore-img"
          />

          <Image
            src="/tourism/surkhab-tourist-complex.jpg"
            alt="Sirsa Gate"
            width={400}
            height={250}
            className="explore-img"
          />

            <Image
            src="/tourism/gurudwara-chilla-sahib.jpg"
            alt="Sirsa Gate"
            width={400}
            height={250}
            className="explore-img"
          />


          <Image
            src="/tourism/dera-sacha-sauda-sirsa.jpg"
            alt="Dera"
            width={400}
            height={250}
            className="explore-img"
          />

        </div>

        <div className="home-explore-card">
          <h2>Top Places to Visit in Sirsa</h2>

          <button
            onClick={() => router.push("/tourism")}
            className="explore-btn"
          >
           Start Exploring
          </button>
        </div>

      </section>

      {/* RESTAURANT EXPLORE SECTION */}
<section className="restaurant-section">

  <div className="restaurant-grid">

    <Image
      src="/restaurants/amritsar-haveli-image.jpg"
      alt="Chopal Restaurant"
      width={400}
      height={250}
      className="restaurant-img"
    />

    <Image
      src="/restaurants/kashish-image.jpg"
      alt="Kathi Junction"
      width={400}
      height={250}
      className="restaurant-img"
    />

    <Image
      src="/restaurants/luxmi-sweets-sirsa.jpg"
      alt="Food Thali"
      width={400}
      height={250}
      className="restaurant-img"
    />

    <Image
      src="/restaurants/yellow-chilli-image.jpg"
      alt="Indian Cuisine"
      width={400}
      height={250}
      className="restaurant-img"
    />

    <Image
      src="/restaurants/dessert.jpg"
      alt="Dessert"
      width={400}
      height={250}
      className="restaurant-img"
    />

    <Image
      src="/restaurants/street-food.jpg"
      alt="Street Food"
      width={400}
      height={250}
      className="restaurant-img"
    />

  </div>

  <div className="restaurant-explore-card">
    <h2>Best Restaurants & Food Spots in Sirsa</h2>

    <button
      onClick={() => router.push("/restaurants")}
      className="restaurant-btn"
    >
      Discover Places to Eat
    </button>
  </div>

</section>
    </>
  );
}