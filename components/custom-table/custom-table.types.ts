"use client";

import type { PaginationProps } from "@mui/material";
import type { AccessorFn } from "@tanstack/react-table";

interface columns {
  accessorFn?: AccessorFn<any>;
  id: string;
  cell: (info: any) => void;
  header: ({ table, row }: any) => void;
  isSortable?: boolean;
}

export interface CustomTableProps {
  columns: columns[];
  data: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  isFetching?: boolean;
  isPagination?: boolean;
  totalPages?: number;
  maxHeight?: number;
  minHeight?: number;
  currentPage?: number;
  onPageChange?: any;
  onSortByChange?: any;
  tableContainerSX?: any;
  showSerialNo?: boolean;
  rootSX?: any;
  onSelected?: (e: any) => void;
  paginationProps?: PaginationProps;
}
