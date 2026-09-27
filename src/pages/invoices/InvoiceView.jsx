import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import InvoiceTotals from "../../components/InvoiceTotals";
import PaymentForm from "../../components/PaymentForm";

import {
  getInvoice,
  markPaid,
  downloadInvoicePdf,
  emailInvoice,
} from "../../services/invoiceService";

import { money } from "../../utils/currency";


export default function InvoiceView() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  const [paymentOpen, setPaymentOpen] = useState(false);


  // Load Invoice
  const loadInvoice = () => {
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
  };


  useEffect(() => {
    loadInvoice();
  }, [id]);


  // Loading State
  if (!form) {
    return (
      <Typography>
        Loading...
      </Typography>
    );
  }


  // Mark Invoice Fully Paid
  const handleMarkPaid = () => {
    markPaid(id)
      .then(loadInvoice)
      .catch((error) => {
        console.error(
          "Failed to mark invoice as paid:",
          error
        );
      });
  };


  // Download PDF
  const handleDownloadPdf = async () => {
    try {
      await downloadInvoicePdf(id);
    } catch (error) {
      console.error(
        "Failed to download invoice PDF:",
        error.response?.data || error
      );
    }
  };


  // Send Invoice Email
  const handleEmailInvoice = async () => {
    try {
      await emailInvoice(
        id,
        form.client_email
      );
    } catch (error) {
      console.error(
        "Failed to send invoice email:",
        error.response?.data || error
      );
    }
  };


  return (
    <>
      {/* Page Header */}
      <PageHeader
        title={form.number}
        subtitle={form.client_name}
        action={
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >

            {/* Edit */}
            <Button
              onClick={() =>
                navigate(
                  `/invoices/${id}/edit`
                )
              }
            >
              Edit
            </Button>


            {/* Download PDF */}
            <Button
              variant="outlined"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </Button>


            {/* Email Invoice */}
            <Button
              onClick={handleEmailInvoice}
            >
              Email
            </Button>


            {/* Record Payment */}
            <Button
              variant="contained"
              onClick={() =>
                setPaymentOpen(true)
              }
            >
              Record Payment
            </Button>

          </Stack>
        }
      />


      {/* Invoice Details */}
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >

            {/* Invoice Information */}
            <Grid
              item
              xs={12}
              md={7}
            >
              <Typography
                variant="h5"
                fontWeight={900}
              >
                {form.title}
              </Typography>


              <Typography
                color="text.secondary"
                sx={{
                  whiteSpace: "pre-line",
                  mt: 1,
                }}
              >
                {form.description}
              </Typography>


              <Divider
                sx={{ my: 3 }}
              />


              {/* Invoice Items */}
              {form.items?.map(
                (item, index) => (
                  <Grid
                    container
                    key={index}
                    sx={{
                      py: 1,
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >

                    <Grid
                      item
                      xs={7}
                    >
                      <b>
                        {item.title}
                      </b>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.description}
                      </Typography>
                    </Grid>


                    <Grid
                      item
                      xs={2}
                    >
                      {item.qty}
                    </Grid>


                    <Grid
                      item
                      xs={3}
                      textAlign="right"
                    >
                      {money(item.amount)}
                    </Grid>

                  </Grid>
                )
              )}
            </Grid>


            {/* Invoice Summary */}
            <Grid
              item
              xs={12}
              md={5}
            >
              <InvoiceTotals
                items={form.items || []}
                discount={form.discount}
                taxPercent={18}
                paid={form.paid_amount}
              />


              <Stack
                spacing={1}
                mt={3}
              >

                <Typography>
                  Due Date:{" "}
                  {form.due_date}
                </Typography>


                <Typography>
                  Status:{" "}
                  {form.status}
                </Typography>


                {form.due > 0 && (
                  <Button
                    variant="outlined"
                    onClick={
                      handleMarkPaid
                    }
                  >
                    Mark Fully Paid
                  </Button>
                )}

              </Stack>
            </Grid>

          </Grid>
        </CardContent>
      </Card>


      {/* Payment Form */}
      <PaymentForm
        open={paymentOpen}
        onClose={() =>
          setPaymentOpen(false)
        }
        invoiceId={id}
        onSaved={loadInvoice}
      />
    </>
  );
}