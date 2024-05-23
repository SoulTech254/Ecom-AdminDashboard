import { toast } from "sonner";
import { useMutation } from "react-query";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateProduct = () => {
  const createProductRequest = async (data) => {
    const response = await fetch(`${BASE_URL}/products`, {
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

  const { mutateAsync: createProduct, isLoading: isCreatingProduct } =
    useMutation(createProductRequest, {
      onSuccess: () => {
        toast.success("Product created");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return { createProduct, isCreatingProduct };
};
