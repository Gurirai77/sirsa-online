export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";

export default async function NewsPage() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/news`, {
    cache: "no-store",
  });

  const news = await res.json();

  return (
    <div className="news-container">
      <h1 className="news-title">Latest Sirsa News</h1>

      <div className="news-grid">
        {news.map((item: any) => (
          <div key={item.id} className="news-card">
            
            <div className="news-image-wrapper">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="news-image"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            <div className="news-content">
              <h2 className="news-heading">{item.title}</h2>

              <p className="news-date">
                {new Date(item.date).toDateString()}
              </p>

              <p className="news-description">
                {item.description}
              </p>

              <Link
                href={`/news/${item.slug}`}
                className="news-link"
              >
                Read More →
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}