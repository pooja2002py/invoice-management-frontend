import React from "react";

import SettingsForm from "./_Form";

export default function LicenseSettings(props) {
  return (
    <SettingsForm
      section="licenses"
      {...props}
    />
  );
}