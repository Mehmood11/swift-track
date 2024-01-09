"use client";

import { Box, CircularProgress, alpha, useTheme } from "@mui/material";

interface IIsFetchingProps {
  isFetching: boolean;
}

export function IsFetching({ isFetching }: IIsFetchingProps): JSX.Element {
  const theme = useTheme();

  if (!isFetching) return <></>;

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.775),
        zIndex: 999,
      }}
    >
      <CircularProgress
        sx={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </Box>
  );
}
