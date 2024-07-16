import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL:", API_BASE_URL);

export const useGetOrders = ({ searchQuery, page, sortOption }) => {
  console.log("useGetOrders params:", { searchQuery, page, sortOption });

  const getOrdersRequest = async () => {
    console.log("getOrdersRequest started");

    const queryParams = new URLSearchParams({
      searchQuery,
      page: String(page),
      sortOption,
    });

    const requestUrl = `${API_BASE_URL}/orders?${queryParams}`;
    console.log("Request URL:", requestUrl);

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
  } = useQuery(["orders", searchQuery, page, sortOption], getOrdersRequest);

  console.log("useGetOrders result:", { orders, isLoading, isError, refetch });
  return { orders, isLoading, isError, refetch };
};

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
