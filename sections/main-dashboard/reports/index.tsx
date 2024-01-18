"use client";
import CustomTable from "@/components/custom-table";
import { useReport } from "./useReport";
import { Box, Button, Modal, Popover } from "@mui/material";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFCustomSelect } from "@/components/rhf/rhf-custom-select";
import { TableHeader } from "@/components/custom-table/table-header";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};

export function ReportsSection(): JSX.Element {
  const {
    data,
    columns,
    params,
    setParams,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    open,
    handleClose,
    handleOpen,
    methods,
    handleSubmit,
    onSubmitHandler,
    setOtherParams,
    clientName,
    rangeState,
    setRangeState,
    anchorEl,
    handleAnchorClose,
    handleClick,
    openPop,
    id,
    theme,
  } = useReport();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          position: { xs: "auto", lg: "absolute" },
          top: { xs: "13%", xl: "13%" },
          right: 35,
          mt: { xs: 1.5, sm: 0 },
        }}
      >
        <Button onClick={handleClick} variant="outlined" sx={{ mr: 1 }}>
          Apply Date Range
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Generate Report
        </Button>
        <Popover
          id={id}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handleAnchorClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item: any) => {
              setRangeState([item?.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={rangeState}
            color={theme?.palette?.primary?.main}
            rangeColors={[theme?.palette?.primary?.main]}
          />
        </Popover>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <RHFCustomSelect
                name="type"
                outerLabel="Type"
                options={[
                  { id: 1, label: "Weekly", value: "weekly" },
                  { id: 2, label: "Monthly", value: "monthly" },
                ]}
              />

              <Button variant="contained" sx={{ mt: 1 }} type="submit">
                Generate Report
              </Button>
            </FormProvider>
          </Box>
        </Modal>
      </Box>

      <TableHeader
        gridProps={{
          lg: 2.8,
        }}
        onChanged={(e: any) => {
          setOtherParams(e);
        }}
        tableHeaderData={[
          {
            type: "search",
            FieldProps: {
              name: "search",
              placeholder: "Search",
            },
          },
          {
            type: "select",
            FieldProps: {
              name: "client_name",
              label: "Client Name",
            },
            options: clientName ?? [],
          },
        ]}
      />

      <CustomTable
        data={data?.data?.report}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isSuccess={isSuccess}
        isPagination
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
        rootSX={{ mt: 1 }}
      />
    </>
  );
}
