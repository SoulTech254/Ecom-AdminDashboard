import { useGetProduct, useUpdateProduct } from "@/api/ProductApi";
import AddProductForm from "@/forms/AddProductForm";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UpdateProductPage = () => {
  const { updateProduct, isUpdatingProduct } = useUpdateProduct();
  const { id } = useParams();
  console.log(id);
  const { product, isGettingProduct } = useGetProduct(id);
  const productData = product ? product.product : null;
  const defaultValues = productData
    ? {
        productName: productData.productName,
        price: Number(productData.price),
        SKU: productData.SKU,
        description: productData.description,
        measurementUnit: productData.measurementUnit,
        size: Number(productData.size),
        brand: productData.brand,
        category: {
          level_1_name: productData.category.level_1_name,
          level_2_name: productData.category.level_2_name,
          level_3_name: productData.category.level_3_name,
        },
      }
    : {};
  const handleUpdateSubmit = async (data) => {
    console.log(data);
    updateProduct({id, data});
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <p className="text-lg">Dashboard</p>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">
              <p className="text-lg">Products</p>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <p className="text-lg">Update</p>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {!isGettingProduct && (
        <AddProductForm
          onSubmit={handleUpdateSubmit}
          defaultValues={defaultValues}
          isLoading={isUpdatingProduct}
          img={productData?.images}
          action="Update"
        />
      )}
    </div>
  );
};

export default UpdateProductPage;
