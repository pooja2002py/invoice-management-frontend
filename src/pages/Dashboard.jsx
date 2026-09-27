import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";

import { money } from "../utils/currency";
import api from "../api";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    api
      .get("/dashboard/")
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error("Dashboard API Error:", error);
      });
  }, []);

  const stats = [
    ["Clients", dashboardData.clients || 0],
    ["Invoices", dashboardData.invoices || 0],
    ["Quotes", dashboardData.quotes || 0],
    ["Paid", money(dashboardData.paid)],
    ["Outstanding", money(dashboardData.due)],
    ["Overdue", dashboardData.overdue || 0],
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        subtitle="Overview of invoices, quotations and payments"
        action={
          <Button
            component={Link}
            to="/invoices/new"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Create Invoice
          </Button>
        }
      />

      {/* Statistics Cards */}
      <Grid container spacing={2}>
        {stats.map(([label, value]) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            key={label}
          >
            <Card
              sx={{
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography color="text.secondary">
                  {label}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={900}
                  mt={1}
                >
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Invoices */}
      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h6"
              fontWeight={800}
            >
              Recent Invoices
            </Typography>

            <Button
              component={Link}
              to="/invoices"
            >
              View All
            </Button>
          </Stack>

          <DataTable
            columns={[
              {
                key: "number",
                label: "Invoice Number",
              },
              {
                key: "client_name",
                label: "Client",
              },
              {
                key: "status",
                label: "Status",
              },
              {
                key: "total",
                label: "Total",
                render: (row) => money(row.total),
              },
            ]}
            rows={dashboardData.recent_invoices || []}
          />
        </CardContent>
      </Card>
    </>
  );
}