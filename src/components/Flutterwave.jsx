import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function PayButton() {
  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}`,     // unique reference
    amount: 5000,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: "customer@example.com",
      phonenumber: "08012345678",
      name: "John Doe",
    },
    customizations: {
      title: "My Store",
      description: "Payment for item(s)",
      logo: "https://example.com/logo.png",
    },
  };

  const fwCallback = (response) => {
    // Called on success or cancel. Do NOT trust this alone — verify on server.
    console.log("flutterwave response:", response);
    // closePaymentModal(); // close if needed
  };

  return (
    <FlutterWaveButton
      className="pay-button"
      callback={fwCallback}
      onClose={() => console.log("modal closed")}
      flutterWaveConfig={config}
    />
  );
}
