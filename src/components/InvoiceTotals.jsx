import React from "react";

import {
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { money } from "../utils/currency";

import {
  subtotal,
  tax,
  total,
} from "../utils/calculations";

export default function InvoiceTotals({
  items,
  discount,
  taxPercent = 18,
  paid = 0,
}) {
  const sub = subtotal(items);
  const taxAmount = tax(
    items,
    discount,
    taxPercent
  );
  const grandTotal = total(
    items,
    discount,
    taxPercent
  );

  const totalDue = Math.max(
    grandTotal - paid,
    0
  );

  return (
    <Stack
      spacing={1.2}
      sx={{
        minWidth: 280,
        ml: "auto",
      }}
    >
      {/* Sub Total */}
      <Typography>
        Sub Total

        <b style={{ float: "right" }}>
          {money(sub)}
        </b>
      </Typography>

      {/* Discount */}
      <Typography>
        Discount

        <b style={{ float: "right" }}>
          - {money(discount)}
        </b>
      </Typography>

      {/* GST */}
      <Typography>
        {`GST (${taxPercent}%)`}

        <b style={{ float: "right" }}>
          {money(taxAmount)}
        </b>
      </Typography>

      <Divider />

      {/* Paid */}
      <Typography fontWeight={800}>
        Paid

        <b style={{ float: "right" }}>
          {money(paid)}
        </b>
      </Typography>

      {/* Total Due */}
      <Typography
        variant="h6"
        fontWeight={900}
        color="#16689b"
      >
        TOTAL DUE

        <b style={{ float: "right" }}>
          {money(totalDue)}
        </b>
      </Typography>
    </Stack>
  );
}