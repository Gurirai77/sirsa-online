"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Footer() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const quickLinks = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "News", href: "/news", icon: "📰" },
    { name: "Tourism", href: "/tourism", icon: "🗺️" },
    { name: "Restaurants", href: "/restaurants", icon: "🍽️" },
    { name: "Schools", href: "/schools", icon: "📚" },
    { name: "About", href: "/about", icon: "ℹ️" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // EmailJS send karo
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.text === 'OK') {
        setSuccess(true);
        setFormData({ name: "", phone: "", message: "" });
        
        // 5 seconds baad success message hide karo
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err: any) {
      setError(err.text || 'Kuch error aa gaya. Fer try karo.');
      console.error('EmailJS Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="modern-footer">
      <div className="footer-main">
        {/* Left Section - Brand */}
        <div className="footer-brand">
          <div className="brand-logo">
            SIRSA<span>.ONLINE</span>
          </div>
          <div className="brand-tagline">Discover Sirsa - The City of Saints</div>
          <p className="brand-description">
            Your complete digital guide to Sirsa. Explore schools, restaurants, 
            tourist places and latest news. Everything you need, all in one place.
          </p>

          {/* Stats */}
          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Listings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Visitors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Reviews</span>
            </div>
          </div>
        </div>

        {/* Right Section - Contact & Links */}
        <div className="footer-contact">
          {/* List Your Business Card */}
          <div className="contact-card">
            <h3 className="card-title">
              <span>📢</span> List Your Business
            </h3>
            
            <div className="offer-badge">
              🎉 First 10 Listings FREE! (₹49 only after that)
            </div>

            <div className="listing-items">
              <div className="listing-item">
                <div className="listing-icon">🏪</div>
                <div className="listing-text">
                  <div className="listing-title">Restaurants & Food</div>
                  <div className="listing-price"><span>₹49</span> one-time</div>
                </div>
              </div>

              <div className="listing-item">
                <div className="listing-icon">🏫</div>
                <div className="listing-text">
                  <div className="listing-title">Schools & Education</div>
                  <div className="listing-price"><span>₹49</span> one-time</div>
                </div>
              </div>

              <div className="listing-item">
                <div className="listing-icon">🗺️</div>
                <div className="listing-text">
                  <div className="listing-title">Tourist Places</div>
                  <div className="listing-price"><span>₹49</span> one-time</div>
                </div>
              </div>
            </div>

            {/* Contact Form - EmailJS */}
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <input type="hidden" name="to_email" value="thegurirai77@gmail.com" />
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your business/place... *"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows={3}
                />
              </div>

              {error && (
                <div className="error-message">
                  ⚠️ {error}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span>📨 Sending...</span>
                ) : (
                  <>
                    <span>📨</span> Send Message
                  </>
                )}
              </button>

              {success && (
                <div className="success-message">
                  ✅ Thanks! We'll contact you soon.
                </div>
              )}
            </form>
          </div>

          {/* Quick Links Card */}
          <div className="contact-card">
            <h3 className="card-title">
              <span>🔗</span> Quick Links
            </h3>
            <div className="quick-links">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="quick-link">
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} <span>Sirsa Online</span>. All rights reserved.
          </p>
          <p className="copyright">
            Made with <span className="heart">❤️</span> in Sirsa
          </p>
        </div>
      </div>

      <style jsx>{`
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          border-radius: 12px;
          padding: 0.8rem;
          margin-bottom: 1rem;
          color: #ef4444;
          text-align: center;
          font-size: 0.9rem;
          animation: fadeIn 0.3s ease;
        }
        
        .success-message {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid #10b981;
          border-radius: 12px;
          padding: 1rem;
          margin-top: 1rem;
          color: #10b981;
          text-align: center;
          font-weight: 500;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </footer>
  );
}