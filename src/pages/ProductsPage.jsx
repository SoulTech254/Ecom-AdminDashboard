import { useGetAllProducts } from "@/api/ProductApi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import DataTable from "@/components/DataTable";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar from "@/components/SearchBar";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { productTableConfig } from "@/config/tablesConfig";
import { CirclePlus, File, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [results, setResults] = useState({
    metadata: {
      page: 1,
      totalPages: 1,
    },
    results: [],
  });

  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    sortOption: "bestMatch",
  });

  const { products, isLoading: isLoadingProducts } =
    useGetAllProducts(searchState);

  useEffect(() => {
    if (!isLoadingProducts && products) {
      setResults(products);
    }
  }, [isLoadingProducts, products]);

  //Alter Search Query
  const setSearchQuery = (searchFormData) => {
    console.log(searchFormData);
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
              <p className="text-lg">Products</p>
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder={"Search Products"}
            searchQuery={searchState.searchQuery}
            onSubmit={setSearchQuery}
          />
          <div className="flex justify-center h-fit items-center w-fit rounded-full border p-2">
            <UserRound size={25} />
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
        +{" "}
        <Link to="/products/new-product">
          <div className="cursor-pointer flex rounded-sm w-fit border px-4 py-2 items-center gap-2">
            <CirclePlus /> <span>Add a new Product</span>+ -{" "}
          </div>
        </Link>
      </div>

      {isLoadingProducts ? (
        <p>Loading...</p>
      ) : (
        <>
          {results.results.length > 0 && (
            <DataTable config={productTableConfig} data={results.results} />
          )}
          <PaginationSelector
            page={results.metadata.page}
            pages={results.metadata.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
