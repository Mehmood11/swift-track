import React from "react";
import { Box, Typography } from "@mui/material";
import { ReportsSection } from "@/sections/main-dashboard/reports";

const page = () => {
  return (
    <Box>
      <Typography variant="h2" color={"primary.main"}>
        Reports
      </Typography>
      <ReportsSection />
    </Box>
  );
};

export default page;
