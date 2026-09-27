import React from "react";

import SettingsForm from "./_Form";

export default function GeneralSettings(props) {
  return (
    <SettingsForm
      section="general"
      {...props}
    />
  );
}