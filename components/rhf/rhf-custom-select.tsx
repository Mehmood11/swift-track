import {
  Select,
  FormLabel,
  FormHelperText,
  FormControl,
  MenuItem,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export function RHFCustomSelect({
  name,
  options,
  outerLabel,
  styleMenu,
  placeholder,
  fullWidth = true,
  ...others
}: any): JSX.Element {
  const { control } = useFormContext();

  const menuProps: any = {
    PaperProps: {
      sx: {
        marginTop: "10px",
      },
    },
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={Boolean(error)} fullWidth={fullWidth}>
          {outerLabel && (
            <FormLabel sx={{ pb: "0.6rem" }}>{outerLabel}</FormLabel>
          )}
          <Select
            displayEmpty
            MenuProps={menuProps}
            inputRef={field.ref}
            {...field}
            {...others}
          >
            <MenuItem disabled value="" sx={{ display: "none" }}>
              <em style={{ fontStyle: "normal" }}>{placeholder ?? "Select"}</em>
            </MenuItem>
            {options?.map(({ id, label, value }: any) => (
              <MenuItem
                value={value}
                key={id}
                sx={{ fontSize: "1.5rem", ...styleMenu }}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
          {Boolean(error) && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
