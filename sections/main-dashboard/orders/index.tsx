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

const orderData = [
  {
    id: 1,
    billing_amount: 12,
    client_name: "John Smith",
    completion_time: 3000,
    contract_id: "12JDS23",
    creation_date: "2000, 1, 1",
    delivery_address: "123 Main Street",
    delivery_name: "John Smith Chair",
    pickup_address: "123 Main Street Road",
    quantity_loaded: 122,
    quantity_offloaded: 221,
    scheduled_delivery_time: "2000, 3, 2",
    start_time: "2020, 1, 4",
    status: "success",
    vehicle_no: 123,
  },
];

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
  maxHeight: { xs: 500, sm: 600, lg: 700 },
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "primary.main",
    borderRadius: "6px",
  },
};

export function OrdersSection(): JSX.Element {
  const {
    data,
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
        }}
      >
        <Button
          aria-describedby={id}
          onClick={handleClick}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Apply Date Range
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Add Order
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
            }}
            moveRangeOnFirstSelection={false}
            ranges={rangeState}
            color={theme?.palette?.primary?.main}
            rangeColors={[theme?.palette?.primary?.main]}
          />
        </Popover>

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

      <CustomTable
        data={orderData}
        columns={columns}
        // isLoading={isLoading}
        // isFetching={isFetching}
        // isError={isError}
        isSuccess={true}
        isPagination
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 20,
          });
        }}
        rootSX={{ mt: 1 }}
      />
    </>
  );
}
