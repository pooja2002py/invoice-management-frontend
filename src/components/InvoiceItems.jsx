import React from "react";

import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

import { itemAmount } from "../utils/calculations";

export default function InvoiceItems({
  items,
  setItems,
  presets = [],
}) {
  // Add new item
  const addItem = () => {
    setItems([
      ...items,
      {
        title: "",
        description: "",
        qty: 1,
        rate: 0,
        adjust: 0,
        taxable: true,
      },
    ]);
  };

  // Update item field
  const updateItem = (index, key, value) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [key]: value,
    };

    setItems(updatedItems);
  };

  // Add pre-defined item
  const handlePresetChange = (event) => {
    const presetId = event.target.value;

    const preset = presets.find(
      (item) => String(item.id) === presetId
    );

    if (preset) {
      setItems([
        ...items,
        {
          title: preset.title,
          description: preset.description,
          qty: 1,
          rate: preset.rate,
          adjust: 0,
          taxable: true,
        },
      ]);
    }

    // Reset select
    event.target.value = "";
  };

  // Remove item
  const removeItem = (index) => {
    setItems(
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  return (
    <Stack spacing={1.5}>
      {/* Invoice Items */}
      {items.map((item, index) => (
        <Paper
          key={index}
          sx={{
            p: 2,
            border: "1px solid #e4eaee",
            boxShadow: "none",
          }}
        >
          <Grid
            container
            spacing={1.5}
            alignItems="center"
          >
            {/* Item Title */}
            <Grid item xs={12} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Item Title"
                value={item.title || ""}
                onChange={(event) =>
                  updateItem(
                    index,
                    "title",
                    event.target.value
                  )
                }
              />
            </Grid>

            {/* Quantity */}
            <Grid item xs={4} md={1.2}>
              <TextField
                size="small"
                fullWidth
                type="number"
                label="Qty"
                value={item.qty}
                onChange={(event) =>
                  updateItem(
                    index,
                    "qty",
                    event.target.value
                  )
                }
              />
            </Grid>

            {/* Rate */}
            <Grid item xs={4} md={1.8}>
              <TextField
                size="small"
                fullWidth
                type="number"
                label="Rate (₹)"
                value={item.rate}
                onChange={(event) =>
                  updateItem(
                    index,
                    "rate",
                    event.target.value
                  )
                }
              />
            </Grid>

            {/* Adjustment */}
            <Grid item xs={4} md={1.5}>
              <TextField
                size="small"
                fullWidth
                type="number"
                label="Adjust %"
                value={item.adjust}
                onChange={(event) =>
                  updateItem(
                    index,
                    "adjust",
                    event.target.value
                  )
                }
              />
            </Grid>

            {/* Description */}
            <Grid item xs={11} md={3}>
              <TextField
                size="small"
                fullWidth
                label="Description"
                value={item.description || ""}
                onChange={(event) =>
                  updateItem(
                    index,
                    "description",
                    event.target.value
                  )
                }
              />
            </Grid>

            {/* Delete */}
            <Grid item xs={1} md={0.5}>
              <IconButton
                color="error"
                onClick={() => removeItem(index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>

            {/* Taxable + Line Total */}
            <Grid item xs={12}>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Taxable

                <Checkbox
                  size="small"
                  checked={item.taxable !== false}
                  onChange={(event) =>
                    updateItem(
                      index,
                      "taxable",
                      event.target.checked
                    )
                  }
                />

                Line total: ₹
                {itemAmount(item).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {/* Item Actions */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        {/* Add Another Item */}
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={addItem}
        >
          Add Another Item
        </Button>

        {/* Pre-defined Line Item */}
        {presets.length > 0 && (
          <select
            onChange={handlePresetChange}
            defaultValue=""
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #c4cdd5",
              background: "#fff",
              minHeight: "40px",
            }}
          >
            <option value="">
              Add pre-defined line item
            </option>

            {presets.map((preset) => (
              <option
                key={preset.id}
                value={preset.id}
              >
                {preset.title}
              </option>
            ))}
          </select>
        )}
      </Stack>
    </Stack>
  );
}