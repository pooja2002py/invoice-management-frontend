import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import InvoiceItems from "../../components/InvoiceItems";
import InvoiceTotals from "../../components/InvoiceTotals";

import { listClients } from "../../services/clientService";

import {
  createInvoice,
  getInvoice,
  updateInvoice,
} from "../../services/invoiceService";

import {
  listPresets,
  getSettings,
} from "../../services/settingsService";


// Get default due date = 7 days from today
const getDefaultDueDate = () => {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  return date.toISOString().slice(0, 10);
};


export default function InvoiceForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  const [presets, setPresets] = useState([]);

  const [taxPct, setTaxPct] = useState(18);


  const [form, setForm] = useState({
    title: "",
    description: "",
    client: "",
    order_number: "",
    status: "DRAFT",

    created_date: new Date()
      .toISOString()
      .slice(0, 10),

    due_date: getDefaultDueDate(),

    discount: 0,

    paid_amount: 0,

    terms_conditions: "",

    payment_methods: "",

    footer: "",

    items: [
      {
        title: "",
        description: "",
        qty: 1,
        rate: 0,
        adjust: 0,
        taxable: true,
      },
    ],
  });


  // Load clients, presets, settings and invoice data
  useEffect(() => {
    // Load Clients
    listClients()
      .then((response) => {
        setClients(
          response.data.results || response.data
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load clients:",
          error
        );
      });


    // Load Presets
    listPresets()
      .then((response) => {
        setPresets(
          response.data.results || response.data
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load presets:",
          error
        );
      });


    // Load Settings
    getSettings()
      .then((response) => {
        setTaxPct(
          Number(
            response.data.tax?.percentage || 18
          )
        );
      })
      .catch((error) => {
        console.error(
          "Failed to load settings:",
          error
        );
      });


    // Load Invoice when editing
    if (id) {
      getInvoice(id)
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          console.error(
            "Failed to load invoice:",
            error
          );
        });
    }
  }, [id]);


  // Save Invoice
  const handleSave = async () => {
    try {
      const data = {
        ...form,

        client: Number(form.client),

        discount: Number(
          form.discount || 0
        ),

        paid_amount: Number(
          form.paid_amount || 0
        ),

        items: form.items.map(
          ({
            title,
            description,
            qty,
            rate,
            adjust,
            taxable,
          }) => ({
            title,
            description,
            qty: Number(qty),
            rate: Number(rate),
            adjust: Number(adjust),
            taxable,
          })
        ),
      };

      if (id) {
        await updateInvoice(id, data);
      } else {
        await createInvoice(data);
      }


      navigate("/invoices");
    } catch (error) {
      console.error(
        "Invoice Save Error:",
        error.response?.data || error
      );
    }
  };


  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={
          id
            ? "Edit Invoice"
            : "Add New Invoice"
        }
        subtitle="Build a professional invoice"
      />


      <Card>
        <CardContent>
          <Grid
            container
            spacing={2.5}
          >

            {/* Invoice Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Invoice Title"
                value={form.title || ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value,
                  })
                }
              />
            </Grid>


            {/* Client */}
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Client"
                value={form.client || ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    client: event.target.value,
                  })
                }
              >
                {clients.map((client) => (
                  <MenuItem
                    key={client.id}
                    value={client.id}
                  >
                    {client.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            {/* Order Number */}
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Order Number"
                value={
                  form.order_number || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    order_number:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Status */}
            <Grid item xs={12} md={3}>
              <TextField
                select
                fullWidth
                label="Status"
                value={
                  form.status || "DRAFT"
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    status:
                      event.target.value,
                  })
                }
              >
                {[
                  "DRAFT",
                  "PUBLISHED",
                  "PAID",
                  "CANCELLED",
                ].map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            {/* Created Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Created Date"
                value={
                  form.created_date || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    created_date:
                      event.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>


            {/* Due Date */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={
                  form.due_date || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    due_date:
                      event.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>


            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Description"
                value={
                  form.description || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    description:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Line Items */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight={800}
                mb={1}
              >
                Line Items
              </Typography>

              <InvoiceItems
                items={form.items || []}
                setItems={(items) =>
                  setForm({
                    ...form,
                    items,
                  })
                }
                presets={presets}
              />
            </Grid>


            {/* Discount */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Discount"
                value={
                  form.discount || 0
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    discount:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Paid Amount */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Paid Amount"
                value={
                  form.paid_amount || 0
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    paid_amount:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Terms & Conditions */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Terms & Conditions"
                value={
                  form.terms_conditions ||
                  ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    terms_conditions:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Payment Methods */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Payment Methods"
                value={
                  form.payment_methods ||
                  ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    payment_methods:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Footer */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Footer"
                value={
                  form.footer || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    footer:
                      event.target.value,
                  })
                }
              />
            </Grid>


            {/* Invoice Totals */}
            <Grid item xs={12}>
              <InvoiceTotals
                items={form.items || []}
                discount={form.discount}
                taxPercent={taxPct}
                paid={form.paid_amount}
              />
            </Grid>


            {/* Buttons */}
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={1}
              >
                <Button
                  onClick={() =>
                    navigate("/invoices")
                  }
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSave}
                >
                  {id
                    ? "Update Invoice"
                    : "Save Invoice"}
                </Button>
              </Stack>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </>
  );
}