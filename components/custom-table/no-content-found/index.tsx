"use client";

import { NoContent } from "@/assets/no-content";
import { Box } from "@mui/material";

export function NoContentFound(): JSX.Element {
  return (
    <Box display="flex">
      <NoContent />
    </Box>
  );
}
