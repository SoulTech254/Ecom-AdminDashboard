import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrders } from "@/api/OrdersApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar from "@/components/SearchBar";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { CirclePlus, File } from "lucide-react";

const OrdersPage = () => {
  const [ordersData, setOrdersData] = useState({
    metadata: {
      page: 1,
      limit: 10,
      totalCount: 0,
      totalPages: 1,
    },
    results: [],
  });

  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    sortOption: "createdAt", // Example: Default sort option
  });

  const { orders, isLoading: isLoadingOrders } = useGetOrders(searchState);

  useEffect(() => {
    if (!isLoadingOrders && orders) {
      setOrdersData(orders);
    }
  }, [isLoadingOrders, orders]);

  const setSearchQuery = (searchFormData) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const setSortOption = (sortOption) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between mb-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <p className="text-lg">Dashboard</p>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <p className="text-lg">Orders</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder={"Search Orders"}
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
          />
          <div className="flex justify-center h-fit items-center w-fit rounded-full border p-2">
            {/* Replace with appropriate icon */}
            <CirclePlus size={25} />
          </div>
        </div>
      </div>
      <div className="flex justify-between mx-1 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-fit flex items-center border rounded-sm px-3 py-1 gap-2 cursor-pointer">
            <File size={25} />
            Export
          </div>
          <SortOptionDropdown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>
        <Link to="/orders/new-order">
          <div className="cursor-pointer flex rounded-sm w-fit border px-4 py-2 items-center gap-2">
            {/* Replace with appropriate icon */}
            <CirclePlus size={18} />
            <span>Add a new Order</span>
          </div>
        </Link>
      </div>

      {isLoadingOrders ? (
        <p>Loading...</p>
      ) : (
        <>
          {ordersData.results.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Time Placed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Delivery Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Fulfillment Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {ordersData.results.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.user.fName} {order.user.lName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.delivery.deliverySlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.delivery.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/orders/${order._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <PaginationSelector
            page={ordersData.metadata.page}
            pages={ordersData.metadata.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default OrdersPage;
