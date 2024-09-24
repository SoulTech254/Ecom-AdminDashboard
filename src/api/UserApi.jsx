import { useQuery } from "react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetAllUsers = (searchState) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("sortOption", searchState.sortOption);

  const getUsersRequest = async () => {
    const response = await fetch(`${BASE_URL}/users?${params.toString()}`);
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "An error occurred");
      error.status = response.status;
      throw error;
    }
    return response.json();
  };

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery(["getUsers", searchState], getUsersRequest);

  // Determine if a 404 error occurred
  const is404Error = isError && error.status === 404;

  return { users, isLoading, is404Error };
};

export const useGetAUser = (id) => {
  const getAUserRequest = async () => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ["getAUser", id],
    getAUserRequest
  );

  return { user, isLoadingUser };
};

export const useGetOrderHistory = (id) => {
  const getOrderHistoryRequest = async () => {
    const response = await fetch(`${BASE_URL}/users/${id}/orders`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: orderHistory, isLoading: isLoadingOrders } = useQuery(
    ["getOrderHistory", id],
    getOrderHistoryRequest
  );

  return { orderHistory, isLoadingOrders };
};

export const useGetBillingInfo = (id) => {
  const getBillingInfoRequest = async () => {
    const response = await fetch(`${BASE_URL}/users/${id}/billing`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: billingInfo, isLoading: isLoadingBilling } = useQuery(
    ["getBillingInfo", id],
    getBillingInfoRequest
  );

  return { billingInfo, isLoadingBilling };
};
