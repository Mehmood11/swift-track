import { Box } from "@mui/material";
import { OrdersModal } from "./order-modal";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

export const columnsFunction = (deleteOrders: any) => {
  return [
    {
      accessorFn: (row: any) => `${row.billing_amount}`,
      id: "billing_amount",
      cell: (info: any) => <Box>{info.getValue() ?? "-"}</Box>,
      header: () => <span>Billing Amount</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.client_name ?? "-",
      id: "client_name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Client Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.completion_time ?? "-",
      id: "completion_time",
      cell: (info: any) => info.getValue(),
      header: () => <span>Completion Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.contract_id ?? "-",
      id: "contract_id",
      cell: (info: any) => info.getValue(),
      header: () => <span>Contract Id</span>,
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
      accessorFn: (row: any) => row.delivery_address ?? "-",
      id: "delivery_address",
      cell: (info: any) => info.getValue(),
      header: () => <span>Delivery Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.delivery_name ?? "-",
      id: "delivery_name",
      cell: (info: any) => info.getValue(),
      header: () => <span>Delivery Name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.pickup_address ?? "-",
      id: "pickup_address",
      cell: (info: any) => info.getValue(),
      header: () => <span>Pickup Address</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.quantity_loaded ?? "-",
      id: "quantity_loaded",
      cell: (info: any) => info.getValue(),
      header: () => <span>Quantity Loaded</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.quantity_offloaded ?? "-",
      id: "quantity_offloaded",
      cell: (info: any) => info.getValue(),
      header: () => <span>Quantity OffLoaded</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.scheduled_delivery_time ?? "-",
      id: "scheduled_delivery_time",
      cell: (info: any) => info.getValue(),
      header: () => <span>Scheduled Delivery Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.scheduled_pickup_time ?? "-",
      id: "scheduled_pickup_time",
      cell: (info: any) => info.getValue(),
      header: () => <span>Scheduled Pickup Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.start_time ?? "-",
      id: "start_time",
      cell: (info: any) => info.getValue(),
      header: () => <span>Start Time</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.status ?? "-",
      id: "status",
      cell: (info: any) => info.getValue(),
      header: () => <span>Status</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.vehicle_no ?? "-",
      id: "vehicle_no",
      cell: (info: any) => info.getValue(),
      header: () => <span>Vehicle No</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.generated_by ?? "-",
      id: "generated_by",
      cell: (info: any) => (
        <div style={{ display: "flex" }}>
          <OrdersModal orderValue={info?.row?.original} />
          <DeleteIcon
            sx={{ color: "error.main", cursor: "pointer" }}
            onClick={async () => {
              try {
                const res = await deleteOrders({
                  order_id: info?.row?.original?.id,
                }).unwrap();
                toast.success(res?.message ?? "Order Deleted successfully");
              } catch (error: any) {
                toast.success(error?.data?.message ?? "Something went wrong");
              }
            }}
          />
        </div>
      ),
      header: () => <span>Action</span>,
      isSortable: false,
    },
  ];
};
