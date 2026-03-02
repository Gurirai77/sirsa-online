"use client";

import { useSearchParams } from "next/navigation";
import { schools } from "@/data/schools";
import { restaurants } from "@/data/restaurants";
import { tourismPlaces } from "@/data/tourism";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filterData = (data: any[]) =>
    data.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

  const schoolResults = filterData(schools);
  const restaurantResults = filterData(restaurants);
  const tourismResults = filterData(tourismPlaces);

  return (
    <div className="search-page">
      <h1>Search Results for "{query}"</h1>

     {schoolResults.length > 0 && (
  <div className="search-section">
    <h2>Schools</h2>
    {schoolResults.map((item) => (
      <Link
        key={item.slug}
        href={`/schools/${item.slug}`}
        className="search-card"
      >
        <p>{item.name}</p>
      </Link>
    ))}
  </div>
)}

    {restaurantResults.length > 0 && (
  <div className="search-section">
    <h2>Restaurants</h2>
    {restaurantResults.map((item) => (
      <Link
        key={item.slug}
        href={`/restaurants/${item.slug}`}
        className="search-card"
      >
        <p>{item.name}</p>
      </Link>
    ))}
  </div>
)}

    {tourismResults.length > 0 && (
  <div className="search-section">
    <h2>Tourism</h2>
    {tourismResults.map((item) => (
      <Link
        key={item.slug}
        href={`/tourism/${item.slug}`}
        className="search-card"
      >
        <p>{item.name}</p>
      </Link>
    ))}
  </div>
)}

    {schoolResults.length === 0 &&
 restaurantResults.length === 0 &&
 tourismResults.length === 0 && (
   <div className="no-results">
     No results found.
   </div>
)}
    </div>
  );
}