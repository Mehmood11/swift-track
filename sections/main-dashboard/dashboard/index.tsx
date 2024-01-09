import { Box, Grid, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export function Dashboard(): JSX.Element {
  return (
    <Box>
      <Typography variant="h5">KPI</Typography>
      <Grid
        container
        gap={1}
        mt={2}
        sx={{ flexWrap: { lg: "nowrap", md: "inherit" } }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          p={3}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "" }}>
              Avg Delivery
            </Typography>
            <ArrowCircleUpIcon sx={{ ml: 1 }} />
          </Box>
          <Typography variant="h4" mt={2}>
            3243
          </Typography>
          <Typography variant="body1">Current Count</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          p={3}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "" }}>
              Avg Delivery
            </Typography>
            <ArrowCircleUpIcon sx={{ ml: 1 }} />
          </Box>
          <Typography variant="h4" mt={2}>
            3243
          </Typography>
          <Typography variant="body1">Current Count</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          p={3}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "" }}>
              Avg Delivery
            </Typography>
            <ArrowCircleUpIcon sx={{ ml: 1 }} />
          </Box>
          <Typography variant="h4" mt={2}>
            3243
          </Typography>
          <Typography variant="body1">Current Count</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          p={3}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Typography variant="h6" sx={{ color: "" }}>
              Avg Delivery
            </Typography>
            <ArrowCircleUpIcon sx={{ ml: 1 }} />
          </Box>
          <Typography variant="h4" mt={2}>
            3243
          </Typography>
          <Typography variant="body1">Current Count</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
