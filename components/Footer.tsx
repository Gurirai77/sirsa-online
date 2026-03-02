"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">

        {/* Logo & About */}
        <div className="footer-col">
          <h2 className="footer-logo">SIRSA.ONLINE</h2>
          <p>
            Your complete digital guide to Sirsa.  
            Explore Schools, Restaurants, Tourism places and Latest News.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link href="/news">News</Link>
          <Link href="/tourism">Tourism</Link>
          <Link href="/restaurants">Restaurants</Link>
          <Link href="/schools">Schools</Link>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p>Sirsa, Haryana, India</p>
          <p>Email: info@sirsaonline.in</p>
          <p>Phone: +91 00000 00000</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sirsa Online. All Rights Reserved.
      </div>
    </footer>
  );
}