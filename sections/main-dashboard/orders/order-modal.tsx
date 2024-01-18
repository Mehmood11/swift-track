import React from "react";
import { FormProvider } from "@/components/rhf/form-provider";
import { RHFAutocompleteAsync } from "@/components/rhf/rhf-autocomplete-async";
import { RHFTextField } from "@/components/rhf/rhf-textfield";
import {
  useLazyClientListQuery,
  useUpdateOrdersMutation,
} from "@/services/order/order-api";
import { Box, Button, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";

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
  
  const methods = useForm({
    defaultValues: {
      client_id: null,
      pickup_address: orderValue?.pickup_address ?? "",
      delivery_address: orderValue?.delivery_address ?? "",
      quantity_loaded: orderValue?.quantity_loaded ?? 0,
      quantity_offloaded: orderValue?.quantity_offloaded ?? 0,
      status: orderValue?.status ?? "pending_loading",
    },
  });

  const { handleSubmit } = methods;
  const onSubmitHandler = async (data: any) => {
    const body = {
      billing_amount: orderValue?.billing_amount,
      client: data?.client_id?.name,
      completion_time: "2023-09-09T14:40:22.790943",
      contract_id: orderValue?.contract_id,
      creation_date: orderValue.creation_date,
      delivery_address: data?.delivery_address,
      driver: orderValue?.driver,
      id: orderValue?.id,
      pickup_address: data?.pickup_address,
      quantity_loaded: data?.quantity_loaded,
      quantity_offloaded: data?.quantity_offloaded,
      scheduled_delivery_time: orderValue?.scheduled_delivery_time,
      scheduled_pickup_time: orderValue?.scheduled_pickup_time,
      start_time: orderValue?.start_time,
      status: data?.status,
      username: orderValue?.username,
      vehicle: orderValue?.vehicle,
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
            <RHFTextField
              name="quantity_loaded"
              outerLabel="Quantity Loaded"
              placeholder="Quantity Loaded"
            />
            <RHFTextField
              name="quantity_offloaded"
              outerLabel="Quantity OffLoaded"
              placeholder="Quantity OffLoaded"
            />

            <RHFTextField
              name="status"
              outerLabel="Status"
              placeholder="Status"
            />
            <Button variant="contained" sx={{ mt: 1 }} type="submit">
              Edit Order
            </Button>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
}
