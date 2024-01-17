import { Box, Button, Typography, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
// import Divider from "@mui/material/Divider";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useLoginMutation } from "@/services/auth/auth-api";
import toast from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export function LoginSection(): JSX.Element {
  const [loginMutation, { isLoading, isSuccess }] = useLoginMutation();
  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        username: Yup.string()
          .matches(
            /^[a-z0-9]{6,20}$/,
            "Username must be between 8 and 20 characters, and can only contain small alphabets and numbers."
          )
          .required("Username is required"),
        password: Yup.string()
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^&*?])[A-Za-z\d@$!%^&*?]{8,}$/,
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character."
          )
          .required("Password is required"),
      })
    ),
  });

  const { handleSubmit } = methods;

  const loginHandler = async (data: any) => {
    try {
      const res: any = await loginMutation(data).unwrap();
      toast.success(res?.message ?? `Update Successfully!`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong");
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
          <Typography variant="h5">Login</Typography>
        </Box>
        {/* <Divider component="li" light /> */}

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
                type="password"
                name="password"
                placeholder="Password"
                outerLabel="Password"
              />
            </Grid>
            <Grid item xs={12} mt={2} sx={{ color: "black" }}>
              <Typography variant="body1">
                Don't have an account ? <Link href={"/sign-up"}>Sign Up</Link>
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <LoadingButton
                loading={isLoading}
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
              >
                {" "}
                Sign In
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
}
