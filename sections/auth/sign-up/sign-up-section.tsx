import { Box, Button, Typography, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useLoginMutation } from "@/services/auth/auth-api";
import toast from "react-hot-toast";

export function SignUpSection(): JSX.Element {
  const [loginMutation] = useLoginMutation();
  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;

  const loginHandler = async (data: any) => {
    try {
      const res: any = await loginMutation(data);
      toast.success(res?.data?.message ?? `Update Successfully!`);
      console.log(res);
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        background: (theme) =>
          `linear-gradient(to top, white 0%, white  50%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.main} 100%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "400px",
          background: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          <PersonIcon sx={{ fontSize: "3.5rem" }} />
          <Typography variant="h5">Register</Typography>
        </Box>
        <Divider component="li" light />

        <FormProvider methods={methods} onSubmit={handleSubmit(loginHandler)}>
          <Grid container>
            <Grid item xs={12} mt={2}>
              <RHFTextField
                name="username"
                placeholder="User Name"
                outerLabel="User Name"
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <RHFTextField
                name="password"
                placeholder="Password"
                outerLabel="Password"
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <RHFTextField
                name="email"
                placeholder="Email"
                outerLabel="Email"
              />
            </Grid>
            <Grid item xs={12} mt={2} sx={{ color: "black" }}>
              <Typography variant="body1">
                Already have an account ? <Link href={"/login"}>Login</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
              >
                {" "}
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
}
