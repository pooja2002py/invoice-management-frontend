import React from "react";

import SettingsForm from "./_Form";

export default function InvoiceSettings(props) {
  return (
    <SettingsForm
      section="invoices"
      {...props}
    />
  );
}