import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

interface SettingsButtonProps {
  onClick?: () => void;
}

export function SettingsButton(props: SettingsButtonProps): JSX.Element {
  return (
    <Tooltip title="Settings">
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "50%",
          bottom: 0,
          boxShadow: 16,
          margin: (theme) => theme.spacing(4),
          position: "fixed",
          right: 0,
          zIndex: (theme) => theme.zIndex.speedDial,
        }}
        {...props}
      >
        <ButtonBase
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",
            color: "primary.contrastText",
            p: "10px",
          }}
        >
          <SvgIcon>
            <SettingsIcon />
          </SvgIcon>
        </ButtonBase>
      </Box>
    </Tooltip>
  );
}
