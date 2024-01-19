"use client";

import { useState } from "react";
import {
  Checkbox,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Button,
  FormControlLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";

const getDefaultParams: any = ({ tableHeaderData }: any) => {
  const defaultParams: any = {};
  tableHeaderData.forEach((data: any) => {
    defaultParams[data.FieldProps.name] = "";
  });
  return defaultParams;
};

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
    dateRangeHandler,
    generateReportHandler,
    isReport,
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
                    {data.options.map(({ label, value, id }: any) => (
                      <MenuItem
                        key={id}
                        value={value}
                        sx={{ fontSize: "1.5rem" }}
                      >
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
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
          {isReport && (
            <Grid
              xs={12}
              md={4}
              display="flex"
              // flexWrap="wrap"
              justifyContent={"flex-start"}
              alignItems={"center"}
              flexDirection={"row"}
              item
              // ml="auto"
              // mr={4}
              // height="auto"
              // {...gridProps}
            >
              <Button
                onClick={dateRangeHandler}
                variant="outlined"
                size="small"
                sx={{ mr: 1, fontSize: "11px" }}
              >
                Apply Date Range
              </Button>
              <Button
                variant="contained"
                onClick={generateReportHandler}
                size="small"
                sx={{ fontSize: "11px" }}
              >
                Generate Report
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
}
