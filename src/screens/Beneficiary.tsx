import { useState } from "react";
import DataTable from "../components/shared/Datatable";
import { Edit2Icon, LucideTrash2 } from "lucide-react";

const Beneficiary = () => {
  const [transactionList] = useState([
    {
      id: 1,
      name: "Muthu A",
      accountNo: "342423423423423",
      remarks: "Test transaction",
    },
    {
      id: 2,
      name: "Ashwin",
      accountNo: "342423423423423",
      remarks: "Test transaction",
    },
    {
      id: 3,
      name: "Vasanth",
      accountNo: "342423423423423",
      remarks: "Test transaction",
    },
  ]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const total = transactionList.length;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total / pageSize)) {
      setPage(newPage);
    }
  };

  const columns = [
    { key: "name", header: "Name" },
    { key: "accountNo", header: "Account Number" },
    { key: "remarks", header: "Remarks" },
    {
      key: "",
      header: "Actions",
      render: (row: any) => (
        <div className={`flex gap-2 text-center`}>
          <button onClick={() => handleEdit(row)}>
            <Edit2Icon className="text-blue-500" />
          </button>
          <button onClick={() => handleDelete(row)}>
            <LucideTrash2 className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  // Slice data to show only the data for the current page
  const currentPageData = transactionList.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="h-full flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full sm:w-11/12 lg:w-12/12 xl:w-12/12">
        {/* User Details Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Beneficiaries
          </h2>
        </div>

        {/* Transaction Table */}
        <DataTable
          columns={columns}
          data={currentPageData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
          tableHeight={"calc(100vh - 210px)"}
        />
      </div>
    </div>
  );
};

export default Beneficiary;
