import { Box, Typography, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
// import Divider from "@mui/material/Divider";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useSignupMutation } from "@/services/auth/auth-api";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export function SignUpSection(): JSX.Element {
  const router = useRouter();
  const [signUpMutation, { isLoading }] = useSignupMutation();
  const methods = useForm<any>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(
      Yup.object().shape({
        username: Yup.string()
          .matches(
            /^[a-z0-9]{6,20}$/,
            "Username must be between 6 and 20 characters, and can only contain small alphabets and numbers."
          )
          .required("Username is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
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
      const res: any = await signUpMutation(data);
      toast.success(res?.data?.message ?? `Signed Up Successfully!`);
      router.push("/login");
    } catch (error: any) {
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
                name="email"
                placeholder="Email"
                outerLabel="Email"
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
                Already have an account ? <Link href={"/login"} style={{ color: "blue" }}>Login</Link>
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
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
}
