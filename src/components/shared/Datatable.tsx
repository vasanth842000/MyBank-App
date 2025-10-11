import type { DataTableProps } from "@/@types";

export default function DataTable<T>({
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
}: DataTableProps<T>) {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <div className="border rounded-md">
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`p-2 text-${
                  col.align || "left"
                } font-medium text-gray-600`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t last:border-b">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`p-2 text-${col.align || "left"}`}
                >
                  {col.render
                    ? col.render((row as any)[col.key], row)
                    : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center my-2 gap-2">
        <div className="text-sm">
          Page {page} of {pageCount}
        </div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-foreground text-background rounded disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 bg-foreground text-background rounded disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
