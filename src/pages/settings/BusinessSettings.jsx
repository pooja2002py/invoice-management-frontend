import React from "react";

import SettingsForm from "./_Form";

export default function BusinessSettings(props) {
  return (
    <SettingsForm
      section="business"
      {...props}
    />
  );
}