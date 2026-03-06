import { tourismPlaces } from "@/data/tourism";
import { restaurants } from "@/data/restaurants";
import { schools } from "@/data/schools";

export default function sitemap() {

  const baseUrl = "https://sirsa.online";

  const tourismUrls = tourismPlaces.map((place) => ({
    url: `${baseUrl}/tourism/${place.slug}`,
    lastModified: new Date(),
  }));

  const restaurantUrls = restaurants.map((r) => ({
    url: `${baseUrl}/restaurants/${r.slug}`,
    lastModified: new Date(),
  }));

  const schoolUrls = schools.map((s) => ({
    url: `${baseUrl}/schools/${s.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tourism`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/restaurants`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
    },

    ...tourismUrls,
    ...restaurantUrls,
    ...schoolUrls,
  ];
}