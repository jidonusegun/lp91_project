import React, { useState, useRef, useMemo, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import './Support.css';

const Support = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    title: '',
    anonymous: false,
    prayerRequest: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [paymentConfig, setPaymentConfig] = useState(null);

  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showPrayerRequest, setShowPrayerRequest] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  // Flutterwave config - create fresh config when payment is initiated
  const getFlutterwaveConfig = () => {
    // Generate fresh tx_ref for each payment
    const txRef = `donation-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    return {
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || '',
      tx_ref: txRef,
      amount: parseFloat(formData.amount) || 0,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd,banktransfer',
      customer: {
        email: formData.email || '',
        phone_number: formData.phone || '08000000000',
        name: formData.anonymous ? 'Anonymous Donor' : (formData.name || ''),
      },
      customizations: {
        title: 'Church Building Support - Donation',
        description: formData.message || 'Donation for church building project',
        logo: '../assets/logo.png',
      },
      meta: {
        donor_name: formData.anonymous ? 'Anonymous' : formData.name,
        anonymous: formData.anonymous.toString(),
        message: formData.message || '',
      },
    };
  };

  // Flutterwave config for hook - updates when paymentConfig state changes
  const flutterwaveConfig = useMemo(() => {
    if (paymentConfig) {
      return paymentConfig;
    }
    // Return a default config when no payment is initiated
    return {
      public_key: '',
      tx_ref: '',
      amount: 0,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd,banktransfer',
      customer: {
        email: '',
        phone_number: '',
        name: '',
      },
      customizations: {
        title: 'Church Building Support - Donation',
        description: 'Donation for church building project',
        logo: window.location.origin + '/logo.png',
      },
    };
  }, [paymentConfig]);

  // Initialize Flutterwave payment handler
  const handleFlutterPayment = useFlutterwave(flutterwaveConfig);

  // Effect to trigger payment when paymentConfig is set
  useEffect(() => {
    if (paymentConfig && paymentConfig.amount > 0 && paymentConfig.tx_ref) {
      // Small delay to ensure the hook has the updated config
      const timer = setTimeout(() => {
        handleFlutterPayment({
          callback: (response) => {
            setLoading(false);
            setPaymentConfig(null); // Reset config
            if (response.status === 'successful') {
              setSnackbar({
                open: true,
                message: 'Payment successful! Thank you for your donation.',
                severity: 'success',
              });
              setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
              
              // Send confirmation email via EmailJS (optional)
              sendDonationConfirmationEmail(response);
              
              // Send prayer request email if prayer request exists
              if (formData.prayerRequest && formData.prayerRequest.trim() !== '') {
                sendPrayerRequestEmail();
              }
              
              // Reset form
              setFormData({ 
                name: '', 
                email: '', 
                phone: '', 
                amount: '', 
                message: '', 
                title: '',
                anonymous: false,
                prayerRequest: ''
              });
              setShowPrayerRequest(false);
              
              closePaymentModal();
            } else {
              setSnackbar({
                open: true,
                message: 'Payment was not completed. Please try again.',
                severity: 'error',
              });
              setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
            }
          },
          onClose: () => {
            setLoading(false);
            setPaymentConfig(null); // Reset config
          },
        });
      }, 150);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentConfig]);

  // Handle donation form submission (Flutterwave)
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.amount || parseFloat(formData.amount) <= 0) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields and enter a valid amount.',
        severity: 'error',
      });
      setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
      return;
    }

    setLoading(true);
    
    // Create and set payment config - this will trigger the useEffect
    const config = getFlutterwaveConfig();
    setPaymentConfig(config);
  };

  // Send donation confirmation email (optional)
  const sendDonationConfirmationEmail = async (paymentResponse) => {
    try {
      // Create a temporary form data for EmailJS
      const templateParams = {
        from_name: formData.anonymous ? 'Anonymous Donor' : formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        amount: formData.amount,
        message: formData.message || 'No message',
        transaction_ref: paymentResponse.tx_ref,
        payment_status: paymentResponse.status,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID || ''
      );
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't show error to user as payment was successful
    }
  };

  // Send prayer request email via EmailJS
  const sendPrayerRequestEmail = async () => {
    try {
      const templateParams = {
        name: formData.anonymous ? 'Anonymous Donor' : formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        title: formData.title || 'Prayer Request',
        message: formData.message || formData.prayerRequest,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID || ''
      );
    } catch (error) {
      console.error('Failed to send prayer request email:', error);
      // Don't show error to user as payment was successful
    }
  };

  // Handle enquiry form submission (EmailJS)
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        form.current,
        import.meta.env.VITE_EMAILJS_USER_ID || ''
      );

      if (result.text === 'OK') {
        setSnackbar({
          open: true,
          message: 'Enquiry sent successfully! We will get back to you soon.',
          severity: 'success',
        });
        setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
        setFormData({ name: '', email: '', phone: '', amount: '', message: '', title: '', anonymous: false, prayerRequest: '' });
        setShowPrayerRequest(false);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send enquiry. Please try again later.',
        severity: 'error',
      });
      setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 5000);
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
              <form className="donation-form" onSubmit={handleDonationSubmit} ref={form}>
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

                <div className="form-group">
                  <span 
                    onClick={() => setShowPrayerRequest(!showPrayerRequest)}
                    style={{
                      cursor: 'pointer',
                      color: '#007bff',
                      textDecoration: 'underline',
                      fontSize: '0.9rem',
                      display: 'block',
                      marginBottom: showPrayerRequest ? '0.5rem' : '0'
                    }}
                  >
                    {showPrayerRequest ? 'Hide prayer request' : '+ Add a prayer request (Optional)'}
                  </span>
                  {showPrayerRequest && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <label htmlFor="prayerRequest">Prayer Request</label>
                      <textarea
                        id="prayerRequest"
                        name="prayerRequest"
                        value={formData.prayerRequest}
                        onChange={handleInputChange}
                        placeholder="Share your prayer request..."
                        rows="4"
                      />
                    </div>
                  )}
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
              <form className="enquiry-form" onSubmit={handleEnquirySubmit} ref={form}>
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
                  <label htmlFor="enquiry-name">Title *</label>
                  <input
                    type="text"
                    id="enquiry-name"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your title"
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

      {/* Snackbar Notification */}
      {snackbar.open && (
        <div 
          className={`snackbar snackbar-${snackbar.severity}`}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10000,
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {snackbar.message}
          <button
            onClick={() => setSnackbar(prev => ({ ...prev, open: false }))}
            style={{
              marginLeft: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
              float: 'right',
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

export default Support;
