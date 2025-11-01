import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Flutterwave from './Flutterwave';
import './Support.css';

const Support = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission here
    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID || ''
      );

      if (result.text === 'OK') {
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success',
        });
        setFormData({ name: '', email: '', phone: '', amount: '', message: '', anonymous: false });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
    
  };

  const supportAmounts = [5000, 10000, 50000, 100000, 200000, 250000];

  return (
    <section id="support" className="support">
      <div className="container">
        <div className="section-header">
          <h2>Support God's Work</h2>
          <p className="section-subtitle">
            "Remember this: Whoever sows sparingly will also reap sparingly, 
            and whoever sows generously will also reap generously."
            <span className="scripture-ref">- 2 Corinthians 9:6</span>
          </p>
        </div>

        <div className="support-content">
          <div className="support-info">
            <div className="support-card">
              <h3>💝 Ways to Give</h3>
              <div className="giving-options">
                <div className="option">
                  <h4>One-Time Donation</h4>
                  <p>Make a single contribution to support our building project</p>
                </div>
                <div className="option">
                  <h4>Monthly Pledge</h4>
                  <p>Commit to regular monthly support throughout the project</p>
                </div>
                <div className="option">
                  <h4>Special Offerings</h4>
                  <p>Designate funds for specific areas of the building</p>
                </div>
              </div>
            </div>

            <div className="amount-selection">
              <h3>Quick Donation Amounts</h3>
              <div className="amount-grid">
                {supportAmounts.map(amount => (
                  <button 
                    key={amount}
                    className={`amount-btn ${formData.amount === amount.toString() ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                  >
                    ₦{amount}
                  </button>
                ))}
                <button 
                  className={`amount-btn custom ${formData.amount && !supportAmounts.includes(parseInt(formData.amount)) ? 'selected' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, amount: '' }))}
                >
                  Custom
                </button>
              </div>
            </div>
          </div>

          <div className="support-form-section">
            <div className="form-tabs">
              <button 
                className={`tab-btn ${!showEnquiryForm ? 'active' : ''}`}
                onClick={() => setShowEnquiryForm(false)}
              >
                Make Donation
              </button>
              <button 
                className={`tab-btn ${showEnquiryForm ? 'active' : ''}`}
                onClick={() => setShowEnquiryForm(true)}
              >
                Send Enquiry
              </button>
            </div>

            {!showEnquiryForm ? (
              <form className="donation-form" onSubmit={() => <Flutterwave />} ref={form}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="amount">Donation Amount *</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter amount"
                    min="1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share your prayer or message"
                    rows="4"
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Make this donation anonymous
                  </label>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Proceed to Payment'}
                </button>
              </form>
            ) : (
              <form className="enquiry-form" onSubmit={handleSubmit} ref={form}>
                <div className="form-group">
                  <label htmlFor="enquiry-name">Full Name *</label>
                  <input
                    type="text"
                    id="enquiry-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-email">Email Address *</label>
                  <input
                    type="email"
                    id="enquiry-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="enquiry-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="enquiry-message">Your Enquiry *</label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Please describe your enquiry or how you'd like to help..."
                    rows="6"
                  />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  { loading ? 'Sending...' : 'Send Enquiry' }
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="contact-info">
          <h3>📞 Project Committee Contact</h3>
          <div className="contact-grid">
            <div className="contact-item">
              <p style={{fontWeight: 'bold'}}>Project Chairman:</p>
              <p>Pastor Akinbo Samuel</p>
              <p>📞 +234 803 439-0941</p>
            </div>
            <div className="contact-item">
              <p style={{fontWeight: 'bold'}}>Finance Secretary:</p>
              <p>Sister Omolara</p>
              <p>📞 +234 806 937-9048</p>
            </div>
            <div className="contact-item">
              <p style={{fontWeight: 'bold'}}>Building Committee:</p>
              <p>Elder Awodi</p>
              <p>📞 +234 803 708-1762</p>
            </div>
          </div>
        </div>

        <div className="scripture-highlight">
          <blockquote>
            "Give, and it will be given to you. A good measure, pressed down, 
            shaken together and running over, will be poured into your lap."
            <cite>- Luke 6:38</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Support;
