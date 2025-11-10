# Church Building Support - React + Vite

This is a React application for church building support with Flutterwave payment integration.

## Features

- 💝 Donation form with Flutterwave payment integration
- 📧 Enquiry form with EmailJS integration
- 📱 Responsive design
- 🎨 Modern UI with smooth animations

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Flutterwave Configuration
REACT_APP_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key_here

# EmailJS Configuration (for enquiry form and donation confirmations)
REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_EMAILJS_USER_ID=your_emailjs_user_id
REACT_APP_EMAILJS_DONATION_TEMPLATE_ID=your_donation_template_id (optional)
```

### 3. Get Flutterwave Public Key

1. Sign up for a Flutterwave account at [https://flutterwave.com](https://flutterwave.com)
2. Go to your dashboard and navigate to Settings > API Keys
3. Copy your **Public Key** (starts with `FLWPUBK-`)
4. For testing, use the test public key from the Flutterwave dashboard
5. For production, use your live public key

### 4. Run the Development Server

```bash
npm run dev
```

## Payment Integration

The donation form uses Flutterwave React v3 for payment processing. When a user submits the donation form:

1. Form validation is performed
2. Flutterwave payment modal opens
3. User completes payment
4. On successful payment:
   - Success message is displayed
   - Confirmation email is sent (optional, via EmailJS)
   - Form is reset

## Payment Methods Supported

- 💳 Card payments
- 📱 Mobile money
- 🏦 Bank transfer
- 📞 USSD

## Project Structure

```
church-building-support/
├── src/
│   ├── components/
│   │   └── Support.jsx      # Main support/donation component with Flutterwave integration
│   ├── App.jsx
│   └── main.jsx
├── .env                      # Environment variables (create this file)
└── package.json
```

## Technologies Used

- React 19
- Vite
- Flutterwave React v3
- EmailJS
- CSS3

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- Make sure to use test keys during development
- Switch to live keys only in production
- The Flutterwave public key is safe to expose in client-side code
- Never expose your Flutterwave secret key in client-side code
