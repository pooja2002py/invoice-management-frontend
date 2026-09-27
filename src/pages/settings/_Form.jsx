import React, { useState } from "react";

import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";

import { updateSettings } from "../../services/settingsService";

const boolKeys = new Set([
    "hide_adjust",
    "accept_enabled",
    "decline_reason_required",
    "inclusive",
    "show_logo",
    "show_watermark",
    "enable_email_notifications",
    "enable_client_portal",
    "enable_public_links",
    "enable_payment_page",
    "bcc_client_emails",
]);

const numberKeys = new Set([
    "percentage",
    "rate",
    "tax_rate",
    "default_tax",
    "discount",
    "valid_days",
    "days",
    "amount",
]);

export default function SettingsForm({
    section,
    data,
    onSaved,
}) {
    const [form, setForm] = useState({
        ...data,
    });

    const handleChange = (key, value) => {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const payload = {
                ...form,
            };

            // Remove read-only fields
            Object.keys(payload).forEach((key) => {
                if (
                    key === "id" ||
                    key.endsWith("_url")
                ) {
                    delete payload[key];
                }
            });

            // Tax Settings
            if (section === "tax") {
                const percentage = Number(
                    payload.percentage
                );

                if (
                    Number.isNaN(percentage) ||
                    percentage < 0 ||
                    percentage > 100
                ) {
                    alert(
                        "GST percentage must be between 0 and 100."
                    );
                    return;
                }

                payload.percentage = percentage;

                payload.name = String(
                    payload.name ?? ""
                ).trim();

                if (!payload.name) {
                    alert("Please enter GST name.");
                    return;
                }
            }

            // Convert numeric fields
            Object.keys(payload).forEach((key) => {
                if (
                    numberKeys.has(key) &&
                    payload[key] !== "" &&
                    payload[key] !== null &&
                    payload[key] !== undefined
                ) {
                    payload[key] = Number(
                        payload[key]
                    );
                }
            });

            const response = await updateSettings(
                section,
                payload
            );

            onSaved?.(response.data);

            alert(
                `${section.charAt(0).toUpperCase() +
                section.slice(1)
                } settings updated successfully!`
            );
        } catch (error) {
            console.error(
                "Failed to update settings:",
                error.response?.data || error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            alert(
                "Failed to update settings. Please try again."
            );
        }
    };

    return (
        <Grid container spacing={2}>
            {Object.entries(form)
                .filter(
                    ([key]) =>
                        key !== "id" &&
                        !key.endsWith("_url")
                )
                .map(([key, value]) => {
                    const label = key
                        .replaceAll("_", " ")
                        .replace(
                            /\b\w/g,
                            (character) =>
                                character.toUpperCase()
                        );

                    // Boolean Fields
                    if (boolKeys.has(key)) {
                        return (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={key}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={Boolean(
                                                value
                                            )}
                                            onChange={(event) =>
                                                handleChange(
                                                    key,
                                                    event.target
                                                        .checked
                                                )
                                            }
                                        />
                                    }
                                    label={label}
                                />
                            </Grid>
                        );
                    }

                    // Number Fields
                    if (numberKeys.has(key)) {
                        return (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                key={key}
                            >
                                <TextField
                                    fullWidth
                                    type="number"
                                    label={label}
                                    value={value ?? ""}
                                    inputProps={
                                        key ===
                                            "percentage"
                                            ? {
                                                min: 0,
                                                max: 100,
                                                step: 0.01,
                                            }
                                            : undefined
                                    }
                                    onChange={(event) =>
                                        handleChange(
                                            key,
                                            event.target.value
                                        )
                                    }
                                />
                            </Grid>
                        );
                    }

                    // Long Text
                    const isLongText =
                        typeof value === "string" &&
                        value.length > 70;

                    // Full Width Fields
                    const isFullWidth =
                        key === "terms_conditions" ||
                        key === "footer" ||
                        key.includes("content") ||
                        key.includes("details") ||
                        key === "custom_css" ||
                        key === "payment_methods";

                    return (
                        <Grid
                            item
                            xs={12}
                            md={
                                isFullWidth
                                    ? 12
                                    : 6
                            }
                            key={key}
                        >
                            <TextField
                                fullWidth
                                label={label}
                                multiline={isLongText}
                                minRows={
                                    isLongText
                                        ? 4
                                        : 1
                                }
                                value={value ?? ""}
                                onChange={(event) =>
                                    handleChange(
                                        key,
                                        event.target
                                            .value
                                    )
                                }
                            />
                        </Grid>
                    );
                })}

            {/* Save Button */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    Save Settings
                </Button>
            </Grid>
        </Grid>
    );
}