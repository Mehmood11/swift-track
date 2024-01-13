"use client";

import { useState } from "react";
import {
  Checkbox,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Autocomplete,
  Button,
  FormControlLabel,
} from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";

const getDefaultParams: any = ({ tableHeaderData }: any) => {
  const defaultParams: any = {};
  tableHeaderData.forEach((data: any) => {
    defaultParams[data.FieldProps.name] = "";
  });
  return defaultParams;
};

const Icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------
let timer: ReturnType<typeof setTimeout>;

export function TableHeader(props: any): JSX.Element {
  const {
    tableHeaderData,
    onChanged = () => {
      return null;
    },
    debounceTimeout = 1000,
    filterButtonShow,
    filterButtonLabel,
    filterButtonProps,
    showClearFilterButton,
    gridProps,
  } = props;

  const [params, setParams] = useState<any>(
    getDefaultParams({ tableHeaderData })
  );

  const [show, setShow] = useState(!filterButtonShow);

  function changeHandler({ target: { name, value } }: any, type: string): any {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };

      // Use debounce if search is updated
      clearTimeout(timer);

      if (type === "search") {
        timer = setTimeout(() => {
          onChanged(updatedParams);
        }, debounceTimeout);
      } else {
        onChanged(updatedParams);
      }

      return updatedParams;
    });
  }

  function autoCompleteChangeHandler(value: any, name: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };
      onChanged(updatedParams);
      return updatedParams;
    });
  }

  function dateChangeHandler(value: any, name: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: value };
      onChanged(updatedParams);
      return updatedParams;
    });
  }
  function checkBoxChangeHandler({ target: { name, checked } }: any): void {
    setParams((oldParams: any) => {
      const updatedParams = { ...oldParams, [name]: checked };
      onChanged(updatedParams);
      return updatedParams;
    });
  }

  function onClear(): void {
    const defaultParams = getDefaultParams({ tableHeaderData });
    setParams(defaultParams);
    onChanged(defaultParams);
  }

  return (
    <>
      {filterButtonShow && (
        <Button
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
          sx={{
            color: "text.primary",
            border: `1px solid`,
            borderColor: "neutral.300",
            borderRadius: 1.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 7px",
          }}
          {...filterButtonProps}
        >
          {filterButtonLabel}
          <KeyboardArrowDownIcon
            sx={{
              color: "text.primary",
            }}
          />
        </Button>
      )}
      {show && (
        <Grid container mt={1} gap={2}>
          {tableHeaderData.map((data: any) => {
            if (data.type === "search") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <TextField
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={params[data.FieldProps.name]}
                    onChange={(e) => changeHandler(e, data.type)}
                    {...data.FieldProps}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              );
            } else if (data.type === "select") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={params[data.FieldProps.name]}
                    onChange={(e) => changeHandler(e, data.type)}
                    {...data.FieldProps}
                  >
                    {data.options.map(({ label, value }: any) => (
                      <MenuItem
                        key={value}
                        value={value}
                        sx={{ fontSize: "1.5rem" }}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              );
            } else if (data.type === "multiselect") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <Autocomplete
                    multiple
                    limitTags={1}
                    size="small"
                    fullWidth
                    id="checkboxes-tags-demo"
                    options={data.options}
                    disableCloseOnSelect
                    sx={{
                      "& .MuiButtonBase-root": {
                        height: "unset !important",
                      },
                    }}
                    onChange={(e, value) => {
                      autoCompleteChangeHandler(value, data.FieldProps.name);
                    }}
                    renderOption={(prop, options: any, { selected }) => (
                      <MenuItem {...prop} sx={{ fontSize: "1.5rem" }}>
                        <Checkbox
                          icon={Icon}
                          checkedIcon={CheckedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {options.label}
                      </MenuItem>
                    )}
                    renderInput={(param) => {
                      return (
                        <TextField
                          variant="outlined"
                          name={data.FieldProps.name}
                          label={data.FieldProps.label}
                          {...param}
                        />
                      );
                    }}
                  />
                </Grid>
              );
            } else if (data.type === "date") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  {/* <DatePicker
                    value={params[data.FieldProps.name]}
                    onChange={(value: any) => {
                      dateChangeHandler(value, data.FieldProps.name);
                    }}
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true,
                        error: false,
                        ...data.FieldProps,
                      },
                    }}
                  /> */}
                  {/* <DateRange
                    editableDateInputs={true}
                    onChange={(value: any) => {
                      dateChangeHandler(value, data.FieldProps.name);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={rangeState}
                    color={theme?.palette?.primary?.main}
                    rangeColors={[theme?.palette?.primary?.main]}
                  /> */}
                </Grid>
              );
            } else if (data.type === "checkbox") {
              return (
                <Grid
                  key={data.FieldProps.name}
                  xs={12}
                  md={3.5}
                  lg={2}
                  flexWrap="wrap"
                  justifyContent="center"
                  item
                  {...gridProps}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(e) => {
                      checkBoxChangeHandler(e);
                    }}
                    {...data.FieldProps}
                  />
                </Grid>
              );
            }
            return null;
          })}
          {showClearFilterButton && (
            <Grid
              xs={12}
              md={3.5}
              lg={2}
              display="flex"
              flexWrap="wrap"
              justifyContent={{ xs: "flex-start", sm: "flex-end" }}
              item
              ml="auto"
              mr={4}
              {...gridProps}
            >
              <Button
                onClick={onClear}
                sx={{ color: "primary.main" }}
                variant="text"
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                Clear Filters
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
