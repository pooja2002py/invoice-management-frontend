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
  createQuote,
  getQuote,
  updateQuote,
} from "../../services/quoteService";

import {
  listPresets,
  getSettings,
} from "../../services/settingsService";


// Get default valid-until date = 7 days from today
const getDefaultValidUntil = () => {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  return date.toISOString().slice(0, 10);
};


export default function QuoteForm() {
  const { id } = useParams();

  const navigate = useNavigate();


  const [clients, setClients] = useState([]);

  const [presets, setPresets] = useState([]);

  const [taxPct, setTaxPct] = useState(18);


  const [form, setForm] = useState({
    title: "",
    description: "",
    client: "",
    status: "DRAFT",

    created_date: new Date()
      .toISOString()
      .slice(0, 10),

    valid_until: getDefaultValidUntil(),

    discount: 0,

    terms_conditions: "",

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


  // Load clients, presets, settings and quote
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


    // Load Quote when editing
    if (id) {
      getQuote(id)
        .then((response) => {
          setForm(response.data);
        })
        .catch((error) => {
          console.error(
            "Failed to load quote:",
            error
          );
        });
    }

  }, [id]);


  // Save Quote
  const handleSave = async () => {
    try {
      const data = {
        ...form,

        client: Number(form.client),

        discount: Number(
          form.discount || 0
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
        await updateQuote(id, data);
      } else {
        await createQuote(data);
      }


      navigate("/quotes");

    } catch (error) {
      console.error(
        "Failed to save quote:",
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
            ? "Edit Quote"
            : "Add New Quote"
        }
        subtitle="Create a professional quotation"
      />


      <Card>
        <CardContent>

          <Grid
            container
            spacing={2.5}
          >

            {/* Quote Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quote Title"
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
                    status: event.target.value,
                  })
                }
              >
                {[
                  "DRAFT",
                  "PUBLISHED",
                  "ACCEPTED",
                  "DECLINED",
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
            <Grid item xs={12} md={3}>
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


            {/* Valid Until */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Valid Until"
                value={
                  form.valid_until || ""
                }
                onChange={(event) =>
                  setForm({
                    ...form,
                    valid_until:
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


            {/* Quote Totals */}
            <Grid item xs={12}>
              <InvoiceTotals
                items={form.items || []}
                discount={form.discount}
                taxPercent={taxPct}
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
                    navigate("/quotes")
                  }
                >
                  Cancel
                </Button>


                <Button
                  variant="contained"
                  onClick={handleSave}
                >
                  {id
                    ? "Update Quote"
                    : "Save Quote"}
                </Button>

              </Stack>

            </Grid>

          </Grid>

        </CardContent>
      </Card>
    </>
  );
}