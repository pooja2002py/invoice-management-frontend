import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import PageHeader from "../../components/PageHeader";
import DataTable from "../../components/DataTable";

import {
  listClients,
  createClient,
  updateClient,
  deleteClient,
} from "../../services/clientService";

export default function ClientList() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    address: "",
    extra_info: "",
    website: "",
    gst_number: "",
  };

  const [form, setForm] = useState(emptyForm);

  // Load Clients
  const loadClients = () => {
    listClients()
      .then((response) => {
        setRows(response.data.results || response.data);
      })
      .catch((error) => {
        console.error("Failed to load clients:", error);
      });
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Open Add Client Dialog
  const handleAdd = () => {
    setEdit(null);
    setForm(emptyForm);
    setOpen(true);
  };

  // Open Edit Client Dialog
  const handleEdit = (client) => {
    setEdit(client);
    setForm({
      ...emptyForm,
      ...client,
    });
    setOpen(true);
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
    setEdit(null);
    setForm(emptyForm);
  };

  
// Save Client
const handleSave = async () => {
  try {
    if (edit) {
      await updateClient(edit.id, form);
    } else {
      await createClient(form);
    }

    handleClose();
    loadClients();
  } catch (error) {
    console.error("Failed to save client:", error);
  }
};

  // Delete Client
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?"
    );

    if (!confirmed) return;

    try {
      await deleteClient(id);
      loadClients();
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  // Search
  const filteredRows = rows.filter((client) => {
    const searchableText = `
      ${client.name || ""}
      ${client.email || ""}
      ${client.gst_number || ""}
    `.toLowerCase();

    return searchableText.includes(query.toLowerCase());
  });

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Clients"
        subtitle="Manage customers and billing details"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add New Client
          </Button>
        }
      />

      {/* Client Table */}
      <Card>
        <CardContent>
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search clients..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
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
                key: "name",
                label: "Business / Client Name",
              },
              {
                key: "email",
                label: "Email",
              },
              {
                key: "phone",
                label: "Phone",
              },
              {
                key: "gst_number",
                label: "GST No.",
              },
              {
                key: "id",
                label: "Actions",
                render: (row) => (
                  <>
                    {/* Edit */}
                    <IconButton
                      onClick={() => handleEdit(row)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.id)}
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

      {/* Add / Edit Client Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {edit ? "Edit Client" : "Add New Client"}
        </DialogTitle>

        <DialogContent>
          <Grid
            container
            spacing={2}
            sx={{ mt: 0.2 }}
          >
            {/* Basic Fields */}
            {[
              ["name", "Business / Client Name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["gst_number", "GST Number"],
              ["website", "Website"],
            ].map(([key, label]) => (
              <Grid
                item
                xs={12}
                md={6}
                key={key}
              >
                <TextField
                  fullWidth
                  label={label}
                  value={form[key] || ""}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [key]: event.target.value,
                    })
                  }
                />
              </Grid>
            ))}

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Address"
                value={form.address || ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    address: event.target.value,
                  })
                }
              />
            </Grid>

            {/* Extra Information */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Extra Info"
                value={form.extra_info || ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    extra_info: event.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {edit ? "Update Client" : "Save Client"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}