import { inputLabelClasses } from "@mui/material/InputLabel";
import { tableCellClasses } from "@mui/material/TableCell";
import type { Components } from "@mui/material/styles/components";
import { createTheme } from "@mui/material/styles";

interface CreateComponentOptions {
  disableButtonsOnLoginAs?: boolean;
}

// Used only to create transitions
const muiTheme = createTheme();

export const createComponents = ({
  disableButtonsOnLoginAs,
}: CreateComponentOptions): Components => {
  return {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: "8px",
          textTransform: "none",
          ...(disableButtonsOnLoginAs && ownerState.variant === "contained"
            ? {
                color: "rgba(16, 24, 40, 0.38) !important",
                background: "grey !important",
                pointerEvents: "none",
                backgroundColor: "rgba(16, 24, 40, 0.12) !important",
                boxShadow: "none",
              }
            : ownerState.variant === "outlined" &&
              ownerState.className?.includes("operation") && {
                color: "rgba(16, 24, 40, 0.38) !important",
                border: "1px solid rgba(16, 24, 40, 0.12) !important",
                pointerEvents: "none",
                boxShadow: "none",
              }),
        }),
        sizeSmall: {
          padding: "8px 12px",
        },
        sizeMedium: {
          padding: "10px 20px",
        },
        sizeLarge: {
          padding: "12px 20px",
        },
        textSizeSmall: {
          padding: "8px 12px",
        },
        textSizeMedium: {
          padding: "10px 20lpx",
        },
        textSizeLarge: {
          padding: "12px 20px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px 16px",
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        checkedIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 3.5C5.68629 3.5 3 6.18629 3 9.5V15.5C3 18.8137 5.68629 21.5 9 21.5H15C18.3137 21.5 21 18.8137 21 15.5V9.5C21 6.18629 18.3137 3.5 15 3.5H9ZM16.7179 10.1961C17.1024 9.79966 17.0926 9.16657 16.6961 8.7821C16.2997 8.39763 15.6666 8.40737 15.2821 8.80385L10.6667 13.5635L8.7179 11.5539C8.33343 11.1574 7.70034 11.1476 7.30385 11.5321C6.90737 11.9166 6.89763 12.5497 7.2821 12.9461L9.94877 15.6961C10.1371 15.8904 10.3961 16 10.6667 16C10.9372 16 11.1962 15.8904 11.3846 15.6961L16.7179 10.1961Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
        color: "primary",
        icon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              height="16"
              rx="5"
              stroke={muiTheme.palette.grey[300]}
              strokeWidth="2"
              width="16"
              x="4"
              y="4.5"
            />
          </svg>
        ),
        indeterminateIcon: (
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M9 5.5H15C17.2091 5.5 19 7.29086 19 9.5V15.5C19 17.7091 17.2091 19.5 15 19.5H9C6.79086 19.5 5 17.7091 5 15.5V9.5C5 7.29086 6.79086 5.5 9 5.5ZM3 9.5C3 6.18629 5.68629 3.5 9 3.5H15C18.3137 3.5 21 6.18629 21 9.5V15.5C21 18.8137 18.3137 21.5 15 21.5H9C5.68629 21.5 3 18.8137 3 15.5V9.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H8Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        ),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          fontSize: "62.5%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#root, #__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            opacity: 1,
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 8,
          borderStyle: "solid",
          borderWidth: 1,
          overflow: "hidden",
          transition: muiTheme.transitions.create(["border-color", "box-shadow"]),
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "24px",
        },
        notchedOutline: {
          transition: muiTheme.transitions.create(["border-color", "box-shadow"]),
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,

          [`&.${inputLabelClasses.filled}`]: {
            transform: "translate(12px, 18px) scale(1)",
          },
          [`&.${inputLabelClasses.shrink}`]: {
            [`&.${inputLabelClasses.standard}`]: {
              transform: "translate(0, -1.5px) scale(0.85)",
            },
            [`&.${inputLabelClasses.filled}`]: {
              transform: "translate(12px, 6px) scale(0.85)",
            },
            [`&.${inputLabelClasses.outlined}`]: {
              transform: "translate(14px, -9px) scale(0.85)",
            },
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: "16px",
          minWidth: "unset",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: "primary",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="20"
              height="20"
              rx="10.5"
              fill={muiTheme.palette.grey[200]}
            />
            <rect
              x="0.5"
              y="0.5"
              width="20"
              height="20"
              rx="10.5"
              stroke={muiTheme.palette.grey[300]}
            />
          </svg>
        ),
        checkedIcon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C4.49 0 0 4.49 0 10C0 15.51 4.49 20 10 20C15.51 20 20 15.51 20 10C20 4.49 15.51 0 10 0ZM14.78 7.7L9.11 13.37C8.97 13.51 8.78 13.59 8.58 13.59C8.38 13.59 8.19 13.51 8.05 13.37L5.22 10.54C4.93 10.25 4.93 9.77 5.22 9.48C5.51 9.19 5.99 9.19 6.28 9.48L8.58 11.78L13.72 6.64C14.01 6.35 14.49 6.35 14.78 6.64C15.07 6.93 15.07 7.4 14.78 7.7Z"
              fill="currentColor"
            />
          </svg>
        ),
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: "primary",
        // disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: 46,
          height: 26,
          padding: 0,
          "& .MuiSwitch-track": {
            borderRadius: 26 / 2,
            transition: muiTheme.transitions.create(["background-color"], {
              duration: 500,
            }),
            backgroundColor: muiTheme.palette.grey[300],
          },
        },
        switchBase: {
          padding: 1,
          margin: 1,
          transitionDuration: "300ms",
          "&.Mui-checked + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "primary",
          },
        },
        thumb: {
          boxSizing: "border-box",
          width: 22,
          height: 22,
          color: muiTheme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: "auto",
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: "none",
          "& + &": {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "15px 16px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {},
        },
      },
    },
  };
};
