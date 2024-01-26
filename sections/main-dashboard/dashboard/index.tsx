"use client";
import { Box, Grid, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { LineChart } from "./line-chart";
import { DonutChart } from "./donut-chart";
import { useLazyDashboardListQuery } from "@/services/dashboard/dashboard-api";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

export function Dashboard(): JSX.Element {
  const [revenueChartTrigger, { data, isLoading }] =
    useLazyDashboardListQuery();
  console.log(data);
  // useEffect to trigger the API call on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Trigger the API call when the component is mounted
      await revenueChartTrigger({ type: "month" });
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  return (
    <Box>
      <Typography variant="h5">KPI</Typography>
      <Grid
        container
        gap={2}
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
        gap={2}
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
              <LoadingButton
                loading={isLoading}
                variant={data?.type === "month" ? "contained" : "outlined"}
                onClick={async () => {
                  await revenueChartTrigger({ type: "month" });
                }}
              >
                Month
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                variant={data?.type === "week" ? "contained" : "outlined"}
                sx={{ ml: 1 }}
                onClick={async () =>
                  await revenueChartTrigger({ type: "week" })
                }
              >
                Week
              </LoadingButton>
            </Grid>
          </Grid>
          <LineChart data={data?.data} type={data?.type} />
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
          </Grid>
          <DonutChart />
        </Grid>
      </Grid>
    </Box>
  );
}
