import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetUserOrders,
  useUpdateOrderStatus,
  useUpdateLogistics,
} from "@/api/OrdersApi"; // Adjust path as per your project structure
import { Bike, Car, Truck } from "lucide-react";
import { useGetLogistics } from "@/api/LogisticsApi";

const iconMap = {
  Truck: <Truck />,
  Van: <Car />,
  Bike: <Bike />,
};

const OrderInfoPage = () => {
  const { orderId } = useParams(); // Fetch orderId from route params

  // Local state for order and its status
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("pending");
  const [selectedLogistic, setSelectedLogistic] = useState("");

  const {
    data: fetchedOrder,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetUserOrders(orderId);

  const { updateOrderStatus, isUpdatingOrderStatus } = useUpdateOrderStatus();
  const {
    logistics,
    isLoading: logisticsLoading,
    isError: logisticsError,
  } = useGetLogistics();
  const { updateLogistics, isUpdatingLogistics } = useUpdateLogistics(); // New hook for updating logistics

  useEffect(() => {
    if (fetchedOrder) {
      setOrder(fetchedOrder);
      setStatus(fetchedOrder.status);
      setSelectedLogistic(fetchedOrder.delivery.method);
    }
  }, [fetchedOrder]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleLogisticChange = (event) => {
    setSelectedLogistic(event.target.value);
  };

  const handleAssignDriver = () => {
    updateLogistics(
      { orderId, newLogisticId: selectedLogistic },
      {
        onSuccess: (updatedOrder) => {
          setOrder(updatedOrder); // Update the local order state with the new order data
        },
        onError: (error) => {
          // Handle error
        },
      }
    );
  };

  const handleUpdateStatus = () => {
    updateOrderStatus(
      { orderId, newStatus: status },
      {
        onSuccess: (updatedOrder) => {
          setOrder(updatedOrder); // Update the local order state with the new order data
        },
        onError: (error) => {
          // Handle error
        },
      }
    );
  };

  if (orderLoading)
    return (
      <p className="text-center text-gray-500">Loading order details...</p>
    );
  if (orderError || !order)
    return <p className="text-center text-red-500">Order not found</p>;

  const selectedLogisticData = logistics.find(
    (logistic) => logistic._id === selectedLogistic
  );

  console.log(logistics);

  return (
    <div className="p-6 mx-auto grid gap-4 grid-cols-2">
      {/* Order Details Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Order Details</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p>
              <span className="font-medium">Order ID:</span>{" "}
              <span className="uppercase">{order.orderId}</span>
            </p>
            <p>
              <span className="font-medium">Time Placed:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Delivery Slot:</span>{" "}
              {new Date(order.delivery.deliverySlot).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="capitalize">{order.status}</span>
            </p>
            <div className="mt-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Update Status
              </label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="onRoute">On Route</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="readyForPickup">Ready For Pickup</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={isUpdatingOrderStatus}
                className={`mt-4 px-4 py-2 font-semibold rounded-md shadow-sm ${
                  isUpdatingOrderStatus
                    ? "bg-gray-400"
                    : "bg-primary hover:opacity-95"
                } text-white`}
              >
                {isUpdatingOrderStatus ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Customer Info</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p>
              <span className="font-medium">Name:</span> {order.user.fName}{" "}
              {order.user.lName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {order.user.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Payment</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {order.payment.transactionID}
            </p>
            <p>
              <span className="font-medium">Payment Amount:</span> $
              {order.payment.paymentAmount.toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              <span className="capitalize">{order.payment.paymentStatus}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Logistics Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Logistics</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <label
              htmlFor="logistics"
              className="block text-sm font-medium text-gray-700"
            >
              Choose Logistics
            </label>
            {logisticsLoading ? (
              <p className="text-center">Loading logistics...</p>
            ) : logisticsError ? (
              <p>Error loading logistics</p>
            ) : (
              <div>
                <select
                  id="logistics"
                  value={selectedLogistic}
                  onChange={handleLogisticChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {order.logistics ? (
                    <option value={order.logistics._id}>
                      {order.logistics.driver_name}
                    </option>
                  ) : (
                    <option value="">Select a Driver</option>
                  )}
                  {logistics.map((logistic) => (
                    <option key={logistic._id} value={logistic._id}>
                      {logistic.driver_name} {iconMap[logistic.vehicle_type]}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAssignDriver}
                  disabled={isUpdatingLogistics}
                  className={`mt-4 px-4 py-2 font-semibold rounded-md shadow-sm ${
                    isUpdatingLogistics
                      ? "bg-gray-400"
                      : "bg-primary hover:opacity-95"
                  } text-white`}
                >
                  {isUpdatingLogistics ? "Assigning..." : "Assign Driver"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Driver Details Section */}
      {order.logistics && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
          <h3 className="text-xl font-semibold mb-2">Driver Details</h3>
          <div className="flex items-center gap-4">
            <img
              src={order.logistics.driver_photo}
              alt={order.logistics.driver_name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">
                {order.logistics.driver_name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {iconMap[order.logistics.vehicle_type]}
                <span className="ml-2">{order.logistics.vehicle_type}</span>
              </div>
              <p className="mt-1">
                <span className="font-medium">Vehicle Registration:</span>{" "}
                {order.logistics.vehicle_registration_number}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Products</h3>
        <div className="flex flex-col gap-4">
          {order.products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p>
                <span className="font-medium">Product:</span>{" "}
                {product.id.productName}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {product.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
        <h3 className="text-xl font-semibold mb-2">Delivery Address</h3>
        <div className="flex flex-col gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <p>
              <span className="font-medium">Building:</span>{" "}
              {order.delivery.address.address.building}
            </p>
            <p>
              <span className="font-medium">City:</span>{" "}
              {order.delivery.address.address.city}
            </p>
            <p>
              <span className="font-medium">Contact Number:</span>{" "}
              {order.delivery.address.address.contactNumber}
            </p>
            <p>
              <span className="font-medium">Instructions:</span>{" "}
              {order.delivery.address.address.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfoPage;
