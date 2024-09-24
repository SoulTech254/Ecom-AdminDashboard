import React, { useState } from "react";
import { useCreateCategory } from "@/api/CategoryApi";
import AddCategoryForm from "@/forms/AddCategoryForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AddCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createCategory, isCreatingCategory } = useCreateCategory();

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await createCategory(formData);
      alert("Category added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-2 m-2 border rounded-md">
        <h1 className="text-lg font-medium">Add New Category</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <p className="text-sm font-medium text-primary">Dashboard</p>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">
                <p className="text-sm font-medium text-primary">
                  Categories List
                </p>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <p className="text-sm">Add New Category</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <AddCategoryForm
        onSubmit={handleFormSubmit}
        isLoading={isLoading || isCreatingCategory}
        action="Add Category"
      />
    </div>
  );
};

export default AddCategoryPage;
