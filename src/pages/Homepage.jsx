import React, { useState } from 'react';
import AddProductForm from '@/forms/AddProductForm';
import { useCreateProduct } from '@/api/ProductApi';

const AddProductPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {createProduct, isCreatingProduct} = useCreateProduct();
  const [defaultValues, setDefaultValues] = useState({
    productName: '',
    price: 0,
    SKU: '',
    description: '',
    measurementUnit: '',
    size: 0,
    brand: '',
    category: {
      level_1_name: '',
      level_2_name: '',
      level_3_name: ''
    }
  });
  const [img, setImg] = useState([]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Perform API call or any other logic to handle form submission
      console.log(formData);

      createProduct(formData);

      // Handle success response
      alert('Product added successfully');
    } catch (error) {
      // Handle error response
      console.error(error);
      alert('Failed to add product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <AddProductForm
        onSubmit={handleFormSubmit}
        action="Add Product"
        isLoading={isLoading}
        defaultValues={defaultValues}
        img={img}
      />
    </div>
  );
};

export default AddProductPage;
