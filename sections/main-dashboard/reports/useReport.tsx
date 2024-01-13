"use client";
import {
  useLazyClientListQuery,
  useLazyDriversListQuery,
  useLazyVehiclesListQuery,
} from "@/services/order/order-api";
import {
  useApplyFilterReportMutation,
  useDeleteReportMutation,
  useReportsListQuery,
} from "@/services/reports/reports-api";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

export function useReport(): any {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading, isFetching, isError, isSuccess }: any =
    useReportsListQuery({ params });
  const numberPlate = useLazyVehiclesListQuery();
  const clientNames = useLazyClientListQuery();
  const driverNames = useLazyDriversListQuery();
  const [deleteReport] = useDeleteReportMutation();
  const [applyFilterReport] = useApplyFilterReportMutation();

  const methods = useForm({
    defaultValues: {
      type: "",
      client_name: null,
      number_plate: null,
      driver_name: null,
    },
  });

  const { handleSubmit } = methods;
  const onSubmitHandler = async (data: any) => {
    const body = {
      type: data?.type,
      client_name: data?.client_name?.name,
      number_plate: data?.client_name?.number_plate,
      driver_name: data?.driver_name?.name,
    };
    console.log(body);

    try {
      const res = await applyFilterReport({ body }).unwrap();
      toast.success(res?.message ?? "Report Generated successfully");
    } catch (error: any) {
      toast.error(error?.data?.error ?? "Something went wrong");
    }
  };

  const deleteHandler = async (id: any) => {
    console.log(id);
    try {
      const res = await deleteReport({ id }).unwrap();
      toast.success(res?.message ?? "deleted successfully");
    } catch (error: any) {
      toast.error(error?.data?.error ?? "Something went wrong");
    }
  };

  const columns = [
    {
      accessorFn: (row: any) => row.name ?? "-",
      id: "name",
      cell: (info: any) => <Box>{info.getValue() ?? "-"}</Box>,
      header: () => <span>Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.type ?? "-",
      id: "type",
      cell: (info: any) => info.getValue(),
      header: () => <span>Type</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.generated_by ?? "-",
      id: "generated_by",
      cell: (info: any) => info.getValue(),
      header: () => <span>Generated_by</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.creation_date ?? "-",
      id: "creation_date",
      cell: (info: any) => info.getValue(),
      header: () => <span>Creation Date</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.generated_by ?? "-",
      id: "generated_by",
      cell: (info: any) => (
        <>
          <DeleteIcon
            sx={{ color: "error.main", cursor: "pointer" }}
            onClick={async () => await deleteHandler(info?.row?.original?.id)}
          />
        </>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];

  return {
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
  };
}
