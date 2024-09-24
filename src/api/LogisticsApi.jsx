import { useQuery, useMutation } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from "sonner";

export const useGetLogistics = (searchState) => {
  // Define the fetch function
  const getLogisticsRequest = async () => {
    // Construct the query parameter string safely
    const searchQuery = searchState?.searchQuery || "";
    const response = await fetch(
      `${API_BASE_URL}/logistics?searchQuery=${encodeURIComponent(searchQuery)}`
    );
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch logistics");
    }

    return result;
  };

  // Use the useQuery hook from React Query
  const {
    data: logistics,
    isLoading,
    isError,
    error,
  } = useQuery(["logistics", searchState], getLogisticsRequest);

  console.log(logistics);

  return { logistics, isLoading, isError, error };
};

export const useCreateLogistics = () => {
  const createLogisticsRequest = async (data) => {
    const response = await fetch(`${API_BASE_URL}/logistics`, {
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

  const { mutateAsync: createLogistics, isLoading: isCreatingLogistics } =
    useMutation(createLogisticsRequest, {
      onSuccess: () => {
        toast.success("Logistics created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createLogistics, isCreatingLogistics };
};

export const useDeleteLogistics = () => {
  const deleteLogisticsRequest = async (id) => {
    const response = await fetch(`${API_BASE_URL}/logistics/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }
    return result;
  };

  const { mutateAsync: deleteLogistics, isLoading: isDeletingLogistics } =
    useMutation(deleteLogisticsRequest, {
      onSuccess: () => {
        toast.success("Logistics deleted");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { deleteLogistics, isDeletingLogistics };
};

export const useUpdateLogistics = () => {
  const updateLogisticsRequest = async ({ id, data }) => {
    const response = await fetch(`${API_BASE_URL}/logistics/${id}`, {
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

  const { mutateAsync: updateLogistics, isLoading: isUpdatingLogistics } =
    useMutation(updateLogisticsRequest, {
      onSuccess: () => {
        toast.success("Logistics updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { updateLogistics, isUpdatingLogistics };
};

const fetchLogisticById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/logistics/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch logistics");
  }

  return response.json();
};

export const useGetLogisticById = (id) => {
  const {
    data: logistic,
    isLoading: isLoadingLogistic,
    refetch,
  } = useQuery(["logistic", id], () => fetchLogisticById(id));
  return { logistic, isLoadingLogistic, refetch };
};
