import type { ReactElement } from "react";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import type { Direction } from "common/types";

interface Option {
  label: string;
  value: Direction;
  icon: ReactElement;
}

const options: Option[] = [
  {
    label: "Left-to-right",
    value: "ltr",
    icon: (
      <SvgIcon fontSize="small">
        <AlignHorizontalLeftIcon />
        Left Indent 01 icon
      </SvgIcon>
    ),
  },
  {
    label: "Right-to-left",
    value: "rtl",
    icon: (
      <SvgIcon fontSize="small">
        <AlignHorizontalRightIcon />
      </SvgIcon>
    ),
  },
];

interface OptionsDirectionProps {
  onChange?: (value: Direction) => void;
  value?: Direction;
}

export function OptionsDirection(props: OptionsDirectionProps): JSX.Element {
  const { onChange, value } = props;

  return (
    <Stack spacing={1}>
      <Typography color="text.secondary" variant="overline">
        Orientation
      </Typography>
      <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2}>
        {options.map((option) => (
          <Chip
            icon={option.icon}
            key={option.label}
            label={option.label}
            onClick={() => onChange?.(option.value)}
            sx={{
              borderColor: "transparent",
              borderRadius: 1.5,
              borderStyle: "solid",
              borderWidth: 2,
              ...(option.value === value && {
                borderColor: "primary.main",
              }),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
