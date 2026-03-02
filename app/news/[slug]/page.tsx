export const dynamic = "force-dynamic";

import Image from "next/image";

export default async function NewsDetail({
  params,
}: {
  params: { slug: string };
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/news/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return <h1>News Not Found</h1>;

  const article = await res.json();

  return (
    <div className="detail-container">
      <h1>{article.title}</h1>

      <div className="detail-image-wrapper">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="detail-image"
        />
      </div>

      <p>{new Date(article.date).toDateString()}</p>

      <p>{article.description}</p>

      <a href={article.link} target="_blank" className="source-btn">
        Read Real Source →
      </a>
    </div>
  );
}