import { toast } from "sonner";

const BASE_URL = import.meta.env.API_BASE_URL

export const useCreateProduct = () => {
  const createProductRequest = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  const { mutateAsync: createProduct, isLoading: isCreatingProduct } =
    useMutation(
      createProductRequest
        .then(() => {
          toast.success("Product created successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        })
    );
  return { createProduct, isCreatingProduct };
};
