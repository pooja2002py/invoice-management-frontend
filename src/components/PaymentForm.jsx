import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

import { createPayment } from "../services/paymentService";

export default function PaymentForm({
  open,
  onClose,
  invoiceId,
  onSaved,
}) {
  const [form, setForm] = useState({
    invoice: invoiceId,
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    method: "GENERIC",
    payment_id: "",
    memo: "",
    status: "Completed",
  });

  // Save Payment
  const handleSave = async () => {
    try {
      await createPayment({
        ...form,
        invoice: invoiceId,
      });

      onSaved?.();
      onClose();
    } catch (error) {
      console.error(
        "Failed to create payment:",
        error
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Record Payment
      </DialogTitle>

      <DialogContent>
        <Grid
          container
          spacing={2}
          sx={{ mt: 0.5 }}
        >
          {/* Amount */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={form.amount}
              onChange={(event) =>
                setForm({
                  ...form,
                  amount: event.target.value,
                })
              }
            />
          </Grid>

          {/* Date */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={form.date}
              onChange={(event) =>
                setForm({
                  ...form,
                  date: event.target.value,
                })
              }
            />
          </Grid>

          {/* Payment Method */}
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Method"
              value={form.method}
              onChange={(event) =>
                setForm({
                  ...form,
                  method: event.target.value,
                })
              }
            >
              {[
                "BANK",
                "CASH",
                "UPI",
                "CARD",
                "GENERIC",
              ].map((method) => (
                <MenuItem
                  key={method}
                  value={method}
                >
                  {method}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Payment ID */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Payment ID"
              value={form.payment_id}
              onChange={(event) =>
                setForm({
                  ...form,
                  payment_id: event.target.value,
                })
              }
            />
          </Grid>

          {/* Memo */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Memo"
              value={form.memo}
              onChange={(event) =>
                setForm({
                  ...form,
                  memo: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
}