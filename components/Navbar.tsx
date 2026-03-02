"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Newspaper,
  Map,
  Utensils,
  GraduationCap,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "News", href: "/news", icon: Newspaper },
    { name: "Tourism", href: "/tourism", icon: Map },
    { name: "Restaurant", href: "/restaurants", icon: Utensils },
    { name: "Schools", href: "/schools", icon: GraduationCap },
  ];

  return (
    <nav className="main-navbar">
      <div className="nav-logo">SIRSA.ONLINE</div>

      <div className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}