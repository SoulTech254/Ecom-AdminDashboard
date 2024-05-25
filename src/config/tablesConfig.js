import React from "react";
export const productTableConfig = {
  columns: {
    images: {
      label: "Image",
      render: (value) => {
        return value[0]
          ? React.createElement("img", { src: value[0], alt: "Product Image" })
          : null;
      },
    },
    SKU: {
      label: "SKU",
    },
    productName: {
      label: "Product Name",
    },
    price: {
      label: "Price",
    },
    createdAt: {
      label: "Created At",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    updatedAt: {
      label: "Updated At",
      render: (value) => new Date(value).toLocaleDateString(),
    },
  },
  order: ["images", "SKU", "productName", "price", "createdAt", "updatedAt"],
};
