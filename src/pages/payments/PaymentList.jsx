import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";

import {
  listPayments,
  deletePayment,
} from "../../services/paymentService";

import { money } from "../../utils/currency";

export default function PaymentList() {
  const [rows, setRows] = useState([]);

  // Load Payments
  const loadPayments = () => {
    listPayments()
      .then((response) => {
        setRows(response.data.results || response.data);
      })
      .catch((error) => {
        console.error("Failed to load payments:", error);
      });
  };

  useEffect(() => {
    loadPayments();
  }, []);

  // Delete Payment
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePayment(id);
      loadPayments();
    } catch (error) {
      console.error(
        "Failed to delete payment:",
        error
      );
    }
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Payments"
        subtitle="Track invoice payments and transactions"
      />

      {/* Payments Table */}
      <Card>
        <CardContent>
          <DataTable
            columns={[
              {
                key: "date",
                label: "Date",
              },

              {
                key: "invoice",
                label: "Invoice ID",
              },

              {
                key: "amount",
                label: "Amount",
                render: (row) => money(row.amount),
              },

              {
                key: "method",
                label: "Method",
                render: (row) => (
                  <Chip
                    label={row.method}
                    size="small"
                  />
                ),
              },

              {
                key: "payment_id",
                label: "Payment ID",
              },

              {
                key: "status",
                label: "Status",
              },

              {
                key: "id",
                label: "Actions",
                render: (row) => (
                  <IconButton
                    color="error"
                    onClick={() =>
                      handleDelete(row.id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                ),
              },
            ]}
            rows={rows}
          />
        </CardContent>
      </Card>
    </>
  );
}