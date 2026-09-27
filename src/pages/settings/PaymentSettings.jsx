import React from "react";

import SettingsForm from "./_Form";

export default function PaymentSettings(props) {
  return (
    <SettingsForm
      section="payments"
      {...props}
    />
  );
}