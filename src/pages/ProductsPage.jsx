import { useGetAllProducts } from "@/api/ProductApi";
import DataTable from "@/components/DataTable";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar from "@/components/SearchBar";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { productTableConfig } from "@/config/tablesConfig";
import React, { useEffect, useState } from "react";

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
      <SearchBar
        placeholder={"Search Products"}
        searchQuery={searchState.searchQuery}
        onSubmit={setSearchQuery}
      />
      <SortOptionDropdown
        onChange={(value) => setSortOption(value)}
        sortOption={searchState.sortOption}
      />

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
