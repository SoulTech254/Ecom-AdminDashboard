import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetCategories = () => {
  const fetchCategoriesRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/category/`, {
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

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery("categories", fetchCategoriesRequest);
  return { categories, isLoading, isError };
};
