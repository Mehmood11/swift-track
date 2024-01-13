// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { FormLabel, Stack, useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export function RHFDatePicker({
  name,
  label,
  outerLabel,
  ...other
}: any): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Stack gap="0.6rem" mt={1}>
            {outerLabel && <FormLabel>{outerLabel}</FormLabel>}

            <input
              {...field}
              type="date"
              style={{
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.grey[500],
                border: "1px solid #2D3748",
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
