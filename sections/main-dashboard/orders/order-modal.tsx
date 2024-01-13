import { FormProvider } from "@/components/rhf/form-provider";
import { RHFAutocompleteAsync } from "@/components/rhf/rhf-autocomplete-async";
import { RHFDatePicker } from "@/components/rhf/rhf-date-picker";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import {
  useLazyClientListQuery,
  usePostOrdersMutation,
  useUpdateOrdersMutation,
} from "@/services/order/order-api";
import { Box, Button, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { parseISO } from "date-fns";

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

export function OrdersModal({ orderValue }: any): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const clientList = useLazyClientListQuery();
  const [updateOrders] = useUpdateOrdersMutation();
  console.log("orderValue", parseISO(orderValue?.scheduled_pickup_time));

  const methods = useForm({
    defaultValues: {
      contract_id: orderValue?.contract_id ?? "",
      client_id: null,
      pickup_address: orderValue?.pickup_address ?? "",
      delivery_address: orderValue?.delivery_address ?? "",
      scheduled_pickup_time: orderValue?.scheduled_pickup_time
        ? parseISO(orderValue?.scheduled_pickup_time)
        : new Date(),
      scheduled_delivery_time: orderValue?.scheduled_delivery_time
        ? parseISO(orderValue?.scheduled_delivery_time)
        : new Date(),
      status: orderValue?.status ?? "pending_loading",
    },
  });

  const { handleSubmit } = methods;
  const onSubmitHandler = async (data: any) => {
    const body = {
      contract_id: data?.contract_id,
      client_id: data?.client_id?.name,
      pickup_address: data?.pickup_address,
      delivery_address: data?.delivery_address,
      scheduled_pickup_time: data?.scheduled_pickup_time.toISOString(),
      scheduled_delivery_time: data?.scheduled_delivery_time.toISOString(),
      status: data?.status,
    };
    try {
      const res = await updateOrders({
        order_id: orderValue?.id,
        body,
      }).unwrap();
      toast.success(res?.message ?? "Order Updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.error ?? "Something went wrong");
    }
  };

  return (
    <>
      <EditIcon
        sx={{ color: "primary.main", cursor: "pointer" }}
        onClick={() => {
          handleOpen();
        }}
      />

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
    </>
  );
}
