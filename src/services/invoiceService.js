import api from "../api";


// List Invoices
export const listInvoices = (params) =>
  api.get("/invoices/", {
    params,
  });


// Get Single Invoice
export const getInvoice = (id) =>
  api.get(`/invoices/${id}/`);


// Create Invoice
export const createInvoice = (data) =>
  api.post("/invoices/", data);


// Update Invoice
export const updateInvoice = (id, data) =>
  api.put(`/invoices/${id}/`, data);


// Delete Invoice
export const deleteInvoice = (id) =>
  api.delete(`/invoices/${id}/`);


// Mark Invoice as Paid
export const markPaid = (id) =>
  api.post(`/invoices/${id}/mark_paid/`);


// Send Invoice Email
export const emailInvoice = (id, email) =>
  api.post(
    `/invoices/${id}/send_email/`,
    { email }
  );


// Download Invoice PDF
export const downloadInvoicePdf = async (id) => {
  const response = await api.get(
    `/invoices/${id}/pdf/`,
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

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `invoice-${id}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};


// Export Invoices CSV
export const exportInvoices = () =>
  api.get(
    "/invoices/export_csv/",
    {
      responseType: "blob",
    }
  );