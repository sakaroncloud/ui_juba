"use client";
import { DataTable } from "@repo/ui/components/table/data-table";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { Order } from "@repo/ui/types/order.types";
import { ResponseWithMeta } from "@repo/ui/types/response.type";
import { columns } from "./columns";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useMemo } from "react";

type Props = {
  showDeleted?: boolean;
  status?: string;
  search?: string;
};

export const OrderTable = ({ showDeleted, status, search }: Props) => {
  const { data: result, refetch } = useFetch<ResponseWithMeta<Order.TOrder[]>>({
    endPoint: API_ROUTES.fooding.order.endpoint,
    queryKey: "orders",
    query: [
      { key: "status", value: status },
      {
        key: "fullName",
        value: search,
      },
    ],
  });

  useEffect(() => {
    refetch();
  }, [status, search]);

  const filteredData = useMemo(
    () =>
      result?.data?.map((order) => ({
        ...order,
        fullName: order.user.customerProfile?.fullName,
      })) || [],
    [result]
  );

  return (
    <DataTable
      columns={columns}
      data={filteredData || []}
      showDeleted={showDeleted}
    />
  );
};
