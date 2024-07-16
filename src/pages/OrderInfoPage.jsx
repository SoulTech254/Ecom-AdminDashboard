// components/OrderInfoPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserOrders } from "@/api/OrdersApi"; // Adjust path as per your project structure

const OrderInfoPage = () => {
  const { orderId } = useParams(); // Fetch orderId from route params
  console.log(orderId);
  const { data: order, isLoading, isError } = useGetUserOrders(orderId);
  console.log(order);

  console.log(order);

  if (isLoading) return <p>Loading...</p>;

  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>Order ID: {order.orderId}</p>
      <p>
        Customer Name: {order.user.fName} {order.user.lName}
      </p>
      <p>Time Placed: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Delivery Slot: {order.delivery.deliverySlot}</p>
      <p>Fulfillment Type: {order.delivery.method}</p>
      <p>Status: {order.status}</p>

      <h3>Products</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product._id}>
            {product.id.productName} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>

      <h3>Delivery Address</h3>
      <p>City: {order.delivery.address.city}</p>
      <p>Building: {order.delivery.address.building}</p>
      <p>Contact Number: {order.delivery.address.contactNumber}</p>
      <p>Instructions: {order.delivery.address.instructions}</p>
    </div>
  );
};

export default OrderInfoPage;
