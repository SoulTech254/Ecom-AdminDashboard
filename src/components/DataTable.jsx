import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router DOM

const DataTable = ({ data, config, page }) => {
  // Check if data is available
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const { columns, order } = config;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {/* Render table headers */}
            {order.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {columns[header].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Render table rows */}
          {data.map((product, index) => (
            <tr key={index}>
              {/* For each product, render table cells based on headers */}
              {order.map((header) => (
                <td key={header} className="px-6 py-4 whitespace-nowrap">
                  {/* Render cell content based on header */}
                  {columns[header].render
                    ? columns[header].render(product[header])
                    : product[header]}
                </td>
              ))}
              {/* Make the entire row clickable with link to product detail page */}
              <td className="px-6 py-4 whitespace-nowrap">
                <Link
                  to={`/${page}/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
