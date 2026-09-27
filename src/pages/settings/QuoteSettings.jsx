import React from "react";

import SettingsForm from "./_Form";

export default function QuoteSettings(props) {
  return (
    <SettingsForm
      section="quotes"
      {...props}
    />
  );
}