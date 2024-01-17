"use client";
import CustomTable from "@/components/custom-table";
import { useOrder } from "./useOrder";
import { TableHeader } from "@/components/custom-table/table-header";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { Box, Button, Modal, Popover, Typography } from "@mui/material";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFAutocompleteAsync } from "@/components/rhf/rhf-autocomplete-async";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import { RHFDatePicker } from "@/components/rhf/rhf-date-picker";
import { columnsFunction } from "./order.data";

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
  height: "600px",
  overflowY: "auto",
};

export function OrdersSection(): JSX.Element {
  const {
    data,
    params,
    setParams,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    numberPlate,
    clientName,
    driverData,
    rangeState,
    setRangeState,
    theme,
    open,
    anchorEl,
    handleClose,
    handleClick,
    openPop,
    id,
    setOtherParams,
    refetch,
    methods,
    onSubmitHandler,
    handleSubmit,
    handleCloseModal,
    handleOpen,
    clientList,
    deleteOrders,
  } = useOrder();
  const columns = columnsFunction(deleteOrders);

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
          Add Order
        </Button>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <RHFTextField
                name="contract_id"
                outerLabel="Contract Id"
                placeholder="Contract Id"
              />
              <RHFAutocompleteAsync
                name="client_id"
                outerLabel={"Client Id"}
                placeholder={"Client Id"}
                apiQuery={clientList}
                getOptionLabel={(option: any) => option.name}
              />
              <RHFTextField
                name="pickup_address"
                outerLabel="Pickup Address"
                placeholder="Pickup Address"
              />
              <RHFTextField
                name="delivery_address"
                outerLabel="Delivery Address"
                placeholder="Delivery Address"
              />
              <RHFDatePicker
                name="scheduled_pickup_time"
                outerLabel="Scheduled Pickup Time"
              />
              <RHFDatePicker
                name="scheduled_delivery_time"
                outerLabel="Scheduled Delivery Time"
              />
              <RHFTextField
                name="status"
                outerLabel="Status"
                placeholder="Status"
              />
              <Button variant="contained" sx={{ mt: 1 }} type="submit">
                Add Order
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
            type: "select",
            FieldProps: {
              name: "client_name",
              label: "Client Name",
            },
            options: clientName ?? [],
          },
          {
            type: "select",
            FieldProps: {
              name: "number_plate",
              label: "Number Plate",
            },
            options: numberPlate ?? [],
          },
          {
            type: "select",
            FieldProps: {
              name: "driver_name",
              label: "Driver Name",
            },
            options: driverData ?? [],
          },
        ]}
      />
      <Box mb={2} mt={1}>
        <Button aria-describedby={id} onClick={handleClick} variant="outlined">
          Apply Date Range
        </Button>
        <Popover
          id={id}
          open={openPop}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item: any) => {
              setRangeState([item?.selection]);
              refetch();
            }}
            moveRangeOnFirstSelection={false}
            ranges={rangeState}
            color={theme?.palette?.primary?.main}
            rangeColors={[theme?.palette?.primary?.main]}
          />
        </Popover>
      </Box>

      <CustomTable
        data={data?.data?.order}
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
