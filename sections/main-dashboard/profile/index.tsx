import { FormProvider } from "@/components/rhf/form-provider";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { useUpdateProfileMutation } from "@/services/profile/profile-api";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ProfileSection({ data }: any) {
  const [updateProfile] = useUpdateProfileMutation();

  const methods = useForm({
    defaultValues: {
      username: data?.username ?? "",
      email: data?.email ?? "",
      password: data?.password ?? "",
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
    },
  });

  const { handleSubmit } = methods;

  const submitHandler = async (data: any) => {
    try {
      const res: any = await updateProfile({ body: { data } });
      // dispatch(authActions.logout());
      // router.push("/login");
      toast.success(res?.message ?? "Profile Updated Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "error occured");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: { xs: "start", sm: "flex-end" },
            alignItems: "center",
          }}
        >
          <LoadingButton variant="contained">Update</LoadingButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="username"
            outerLabel="UserName"
            placeholder="User Name"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="email"
            outerLabel="Email Address"
            placeholder="Email Address"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="password"
            outerLabel="Password"
            placeholder="Password"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="first_name"
            outerLabel="FirstName"
            placeholder="FirstName"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField
            name="last_name"
            outerLabel="LastName"
            placeholder="LastName"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}
