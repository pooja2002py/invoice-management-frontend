import React from "react";

import SettingsForm from "./_Form";

export default function TranslateSettings(props) {
  return (
    <SettingsForm
      section="translate"
      {...props}
    />
  );
}