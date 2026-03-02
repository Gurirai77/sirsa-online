import Parser from "rss-parser";


function getImageByTitle(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("school") || lower.includes("education"))
    return "/news/education.png";

  if (lower.includes("road") || lower.includes("flyover"))
    return "/news/infrastructure.png";

  if (lower.includes("crime") || lower.includes("police"))
    return "/news/police.png";

  if (lower.includes("match") || lower.includes("tournament"))
    return "/news/sports.png";

  if (lower.includes("rain") || lower.includes("weather"))
    return "/news/weather.png";

  return "/news/default-news.png";
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

function extractImageFromDescription(description: string | undefined) {
  if (!description) return null;
  const match = description.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

export async function GET() {
  const parser = new Parser();
  const feed = await parser.parseURL(
    "https://news.google.com/rss/search?q=Sirsa"
  );

 const news = feed.items.slice(0, 6).map((item, index) => {
  const extractedImage = extractImageFromDescription(item.content);

  return {
    id: index,
    title: item.title,
    slug: generateSlug(item.title || ""),
    link: item.link,
    description: item.contentSnippet,
    date: item.pubDate,
    image: extractedImage || getImageByTitle(item.title || ""),
  };
});

  return Response.json(news);
}