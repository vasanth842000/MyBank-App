import { useState, useEffect } from "react";
import type { DataTableProps } from "../../@types";

export default function DataTable<T>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  tableHeight,
}: DataTableProps<T>) {
  const [loading, setLoading] = useState(true);
  const pageCount = Math.ceil(total / pageSize);

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // You can replace this with actual data fetching logic

    return () => clearTimeout(timeout);
  }, []);

  const renderLoader = () => (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full border-t-4 border-blue-600 w-16 h-16"></div>
    </div>
  );

  return (
    <div
      className="shadow-lg rounded-md bg-white"
      style={{ height: tableHeight || "auto" }}
    >
      <table className="table w-full">
        <thead className="bg-blue-100 text-black">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-6 py-5 text-${col.align || "left"} font-medium`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Show loading spinner if data is loading */}
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                {renderLoader()}
              </td>
            </tr>
          ) : data?.length > 0 ? (
            // Render the actual data when loading is false
            data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`p-3 text-${
                      col.align || "center"
                    } text-gray-500`}
                  >
                    {col.render
                      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        col.render((row as any)[col.key], row)
                      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                <p>No transactions found!</p> {/* No data message */}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {data && data?.length > 0 && (
        <div className="flex items-center justify-center my-2 gap-2">
          <div className="text-sm">
            Page {page} of {pageCount}
          </div>
          <div className="space-x-2">
            <button
              className="px-3 py-1 bg-foreground text-background rounded disabled:opacity-50 cursor-pointer"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 bg-foreground text-background rounded disabled:opacity-50 cursor-pointer"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pageCount}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
