import React from "react";

import {
  Stack,
  Pagination as MuiPagination,
  Typography,
} from "@mui/material";

export default function Pagination({
  page = 1,
  count = 1,
  onChange,
}) {
  const totalPages = Math.max(count, 1);

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      mt={2}
    >
      {/* Page Information */}
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Page {page} of {totalPages}
      </Typography>

      {/* Pagination */}
      <MuiPagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange?.(value)}
        color="primary"
      />
    </Stack>
  );
}