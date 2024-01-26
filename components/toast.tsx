import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster(): JSX.Element {
  return (
    <HotToaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        success: {
          style: {
            background: "green",
          },
        },
        error: {
          style: {
            background: "red",
          },
        },
        style: {
          borderRadius: "4px",
          background: "grey",
          color: "white",
          //   boxShadow: `0px 6px 20px 0px ${alpha(common.black, 0.3)}`,
          padding: "12px",
          fontSize: "14px",
          fontWeight: 600,
        },
      }}
    />
  );
}
