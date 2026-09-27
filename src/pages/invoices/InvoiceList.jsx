import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";

import {
  listInvoices,
  deleteInvoice,
  markPaid,
  downloadInvoicePdf,
} from "../../services/invoiceService";

import { money } from "../../utils/currency";


export default function InvoiceList() {
  const [rows, setRows] = useState([]);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();


  // Load Invoices
  const loadInvoices = () => {
    listInvoices()
      .then((response) => {
        setRows(
          response.data.results || response.data
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load invoices:",
          error
        );
      });
  };


  useEffect(() => {
    loadInvoices();
  }, []);


  // Search Invoices
  const filteredRows = rows.filter((invoice) => {
    const searchableText = `
      ${invoice.number || ""}
      ${invoice.client_name || ""}
      ${invoice.status || ""}
    `.toLowerCase();

    return searchableText.includes(
      query.toLowerCase()
    );
  });


  // Status Color
  const statusColor = (status) => {
    if (status === "PAID") {
      return "success";
    }

    if (status === "OVERDUE") {
      return "error";
    }

    if (status === "PUBLISHED") {
      return "info";
    }

    return "warning";
  };


  // Export CSV
  const handleExport = async () => {
    try {
      const invoiceService =
        await import(
          "../../services/invoiceService"
        );

      const response =
        await invoiceService.exportInvoices();

      const url = URL.createObjectURL(
        response.data
      );

      const link =
        document.createElement("a");

      link.href = url;

      link.download = "invoices.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to export invoices:",
        error
      );
    }
  };


  // Download PDF
  const handleDownloadPdf = async (id) => {
    try {
      await downloadInvoicePdf(id);
    } catch (error) {
      console.error(
        "Failed to download invoice PDF:",
        error.response?.data || error
      );
    }
  };


  // Delete Invoice
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteInvoice(id);

      loadInvoices();
    } catch (error) {
      console.error(
        "Failed to delete invoice:",
        error
      );
    }
  };


  // Mark Invoice as Paid
  const handleMarkPaid = async (id) => {
    try {
      await markPaid(id);

      loadInvoices();
    } catch (error) {
      console.error(
        "Failed to mark invoice as paid:",
        error
      );
    }
  };


  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Invoices"
        subtitle="Create, manage and track invoices"
        action={
          <Stack
            direction="row"
            spacing={1}
          >
            <Button
              variant="outlined"
              onClick={handleExport}
            >
              Export CSV
            </Button>

            <Button
              component={Link}
              to="/invoices/new"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add New Invoice
            </Button>
          </Stack>
        }
      />


      {/* Invoice Table */}
      <Card>
        <CardContent>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search invoices..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              width: {
                xs: "100%",
                sm: 340,
              },
            }}
          />


          <DataTable
            columns={[
              {
                key: "number",
                label: "Number",
              },

              {
                key: "client_name",
                label: "Client",
              },

              {
                key: "status",
                label: "Status",
                render: (row) => (
                  <Chip
                    size="small"
                    label={row.status}
                    color={statusColor(
                      row.status
                    )}
                  />
                ),
              },

              {
                key: "created_date",
                label: "Created",
              },

              {
                key: "total",
                label: "Total",
                render: (row) =>
                  money(row.total),
              },

              {
                key: "due",
                label: "Due",
                render: (row) =>
                  money(row.due),
              },

              {
                key: "id",
                label: "Actions",
                render: (row) => (
                  <>
                    {/* View */}
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/invoices/${row.id}`
                        )
                      }
                      title="View Invoice"
                    >
                      <VisibilityIcon />
                    </IconButton>


                    {/* Edit */}
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/invoices/${row.id}/edit`
                        )
                      }
                      title="Edit Invoice"
                    >
                      <EditIcon />
                    </IconButton>


                    {/* Download PDF */}
                    <IconButton
                      onClick={() =>
                        handleDownloadPdf(
                          row.id
                        )
                      }
                      title="Download PDF"
                    >
                      <PictureAsPdfIcon />
                    </IconButton>


                    {/* Delete */}
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(row.id)
                      }
                      title="Delete Invoice"
                    >
                      <DeleteIcon />
                    </IconButton>


                    {/* Mark as Paid */}
                    {row.due > 0 && (
                      <Button
                        size="small"
                        onClick={() =>
                          handleMarkPaid(
                            row.id
                          )
                        }
                      >
                        Paid
                      </Button>
                    )}
                  </>
                ),
              },
            ]}
            rows={filteredRows}
          />

        </CardContent>
      </Card>
    </>
  );
}