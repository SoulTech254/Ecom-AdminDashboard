import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

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

export const useCreateCategory = () => {
  const createCategoryRequest = async (data) => {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const { mutateAsync: createCategory, isLoading: isCreatingCategory } =
    useMutation(createCategoryRequest, {
      onSuccess: () => {
        toast.success("Category created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createCategory, isCreatingCategory };
};

export const useDeleteCategory = () => {
  const deleteCategoryRequest = async (id) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const { mutateAsync: deleteCategory, isLoading: isDeletingCategory } =
    useMutation(deleteCategoryRequest, {
      onSuccess: () => {
        toast.success("Category deleted");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { deleteCategory, isDeletingCategory };
};

export const useUpdateCategory = () => {
  const updateCategoryRequest = async ({ id, data }) => {
    const response = await fetch(`${API_BASE_URL}/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const { mutateAsync: updateCategory, isLoading: isUpdatingCategory } =
    useMutation(updateCategoryRequest, {
      onSuccess: () => {
        toast.success("Category updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateCategory, isUpdatingCategory };
};

const fetchCategoryById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/category/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
};

export const useGetCategoryById = (id) => {
  const {
    data: category,
    isLoading: isLoadingCategory,
    refetch,
  } = useQuery(["category", id], () => fetchCategoryById(id));
  return { category, isLoadingCategory, refetch };
};

export const useGetPaginatedCategories = (searchState) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("sortOption", searchState.sortOption);
  params.set("limit", "10"); // Set limit to 10 items per page

  const getCategoriesRequest = async () => {
    const response = await fetch(
      `${API_BASE_URL}/category/paginated?${params.toString()}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(errorData.message || "An error occurred");
      error.status = response.status;
      throw error;
    }
    console.log(response.json);
    return response.json();
  };

  const { data, isLoading, isError, error } = useQuery(
    ["getCategories", searchState],
    getCategoriesRequest
  );

  // Determine if a 404 error occurred
  const is404Error = isError && error.status === 404;

  return {
    categories: data?.results || [],
    metadata: data?.metadata || { page: 1, totalPages: 1 },
    isLoading,
    is404Error,
  };
};
