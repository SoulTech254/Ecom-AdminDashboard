import { toast } from "sonner";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

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

export const useSearchProducts = () => {
  const searchProductsRequest = async (searchQuery) => {
    const response = await fetch(
      `${BASE_URL}/products?searchQuery=${searchQuery}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { mutateAsync: searchProducts, isLoading: isLoadingSearchProducts } =
    useMutation(searchProductsRequest);
  return { searchProducts, isLoadingSearchProducts };
};

export const useGetAllProducts = (searchState) => {
  console.log(searchState);
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("sortOption", searchState.sortOption);
  const getProductsRequest = async () => {
    const response = await fetch(`${BASE_URL}/products?${params.toString()}`, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { data: products, isLoading: isLoadingProducts } = useQuery(
    ["getProducts", searchState],
    getProductsRequest
  );

  return { products, isLoadingProducts };
};

export const useUpdateProduct = () => {
  const updateProductRequest = async ({ id, data }) => {
    console.log(data);
    const response = await fetch(`${BASE_URL}/products/${id}`, {
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

  const { mutateAsync: updateProduct, isLoading: isUpdatingProduct } =
    useMutation(updateProductRequest, {
      onSuccess: () => {
        toast.success("Product updated");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return { updateProduct, isUpdatingProduct };
};

export const useGetProduct = () => {
  const getProductsRequest = async (id) => {
    // This is line 115
    const response = await fetch(`${BASE_URL}/products/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const { id } = useParams();

  const { data: product, isLoading: isGettingProduct } = useQuery(
    ["getProduct", id],
    () => getProductsRequest(id)
  );

  return { product, isGettingProduct };
};
