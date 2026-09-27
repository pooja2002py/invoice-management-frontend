import React from "react";

import SettingsForm from "./_Form";

export default function TaxSettings(props) {
  return (
    <SettingsForm
      section="tax"
      {...props}
    />
  );
}