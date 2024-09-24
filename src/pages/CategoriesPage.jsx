import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DataTable from "@/components/DataTable";
import PaginationSelector from "@/components/PaginationSelector"; // Import PaginationSelector
import SearchBar from "@/components/SearchBar";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { categoriesTableConfig } from "@/config/tablesConfig";
import { CirclePlus, Folder } from "lucide-react";
import { useGetPaginatedCategories } from "@/api/CategoryApi";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
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

  const { categories, metadata, isLoading, isError } =
    useGetPaginatedCategories(searchState);

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        // Handle error case
        setResults({
          metadata: { page: 1, totalPages: 1 },
          results: [],
        });
      } else if (categories) {
        console.log(categories);
        // Update state with the fetched categories
        setResults(categories);
      }
    }
  }, [isLoading, categories, isError]);

  const handleSearchQueryChange = (searchFormData) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
      page: 1, // Reset to first page on new search
    }));
  };

  const handleSortOptionChange = (sortOption) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1, // Reset to first page on sort change
    }));
  };

  const handlePageChange = (page) => {
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
                <p className="text-lg">Categories</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder={"Search Categories"}
            searchQuery={searchState.searchQuery}
            onSubmit={handleSearchQueryChange}
          />
        </div>
      </div>
      <div className="flex justify-between mx-1 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-fit flex items-center border rounded-sm px-3 py-1 gap-2 cursor-pointer">
            <Folder size={25} />
            Export
          </div>
          <SortOptionDropdown
            onChange={handleSortOptionChange}
            sortOption={searchState.sortOption}
          />
        </div>

        <Link to="/categories/new">
          <div className="w-fit flex items-center border rounded-sm px-3 py-1 gap-2 cursor-pointer">
            <CirclePlus size={25} />
            Add New Category
          </div>
        </Link>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>No categories found</p>
      ) : (
        <>
          {results.length > 0 ? (
            <>
              <DataTable
                config={categoriesTableConfig} // Ensure this config matches the new data structure
                data={results}
                page="categories"
              />
              <PaginationSelector
                page={metadata.page}
                pages={metadata.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p>No categories found</p>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
