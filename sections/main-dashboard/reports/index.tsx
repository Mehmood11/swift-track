'use client'

import CustomTable from "@/components/custom-table";
import { useReport } from "./useReport";

export function ReportsSection(): JSX.Element {
  const { data, columns, params, setParams } = useReport();
  return (
    <CustomTable
      data={data}
      columns={columns}
      // isLoading={isLoading}
      // isFetching={isFetching}
      // isError={isError}
      isSuccess
      isPagination
    //   showSerialNo
      // count={Math.ceil(data?.data?.meta?.total / limit)}
      totalPages={20}
      currentPage={1}
      onPageChange={(onPageData: any) => {
        setParams({
          page: onPageData,
          offset: (onPageData - 1) * 10,
        });
      }}
    />
  );
}
