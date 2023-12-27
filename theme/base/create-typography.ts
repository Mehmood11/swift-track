import type { TypographyOptions } from "@mui/material/styles/createTypography";

export const createTypography = (): TypographyOptions => {
  return {
    htmlFontSize: 10,
    fontFamily: "inherit",
    body1: {
      fontSize: "1.8rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "1.6rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontWeight: 600,
    },
    caption: {
      fontSize: "1.2rem",
      fontWeight: 500,
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "1.6rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "1.4rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "1.4rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    h1: {
      fontWeight: 700,
      fontSize: "6rem",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: "4.8rem",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: "3.6rem",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 700,
      fontSize: "2.4rem",
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.2,
    },
  };
};
