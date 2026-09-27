import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import { Link, useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";

import {
  listQuotes,
  deleteQuote,
  acceptQuote,
  declineQuote,
  convertQuote,
  downloadQuotePdf,
} from "../../services/quoteService";

import { money } from "../../utils/currency";


export default function QuoteList() {
  const [rows, setRows] = useState([]);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();


  // Load Quotes
  const loadQuotes = () => {
    listQuotes()
      .then((response) => {
        setRows(
          response.data.results || response.data
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load quotes:",
          error
        );
      });
  };


  useEffect(() => {
    loadQuotes();
  }, []);


  // Search Quotes
  const filteredRows = rows.filter((quote) => {
    const searchableText = `
      ${quote.number || ""}
      ${quote.client_name || ""}
      ${quote.status || ""}
    `.toLowerCase();

    return searchableText.includes(
      query.toLowerCase()
    );
  });


  // Download Quote PDF
  const handleDownloadPdf = async (id) => {
    try {
      await downloadQuotePdf(id);
    } catch (error) {
      console.error(
        "Failed to download quote PDF:",
        error.response?.data || error
      );
    }
  };


  // Accept Quote
  const handleAccept = async (id) => {
    try {
      await acceptQuote(id);

      loadQuotes();
    } catch (error) {
      console.error(
        "Failed to accept quote:",
        error
      );
    }
  };


  // Decline Quote
  const handleDecline = async (id) => {
    const reason = window.prompt(
      "Decline reason"
    );

    if (reason === null) {
      return;
    }

    try {
      await declineQuote(
        id,
        reason
      );

      loadQuotes();
    } catch (error) {
      console.error(
        "Failed to decline quote:",
        error
      );
    }
  };


  // Convert Quote to Invoice
  const handleConvert = async (id) => {
    try {
      await convertQuote(id);

      navigate("/invoices");
    } catch (error) {
      console.error(
        "Failed to convert quote to invoice:",
        error
      );
    }
  };


  // Delete Quote
  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this quote?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteQuote(id);

      loadQuotes();
    } catch (error) {
      console.error(
        "Failed to delete quote:",
        error
      );
    }
  };


  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Quotes"
        subtitle="Create and manage quotations"
        action={
          <Button
            component={Link}
            to="/quotes/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add New Quote
          </Button>
        }
      />


      {/* Quotes Table */}
      <Card>
        <CardContent>

          {/* Search */}
          <TextField
            size="small"
            placeholder="Search quotes..."
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
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
                  />
                ),
              },

              {
                key: "valid_until",
                label: "Valid Until",
              },

              {
                key: "total",
                label: "Total",
                render: (row) =>
                  money(row.total),
              },

              {
                key: "id",
                label: "Actions",
                render: (row) => (
                  <>
                    {/* Edit */}
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/quotes/${row.id}/edit`
                        )
                      }
                      title="Edit Quote"
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


                    {/* Accept */}
                    <Button
                      size="small"
                      onClick={() =>
                        handleAccept(
                          row.id
                        )
                      }
                    >
                      Accept
                    </Button>


                    {/* Decline */}
                    <Button
                      size="small"
                      onClick={() =>
                        handleDecline(
                          row.id
                        )
                      }
                    >
                      Decline
                    </Button>


                    {/* Convert to Invoice */}
                    <Button
                      size="small"
                      onClick={() =>
                        handleConvert(
                          row.id
                        )
                      }
                    >
                      Invoice
                    </Button>


                    {/* Delete */}
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDelete(
                          row.id
                        )
                      }
                      title="Delete Quote"
                    >
                      <DeleteIcon />
                    </IconButton>
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