'use client'
import { Box } from "@mui/material";
import { useState } from "react";

const data = [
  {
    id: 1,
    userName: "Jhon Wick",
    businessName: "Apex",
    businessEmail: "ew@jskdk.com",
    country: "USA",
  },
  {
    id: 2,
    userName: "Iron Man",
    businessName: "Marvel",
    businessEmail: "ew@jskdk.com",
    country: "Canada",
  },
];
export function useReport() {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const columns = [
    {
      accessorFn: (row: any) => `${row.userName}`,
      id: "userName",
      cell: (info: any) => (
        <Box>
          {/* <Image src={Person} alt="" /> */}
          {info.getValue() ?? "-"}
        </Box>
      ),
      header: () => <span>Username</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.businessName ?? "-",
      id: "businessName",
      cell: (info: any) => info.getValue(),
      header: () => <span>Business name</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.email ?? "-",
      id: "businessEmail",
      cell: (info: any) => info.getValue(),
      header: () => <span>Business Email</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.country ?? "-",
      id: "Country",
      cell: (info: any) => info.getValue(),
      header: () => <span>Country</span>,
      isSortable: false,
    },
  ];
  return { data, columns, params, setParams };
}
