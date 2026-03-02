"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/news" className={pathname === "/news" ? "active" : ""}>
        News
      </Link>

      <Link href="/tourism" className={pathname === "/tourism" ? "active" : ""}>
        Tourism
      </Link>

      <Link
        href="/restaurants"
        className={pathname === "/restaurants" ? "active" : ""}
      >
        Restaurants
      </Link>

      <Link
        href="/schools"
        className={pathname === "/schools" ? "active" : ""}
      >
        Schools
      </Link>
    </nav>
  );
}