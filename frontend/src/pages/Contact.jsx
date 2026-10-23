import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the customisation and approval process work?',
      a: 'After you submit your order or request on the website, our artisan team prepares a digital preview or arrangement draft. We share this with you on WhatsApp within 24 hours to confirm spellings, photo crops, and color tones before pouring resin or inking your letter.',
    },
    {
      q: 'How long does it take to handcraft and deliver my gift?',
      a: 'Because our botanicals, wax seals, and resin art are hand-poured in micro-layers, crafting takes 3 to 5 business days. Once dispatched, standard express courier takes 2 to 4 days across India.',
    },
    {
      q: 'Can I send a surprise gift directly to someone else?',
      a: 'Yes, absolutely! During checkout, simply provide the recipient’s address. All our packages include complimentary vintage gift-wrapping, ribbon, and a wax-sealed card without any price invoice inside the box.',
    },
    {
      q: 'Can I request a custom bulk order for weddings or corporate events?',
      a: 'Yes! We specialize in handcrafted bridesmaid boxes, wedding favors with custom monogram wax seals, and bespoke corporate keepsakes. Reach out to us via the contact form or WhatsApp for bulk custom orders.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your inquiry has been sent to our studio team. We will get back to you shortly.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <div className="contact-page page-wrapper">
      <header className="page-header">
        <div className="container">
          <span className="page-tag">Get in Touch</span>
          <h1>We’d Love to Hear From You</h1>
          <p>
            Have a question about a bespoke piece, need an urgent custom anniversary gift, or want to say hello? Reach out to our artisan studio.
          </p>
        </div>
      </header>

      <main className="container contact-container">
        <div className="contact-layout">
          {/* Left Column: Direct Info & Socials */}
          <div className="contact-info-col">
            <div className="info-card">
              <h3>Connect with Our Studio</h3>
              <p className="info-sub">
                We are always happy to discuss custom ideas and help you pick the perfect keepsake.
              </p>

              <div className="contact-methods">
                <a
                  href="https://wa.me/919156435456"
                  target="_blank"
                  rel="noreferrer"
                  className="method-item wa-method"
                >
                  <span className="method-icon">💬</span>
                  <div>
                    <strong>WhatsApp Direct Chat</strong>
                    <p>+91 91564 35456 (Quickest Response: 9am - 8pm IST)</p>
                  </div>
                </a>

                <div className="method-item">
                  <span className="method-icon">✉️</span>
                  <div>
                    <strong>Email Support</strong>
                    <p>care@craftedglasses.com</p>
                  </div>
                </div>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="method-item"
                >
                  <span className="method-icon">📷</span>
                  <div>
                    <strong>Instagram DM</strong>
                    <p>@craftedglasses</p>
                  </div>
                </a>

                <div className="method-item">
                  <span className="method-icon">📍</span>
                  <div>
                    <strong>Artisan Studio</strong>
                    <p>Craftedglasses Workshop, New Delhi & Mumbai, India</p>
                  </div>
                </div>
              </div>

              <div className="studio-timings-box">
                <h4>Studio Hours</h4>
                <p>Monday – Saturday: 9:30 AM – 7:30 PM IST</p>
                <p>Sunday: Studio Closed (Botanical foraging day 🌸)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="contact-form-col">
            <div className="form-card">
              <h3>Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="name"
                      className="form-input"
                      required
                      placeholder="e.g., Priya"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactPhone">
                      WhatsApp / Mobile <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="phone"
                      className="form-input"
                      required
                      placeholder="+91 91564 35456"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      className="form-input"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactSubject">
                      Inquiry Subject
                    </label>
                    <select
                      id="contactSubject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status / Customisation">Order Status / Customisation</option>
                      <option value="Urgent Gift Timeline">Urgent Gift Timeline</option>
                      <option value="Bulk Wedding / Corporate Favors">Bulk Wedding / Corporate Favors</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    className="form-textarea"
                    required
                    rows={5}
                    placeholder="How can our artisans assist you today?"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary btn-block">
                  Send Message to Studio <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <section className="faqs-section">
          <div className="section-header text-center">
            <span className="section-tag">Frequently Asked Questions</span>
            <h2>Common Questions & Answers</h2>
            <p>Everything you need to know about our handmade ordering and personalization.</p>
          </div>

          <div className="faqs-accordion">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
