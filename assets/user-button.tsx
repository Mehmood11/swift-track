import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";

export function UserButton(props: any): JSX.Element {
  return (
    <Tooltip title="Profile">
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "50%",
          // top: -10,
          boxShadow: 16,
          margin: 0,
          // position: "fixed",
          // right: 0,
          // zIndex: (theme) => theme.zIndex.speedDial,
        }}
        {...props}
      >
        <ButtonBase
          sx={{
            backgroundColor: "primary.main",
            borderRadius: "50%",
            color: "primary.contrastText",
            p: "6px",
          }}
        >
          <PersonIcon />
        </ButtonBase>
      </Box>
    </Tooltip>
  );
}
