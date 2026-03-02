import Parser from "rss-parser";

function cleanTitle(title: string) {
  return title
    .split(" - ")[0]
    .split(" | ")[0]
    .trim();
}

function generateSlug(title: string) {
  const cleaned = cleanTitle(title);

  return cleaned
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

function getImageByTitle(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes("school") || lower.includes("education"))
    return "/news/education.jpg";

  if (lower.includes("road") || lower.includes("flyover"))
    return "/news/infrastructure.jpg";

  if (lower.includes("crime") || lower.includes("police"))
    return "/news/police.jpg";

  if (lower.includes("match") || lower.includes("tournament"))
    return "/news/sports.jpg";

  if (lower.includes("rain") || lower.includes("weather"))
    return "/news/weather.jpg";

  return "/news/default-news.jpg";
}

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const parser = new Parser();
  const feed = await parser.parseURL(
    "https://news.google.com/rss/search?q=Sirsa"
  );

  const items = feed.items;

  const article = items.find(item =>
    generateSlug(item.title || "").includes(slug)
  );

  if (!article) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({
    title: article.title,
    description: article.contentSnippet,
    date: article.pubDate,
    link: article.link,
    image: getImageByTitle(article.title || ""),
  });
}