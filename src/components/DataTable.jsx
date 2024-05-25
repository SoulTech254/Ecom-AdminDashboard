const DataTable = ({ data, config }) => {
  // Check if data is available
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const { columns, order } = config;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Render table headers */}
            {order.map((header) => (
              <th key={header}>{columns[header].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render table rows */}
          {data.map((product, index) => (
            <tr key={index}>
              {/* For each product, render table cells based on headers */}
              {order.map((header) => (
                <td key={header}>
                  {/* Render cell content based on header */}
                  {columns[header].render ? (
                    columns[header].render(product[header])
                  ) : (
                    product[header]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
