import { useState } from "react";
import DataTable from "../components/shared/Datatable";

const AccountDetails = () => {
  const [transactionList] = useState([
    {
      id: 1,
      transactionDate: "10/11/2025",
      transactionType: "Deposit",
      amount: "$500",
      remarks: "Test transaction",
    },
    {
      id: 2,
      transactionDate: "10/11/2025",
      transactionType: "Withdrawal",
      amount: "$500",
      remarks: "Test transaction",
    },
    {
      id: 3,
      transactionDate: "10/11/2025",
      transactionType: "Credited",
      amount: "$500",
      remarks: "Test transaction",
    },
  ]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const total = transactionList?.length;

  const [userDetails] = useState({
    name: "Muthu A",
    accountNo: "234234234434",
    accountType: "Savings",
    emailId: "muthuaspu@gmail.com",
    phone: "8056452060",
    creationDate: "11/10/2025",
  });

  const columns = [
    { key: "transactionDate", header: "Transaction Date" },
    { key: "transactionType", header: "Transaction Type" },
    { key: "amount", header: "Amount" },
    { key: "remarks", header: "Remarks" },
  ];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total / pageSize)) {
      setPage(newPage);
    }
  };

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
            User Account Details
          </h2>

          {/* User Info Grid */}
          <div className="h-full flex justify-center items-center">
            <div className="bg-white p-6 w-full sm:w-12/12 lg:w-4/4 xl:w-3/3">
              {/* User Details Grid  */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Name */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.name}
                  </span>
                </div>

                {/* Account No. */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Account No.:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.accountNo}
                  </span>
                </div>

                {/* Account Type */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Account Type:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.accountType}
                  </span>
                </div>

                {/* Email ID */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Email ID:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.emailId}
                  </span>
                </div>

                {/* Phone */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.phone}
                  </span>
                </div>

                {/* Creation Date */}
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Creation Date:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.creationDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <DataTable
          columns={columns}
          data={currentPageData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
