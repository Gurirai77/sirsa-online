import { schools } from "@/data/schools";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Best Schools in Sirsa | Sirsa Portal",
  description:
    "Explore the list of best CBSE schools in Sirsa with contact details, features, facilities and directions.",
};

export default function SchoolsPage() {
  return (
    <div className="schools-container">
      <h1 className="page-title">Schools in Sirsa</h1>

      <div className="schools-grid">
        {schools.map((school) => (
          <div key={school.id} className="school-card">
            <Image
              src={school.image}
              alt={school.name}
        width={600}
        height={400}
        quality={100}
              className="card-image"
            />

            <div className="card-content">
              <h2>{school.name}</h2>

              <p className="board">{school.board}</p>

              <p className="card-desc">
                {school.description.substring(0, 120)}...
              </p>

              <div className="card-buttons">
                <a href={`tel:${school.phone}`} className="call-btn">
                  📞 Call
                </a>

                <Link
                  href={`/schools/${school.slug}`}
                  className="details-btn"
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