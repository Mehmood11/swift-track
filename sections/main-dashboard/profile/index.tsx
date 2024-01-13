"use client";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

export function ProfileSection() {
  const methods = useForm({
    defaultValues: {
      userName: "",
      emailAddress: "",
    },
  });
  return (
    <FormProvider methods={methods}>
      <Grid container>
        <Grid item xs={12}>
          <RHFTextField
            name="userName"
            outerLabel="UserName"
            placeholder="User Name"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
