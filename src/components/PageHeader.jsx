import React from "react";

import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      justifyContent="space-between"
      alignItems={{
        sm: "center",
      }}
      spacing={2}
      mb={3}
    >
      {/* Title & Subtitle */}
      <Box>
        <Typography
          variant="h4"
          fontWeight={800}
          color="#123f60"
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            color="text.secondary"
            mt={0.5}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Action Button / Actions */}
      {action}
    </Stack>
  );
}