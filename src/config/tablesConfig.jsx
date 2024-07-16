import React from "react";
import { Link } from "react-router-dom";
export const productTableConfig = {
  columns: {
    images: {
      label: "Image",
      render: (value) => {
        return value[0]
          ? React.createElement("img", {
              src: value[0],
              alt: "Product Image",
              style: { width: "50px", height: "50px", borderRadius: "20px" },
            })
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

export const userTableConfig = {
  columns: {
    fName: { label: "First Name" },
    lName: { label: "Last Name" },
    gender: { label: "Gender" },
    phoneNumber: { label: "Phone Number" },
    email: { label: "Email" },
    DOB: { label: "Date of Birth" },
    // Add more columns as needed
  },
  order: ["fName", "lName", "gender", "phoneNumber", "email", "DOB"], // Order of columns to display
  // You can add additional configuration options as needed
};

export const orderTableConfig = {
  columns: {
    orderId: {
      label: "Order ID",
      render: (value) => <span>{value}</span>,
    },
    totalAmount: {
      label: "Total Amount (KES)",
      render: (value) => <span>KES {value}</span>,
    },
    totalQuantity: {
      label: "Total Quantity",
      render: (value) => <span>{value}</span>,
    },
    status: {
      label: "Status",
      render: (value) => <span>{value}</span>,
    },
    deliverySlot: {
      label: "Delivery Slot",
      render: (value) => <span>{value}</span>,
    },
    branch: {
      label: "Branch",
      render: (value) => <span>{value.name}</span>,
    },
    user: {
      label: "Customer",
      render: (value) => <span>{`${value.fName} ${value.lName}`}</span>,
    },
  },
  order: [
    "orderId",
    "totalAmount",
    "totalQuantity",
    "status",
    "deliverySlot",
    "branch",
    "user",
  ],
};
