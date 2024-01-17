"use client";
import {
  useClientListQuery,
  useDeleteOrdersMutation,
  useDriversListQuery,
  useLazyClientListQuery,
  useOrdersListQuery,
  usePostOrdersMutation,
  useVehiclesListQuery,
} from "@/services/order/order-api";
import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function useOrder() {
  const theme = useTheme();
  const [rangeState, setRangeState] = useState<any[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [otherParams, setOtherParams] = useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLButtonElement | null | any
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const paramsData = {
    limit: 10,
    offset: params.offset,
    period_start_date: rangeState?.[0]?.startDate?.toISOString(),
    period_end_date: rangeState?.[0]?.endDate?.toISOString(),
    ...otherParams,
  };

  const { data, isLoading, isFetching, isError, isSuccess, refetch }: any =
    useOrdersListQuery({ paramsData });
  const { data: vehiclesData }: any = useVehiclesListQuery(null);
  const clientList = useLazyClientListQuery();
  const [postOrders] = usePostOrdersMutation();
  const [deleteOrders] = useDeleteOrdersMutation();
  const { data: clientsData }: any = useClientListQuery(null);
  const { data: driversData }: any = useDriversListQuery(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const methods = useForm({
    defaultValues: {
      contract_id: "",
      client_id: null,
      pickup_address: "",
      delivery_address: "",
      scheduled_pickup_time: new Date(),
      scheduled_delivery_time: new Date(),
      status: "pending_loading",
    },
  });

  const numberPlate = vehiclesData?.map((item: any) => {
    return {
      label: item?.number_plate,
      value: item?.number_plate,
    };
  });
  const clientName = clientsData?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.name,
    };
  });
  const driverData = driversData?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.name,
    };
  });

  const { handleSubmit } = methods;
  const onSubmitHandler = async (data: any) => {
    const scheduledPickupTime =
      data?.scheduled_pickup_time instanceof Date
        ? data?.scheduled_pickup_time
        : new Date(data?.scheduled_pickup_time);
    const scheduledDeliveryTime =
      data?.scheduled_delivery_time instanceof Date
        ? data?.scheduled_delivery_time
        : new Date(data?.scheduled_delivery_time);

    const body = {
      contract_id: data?.contract_id,
      client_id: data?.client_id?.name,
      pickup_address: data?.pickup_address,
      delivery_address: data?.delivery_address,
      scheduled_pickup_time: scheduledPickupTime.toISOString(),
      scheduled_delivery_time: scheduledDeliveryTime.toISOString(),
      status: data?.status,
    };

    console.log(body);
    try {
      const res = await postOrders({ body }).unwrap();
      toast.success(res?.message ?? "Order Added successfully");
    } catch (error: any) {
      toast.error(error?.data?.error ?? "Something went wrong");
    }
  };

  return {
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
    anchorEl,
    open,
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
  };
}
