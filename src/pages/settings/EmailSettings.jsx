import React from "react";

import SettingsForm from "./_Form";

export default function EmailSettings(props) {
  return (
    <SettingsForm
      section="emails"
      {...props}
    />
  );
}