import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import mainLogo from "../assets/main-logo.png";
import { Box } from "@mui/material";

export function AuthGuard(props: any) {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [checked, setChecked] = useState<boolean>(true);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      const href = `/login?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(false);
    }
  }, [isAuthenticated, router]);

  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(() => {
    check();
  }, [check]);

  if (checked) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Image src={mainLogo} alt="main-logo" />
      </Box>
    );
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
}
