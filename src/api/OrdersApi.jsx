import { useQuery, useMutation } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from "sonner";

export const useGetUserOrders = (orderId) => {
  const fetchUserOrders = async () => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  return useQuery(["userOrders", orderId], fetchUserOrders);
};

export const useGetOrders = ({
  searchQuery,
  page,
  sortOption,
  deliverySlot,
  status,
  method, // Updated field name
  startDate,
  endDate,
}) => {
  const getOrdersRequest = async () => {
    console.log("getOrdersRequest started");

    const queryParams = new URLSearchParams({
      searchQuery,
      page: String(page),
      sortOption,
      deliverySlot,
      status,
      method, // Updated field name
      startDate,
      endDate,
    });

    const requestUrl = `${API_BASE_URL}/orders?${queryParams}`;

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch orders");
      throw new Error("Failed to fetch orders");
    }

    const orders = await response.json();
    console.log("Orders fetched:", orders);
    return orders;
  };

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    [
      "orders",
      searchQuery,
      page,
      sortOption,
      deliverySlot,
      status,
      method,
      startDate,
      endDate,
    ], // Updated field name
    getOrdersRequest
  );

  console.log("useGetOrders result:", { orders, isLoading, isError, refetch });
  return { orders, isLoading, isError, refetch };
};

export const useUpdateOrderStatus = () => {
  const updateOrderStatusRequest = async ({ orderId, newStatus }) => {
    console.log("Updating order status for orderId:", orderId); // Debugging line
    const response = await fetch(
      `${API_BASE_URL}/orders/update-status/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const { mutateAsync: updateOrderStatus, isLoading: isUpdatingOrderStatus } =
    useMutation({
      mutationFn: updateOrderStatusRequest,
      onSuccess: () => {
        toast.success("Order status updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update status: ${error.message}`);
      },
    });

  return { updateOrderStatus, isUpdatingOrderStatus };
};

export const useUpdateLogistics = () => {
  const updateLogisticsRequest = async ({ orderId, newLogisticId }) => {
    console.log("Updating logistics for orderId:", orderId); // Debugging line
    const response = await fetch(
      `${API_BASE_URL}/orders/update-logistics/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newLogisticId }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const { mutateAsync: updateLogistics, isLoading: isUpdatingLogistics } =
    useMutation({
      mutationFn: updateLogisticsRequest,
      onSuccess: () => {
        toast.success("Logistics updated successfully");
      },
      onError: (error) => {
        toast.error(`Failed to update logistics: ${error.message}`);
      },
    });

  return { updateLogistics, isUpdatingLogistics };
};