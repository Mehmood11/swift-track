import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { SplashScreen } from "@/components/splash-screen";
import { useLazyRefreshQuery } from "@/services/auth/auth-api";
import { useDispatch, useSelector } from "@/store";
import { Settings } from "@/components/types/settings";
import { authActions } from "@/slices";

interface AuthProviderProps {
  children: ReactNode;
  handleTheme: (settings: Settings) => void;
}

export function AuthInitializer(props: AuthProviderProps): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);

  const {
    auth: { refreshToken, accessToken, user },
    loginAs: { loginAs },
  }: any = useSelector((state: { auth: any }) => state);
  const [refreshQuery, { isLoading }] = useLazyRefreshQuery();
  const { children, handleTheme } = props;
  const dispatch = useDispatch();

  const initialize = useCallback(async (): Promise<void> => {
    if (refreshToken && accessToken) {
      try {
        await refreshQuery({
          body: {
            refresh_token: refreshToken,
          },
        }).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message || "Something Went Wrong");
        dispatch(authActions.logout());
      }
    } else {
      dispatch(authActions.logout());
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  useEffect(() => {
    handleTheme({
      disableButtonsOnLoginAs: Boolean(loginAs),
    });
  }, [loginAs]);

  if (isLoading || !isInitialized) {
    return <SplashScreen>Loading...</SplashScreen>;
  }

  return <>{children}</>;
}
