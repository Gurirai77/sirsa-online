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
    <div className="school-page-container">
      <h1 className="school-page-title">
        Schools in Sirsa
      </h1>

      <div className="school-page-grid">
        {schools.map((school) => (
          <div key={school.id} className="school-page-card">
            <Image
              src={school.image}
              alt={school.name}
              width={600}
              height={400}
              quality={100}
              className="school-page-image"
            />

            <div className="school-page-content">
              <h2 className="school-page-name">
                {school.name}
              </h2>

              <p className="school-page-board">
                {school.board}
              </p>

              <p className="school-page-desc">
                {school.description.substring(0, 120)}...
              </p>

              <div className="school-page-buttons">
                <a
                  href={`tel:${school.phone}`}
                  className="school-page-call-btn"
                >
                  📞 Call
                </a>

                <Link
                  href={`/schools/${school.slug}`}
                  className="school-page-details-btn"
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