import React from "react";

import SettingsForm from "./_Form";

export default function PDFSettings(props) {
  return (
    <SettingsForm
      section="pdf"
      {...props}
    />
  );
}