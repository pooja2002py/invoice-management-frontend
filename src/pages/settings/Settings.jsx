import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import PageHeader from "../../components/PageHeader";

import { getSettings } from "../../services/settingsService";

import GeneralSettings from "./GeneralSettings";
import BusinessSettings from "./BusinessSettings";
import QuoteSettings from "./QuoteSettings";
import InvoiceSettings from "./InvoiceSettings";
import PaymentSettings from "./PaymentSettings";
import TaxSettings from "./TaxSettings";
import EmailSettings from "./EmailSettings";
import PDFSettings from "./PDFSettings";
import TranslateSettings from "./TranslateSettings";
import ExtrasSettings from "./ExtrasSettings";
import LicenseSettings from "./LicenseSettings";

const tabs = [
  ["general", "General", GeneralSettings],
  ["business", "Business", BusinessSettings],
  ["quotes", "Quotes", QuoteSettings],
  ["invoices", "Invoices", InvoiceSettings],
  ["payments", "Payments", PaymentSettings],
  ["tax", "Tax", TaxSettings],
  ["emails", "Emails", EmailSettings],
  ["pdf", "PDF", PDFSettings],
  ["translate", "Translate", TranslateSettings],
  ["extras", "Extras", ExtrasSettings],
  ["licenses", "Licenses", LicenseSettings],
];

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  // Load Settings
  useEffect(() => {
    getSettings()
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error("Failed to load settings:", error);
      });
  }, []);

  const CurrentSettingsComponent =
    tabs[selectedTab][2];

  const currentSettingsKey = tabs[selectedTab][0];

  // Update saved settings
  const handleSaved = (value) => {
    setSettings({
      ...settings,
      [currentSettingsKey]: value,
    });
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        subtitle="Configure your invoice and quotation system"
      />

      <Card>
        <CardContent>
          {/* Settings Tabs */}
          <Tabs
            value={selectedTab}
            onChange={(_, value) =>
              setSelectedTab(value)
            }
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab[0]}
                label={tab[1]}
              />
            ))}
          </Tabs>

          {/* Selected Settings */}
          <Box sx={{ pt: 3 }}>
            {settings[currentSettingsKey] ? (
              <CurrentSettingsComponent
                data={settings[currentSettingsKey]}
                onSaved={handleSaved}
              />
            ) : (
              <Typography color="text.secondary">
                Loading settings...
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}