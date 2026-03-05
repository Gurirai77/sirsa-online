import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  // WhatsApp number (without +)
  const whatsappNumber = "917206881771";
  
  // Pre-filled message
  const defaultMessage = "Hi, I want to know more about Sirsa Online. Can you help me?";
  
  // WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <main className="so-about-wrapper">
      <section className="so-about-hero">
        <div className="so-about-container">
          <h1 className="so-about-title">About Sirsa Online</h1>
          <p className="so-about-subtitle">
            Empowering the local community through digital innovation and authentic information.
          </p>
        </div>
      </section>

      <section className="so-about-content-section">
        <div className="so-about-container">
          <div className="so-about-grid">
            <div className="so-about-text-block">
              <h2 className="so-about-heading">Our Mission</h2>
              <p className="so-about-description">
                <strong>Sirsa Online</strong> is a premier digital platform dedicated to bridging the gap between 
                local residents and the ever-evolving digital world. We strive to provide a comprehensive 
                hub for news, business listings, and essential services specifically tailored for the people of Sirsa.
              </p>
              <p className="so-about-description">
                Our goal is simple: to make information accessible, transparent, and useful. Whether you are 
                looking for the latest local updates, exploring business opportunities, or seeking reliable 
                community resources, we are here to serve as your trusted digital companion.
              </p>
              <p className="so-about-description">
                By leveraging modern technology, we aim to put Sirsa on the global digital map, 
                supporting local entrepreneurs and keeping citizens informed in real-time.
              </p>
            </div>

            <div className="so-about-contact-card">
              <h3 className="so-about-card-title">Contact Details</h3>
              <p style={{marginBottom: '20px', color: '#666', fontSize: '0.9rem'}}>
                Have questions or want to collaborate? Reach out to us directly.
              </p>
              <div className="so-about-contact-item">
                <span className="so-about-icon">📧</span>
                <a href="mailto:mrgurirai77@gmail.com">mrgurirai77@gmail.com</a>
              </div>
              <div className="so-about-contact-item">
                <span className="so-about-icon">📞</span>
                <a href="tel:+917206881771">+91 7206881771</a>
              </div>
              <div className="so-about-contact-item">
                <span className="so-about-icon">🌐</span>
                <span>www.sirsa.online</span>
              </div>
              
              {/* WhatsApp Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="so-about-btn so-whatsapp-btn"
              >
                <span className="btn-icon">📱</span>
                Chat on WhatsApp
              </a>
              
              <p className="so-whatsapp-note">
               <p className="so-whatsapp-note">
  👋 हमसे सीधे WhatsApp पर बात करें — बस एक क्लिक!
</p>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;