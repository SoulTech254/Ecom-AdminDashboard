import { useQuery } from "react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetAllUsers = (searchState) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("sortOption", searchState.sortOption);

  const getUsersRequest = async () => {
    const response = await fetch(`${BASE_URL}/users?${params.toString()}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    ["getUsers", searchState],
    getUsersRequest
  );

  return { users, isLoadingUsers };
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
}