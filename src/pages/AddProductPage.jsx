import { useCreateProduct } from "@/api/ProductApi";
import AddProductForm from "@/forms/AddProductForm";

const AddProductPage = () => {
  const { createProduct, isCreatingProduct } = useCreateProduct();
  return (
    <div >
      <AddProductForm
        onSubmit={createProduct}
        isLoading={isCreatingProduct}
        action="Create"
      />
    </div>
  );
};

export default AddProductPage;
