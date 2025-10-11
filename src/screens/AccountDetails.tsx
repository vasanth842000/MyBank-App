import { useEffect, useState } from "react";
import DataTable from "../components/shared/Datatable";
import Loader from "../components/shared/Loader";
import type { Column, ITransaction, IUser } from "../@types";
import API from "../axios";

const AccountDetails = () => {
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(2);
  const total = transactionList?.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get("/users/me");
        const { user, transactions } = response.data;
        setUserDetails(user);
        setTransactionList(transactions || []);
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !userDetails) return <Loader />;

  const columns: Column<ITransaction>[] = [
    { key: "transaction_date", header: "Transaction Date" },
    { key: "transaction_type", header: "Transaction Type" },
    { key: "amount", header: "Amount" },
    { key: "remarks", header: "Remarks" },
  ];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(total / pageSize)) {
      setPage(newPage);
    }
  };

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

          <div className="h-full flex justify-center items-center">
            <div className="bg-white p-6 w-full sm:w-12/12 lg:w-4/4 xl:w-3/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Name:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.account_holder_name}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Account No:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.account_type_account_no}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Account Type:
                  </span>
                  <span className="text-sm text-gray-500">Savings</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Email ID:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.email}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-500">
                    {userDetails.phone}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    Creation Date:
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(userDetails.created_date).toLocaleDateString()}
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
