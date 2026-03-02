export const dynamic = "force-dynamic";

import Image from "next/image";

export default function NewsDetail({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    title?: string;
    date?: string;
    description?: string;
    image?: string;
    link?: string;
  };
}) {

  // Safety check
  if (!searchParams?.title) {
    return <h1>News Not Found</h1>;
  }

  return (
    <div className="detail-container">
      <h1>{searchParams.title}</h1>

      <div className="detail-image-wrapper">
        <Image
          src={searchParams.image || "/news/default-news.jpg"}
          alt={searchParams.title}
          fill
          className="detail-image"
        />
      </div>

      <p>
        {searchParams.date
          ? new Date(searchParams.date).toDateString()
          : ""}
      </p>

      <p>{searchParams.description}</p>

      <a
        href={searchParams.link}
        target="_blank"
        className="source-btn"
      >
        Read Real Source →
      </a>
    </div>
  );
}