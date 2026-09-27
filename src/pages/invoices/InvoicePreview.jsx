import React from "react";
import { useParams } from "react-router-dom";

import InvoiceView from "./InvoiceView";

export default function InvoicePreview() {
  const { id } = useParams();

  return <InvoiceView key={id} />;
}