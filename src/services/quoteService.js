import api from "../api";


// List Quotes
export const listQuotes = (params) =>
  api.get("/quotes/", {
    params,
  });


// Get Single Quote
export const getQuote = (id) =>
  api.get(`/quotes/${id}/`);


// Create Quote
export const createQuote = (data) =>
  api.post("/quotes/", data);


// Update Quote
export const updateQuote = (id, data) =>
  api.put(`/quotes/${id}/`, data);


// Delete Quote
export const deleteQuote = (id) =>
  api.delete(`/quotes/${id}/`);


// Accept Quote
export const acceptQuote = (id) =>
  api.post(`/quotes/${id}/accept/`);


// Decline Quote
export const declineQuote = (id, reason) =>
  api.post(
    `/quotes/${id}/decline/`,
    { reason }
  );


// Convert Quote to Invoice
export const convertQuote = (id) =>
  api.post(
    `/quotes/${id}/convert_to_invoice/`
  );


// Send Quote Email
export const emailQuote = (id, email) =>
  api.post(
    `/quotes/${id}/send_email/`,
    { email }
  );


// Download Quote PDF
export const downloadQuotePdf = async (id) => {
  const response = await api.get(
    `/quotes/${id}/pdf/`,
    {
      responseType: "blob",
    }
  );

  const blob = new Blob(
    [response.data],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = `quote-${id}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};


// Export Quotes CSV
export const exportQuotes = () =>
  api.get(
    "/quotes/export_csv/",
    {
      responseType: "blob",
    }
  );