"use client";
import CustomTable from "@/components/custom-table";
import { useReport } from "./useReport";
import { Box, Button, Modal, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFAutocompleteAsync } from "@/components/rhf/rhf-autocomplete-async";
import { RHFCustomSelect } from "@/components/rhf/rhf-custom-select";

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
    numberPlate,
    clientNames,
    driverNames,
    handleSubmit,
    onSubmitHandler,
  } = useReport();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "start", sm: "flex-end" },
          alignItems: "center",
          // position: "relative",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            position: { xs: "auto", sm: "absolute" },
            top: { xs: "18%", xl: "15%" },
            mt: { xs: 1.5, sm: 0 },
          }}
        >
          Generate Report
        </Button>
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
              <RHFAutocompleteAsync
                name="client_name"
                outerLabel={"Job"}
                placeholder={"Job"}
                apiQuery={clientNames}
                getOptionLabel={(option: any) => option.name}
              />
              <RHFAutocompleteAsync
                name="number_plate"
                outerLabel={"Number Plate"}
                placeholder={"Number Plate"}
                apiQuery={numberPlate}
                getOptionLabel={(option: any) => option.name}
              />
              <RHFAutocompleteAsync
                name="driver_name"
                outerLabel={"Driver Name"}
                placeholder={"Driver Name"}
                apiQuery={driverNames}
                getOptionLabel={(option: any) => option.name}
              />
              <Button variant="contained" sx={{ mt: 1 }} type="submit">
                Apply Filter
              </Button>
            </FormProvider>
          </Box>
        </Modal>
      </Box>
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
      />
    </>
  );
}
