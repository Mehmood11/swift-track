import { useCallback } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import Badge, { badgeClasses } from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

// components

import { OptionsColorPreset } from "./options-color-preset";
import { OptionsContrast } from "./options-contrast";
import { OptionsNavColor } from "./options-nav-color";
import { OptionsColorScheme } from "./options-color-scheme";
import { Settings } from "@/components/types/settings";
import { Scrollbar } from "@/components/scrollbar";

interface SettingsDrawerProps {
  canReset?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  onUpdate?: (settings: Settings) => void;
  open?: boolean;
  values?: Settings;
}

export function SettingsDrawer(props: SettingsDrawerProps): JSX.Element {
  const {
    canReset,
    onClose,
    onUpdate,
    onReset,
    open,
    values = {},
    ...other
  } = props;

  const handleFieldUpdate = useCallback(
    (field: keyof Settings, value: unknown): void => {
      onUpdate?.({
        [field]: value,
      });
    },
    [onUpdate]
  );

  return (
    <Drawer
      anchor="right"
      disableScrollLock
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          invisible: true,
        },
        sx: { zIndex: 1400 },
      }}
      PaperProps={{
        elevation: 24,
        sx: {
          maxWidth: "100%",
          width: 440,
        },
      }}
      {...other}
    >
      <Scrollbar
        sx={{
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
          },
          "& .simplebar-placeholder": {
            height: "0 !important",
          },
          "& .simplebar-scrollbar:before": {
            background: "var(--nav-scrollbar-color)",
          },
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{
            px: 3,
            pt: 2,
          }}
        >
          <Typography variant="h6">App Settings</Typography>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Badge
              anchorOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              color="error"
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  top: 6,
                  right: 6,
                  ...(!canReset && {
                    display: "none",
                  }),
                },
              }}
              variant="dot"
            >
              <IconButton color="inherit" onClick={onReset}>
                <SvgIcon fontSize="small">
                  <RefreshIcon />
                </SvgIcon>
              </IconButton>
            </Badge>
            <IconButton color="inherit" onClick={onClose}>
              <SvgIcon>
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </Stack>
        </Stack>
        <Stack spacing={5} sx={{ p: 3 }}>
          <OptionsColorPreset
            onChange={(value) => {
              handleFieldUpdate("colorPreset", value);
            }}
            value={values.colorPreset}
          />
          <OptionsColorScheme
            onChange={(value) => {
              handleFieldUpdate("paletteMode", value);
            }}
            value={values.paletteMode}
          />
          <OptionsNavColor
            onChange={(value) => {
              handleFieldUpdate("navColor", value);
            }}
            value={values.navColor}
          />
          {/* <OptionsLayout
            onChange={(value) => {
              handleFieldUpdate("layout", value);
            }}
            value={values.layout}
          />
          <OptionsStretch
            onChange={(value) => {
              handleFieldUpdate("stretch", value);
            }}
            value={values.stretch}
          /> */}
          <OptionsContrast
            onChange={(value) => {
              handleFieldUpdate("contrast", value);
            }}
            value={values.contrast}
          />
          {/* <OptionsDirection
            onChange={(value) => {
              handleFieldUpdate("direction", value);
            }}
            value={values.direction}
          /> */}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
