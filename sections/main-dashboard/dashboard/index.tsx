"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { LineChart } from "./line-chart";
import { DonutChart } from "./donut-chart";
import { useLazyDashboardListQuery } from "@/services/dashboard/dashboard-api";

export function Dashboard(): JSX.Element {
  const [revenueChartTrigger, { data }] = useLazyDashboardListQuery();
  console.log(data);
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
      <Grid
        container
        mt={2}
        sx={{ flexWrap: { lg: "nowrap", md: "inherit" } }}
        gap={1}
      >
        <Grid
          item
          xs={12}
          lg={7}
          p={2}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Sales overview</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                variant="contained"
                onClick={async () =>
                  await revenueChartTrigger({ type: "month" })
                }
              >
                Monthly
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 1 }}
                onClick={async () =>
                  await revenueChartTrigger({ type: "week" })
                }
              >
                Weekly
              </Button>
            </Grid>
          </Grid>
          <LineChart data={data} />
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          p={2}
          sx={{
            boxShadow: "0px 0px 10px 6px rgba(112, 144, 176, 0.08)",
            borderRadius: "6px",
          }}
        >
          <Grid container item xs={12}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5">Total Orders</Typography>
            </Grid>
            {/* <Grid
              item
              xs={12}
              md={6}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button variant="contained">Monthly</Button>
              <Button variant="contained" sx={{ ml: 1 }}>
                Weekly
              </Button>
            </Grid> */}
          </Grid>
          <DonutChart />
        </Grid>
      </Grid>
    </Box>
  );
}
