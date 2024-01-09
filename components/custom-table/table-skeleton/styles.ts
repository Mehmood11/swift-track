import type { Theme } from "@mui/material";

//style
export const style = {
  root: (theme: Theme) => ({
    bgColor: theme.palette.mode === "light" ? theme.palette.grey[300] : "",
    borderRadius: "6px",
  }),
};
