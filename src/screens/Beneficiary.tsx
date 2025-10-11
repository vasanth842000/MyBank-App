import { useState, useCallback, useMemo } from "react";
import DataTable from "../components/shared/Datatable";
import { Edit2Icon, LucideTrash2, User2 } from "lucide-react";
import { BeneficiariesList } from "./constants";
import Toast from "../components/shared/Toast";

const Beneficiary = () => {
  const [transactionList, setTransactionList] = useState(BeneficiariesList);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [type, setType] = useState("add");
  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );

  const total = transactionList.length;

  // Memoize current page data to prevent recalculations on every render
  const currentPageData = useMemo(() => {
    return transactionList.slice((page - 1) * pageSize, page * pageSize);
  }, [page, pageSize, transactionList]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= Math.ceil(total / pageSize)) {
        setPage(newPage);
      }
    },
    [pageSize, total]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = useCallback((row: any) => {
    setName(row.name);
    setEditId(row.id);
    setType("Edit");
    setAccountNumber(row.accountNo);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (row: any) => {
      const updatedTransactionList = transactionList.filter(
        (transaction) => transaction.id !== row.id
      );
      setTransactionList(updatedTransactionList);
    },
    [transactionList]
  );

  const reset = useCallback(() => {
    setIsOpen(false);
    setName("");
    setAccountNumber("");
  }, []);

  const handleAddBeneficiary = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault(); // Prevent default form submission behavior
      // Generate a new ID by adding 1 to the highest existing ID (assuming IDs are sequential)
      const newId =
        Math.max(...transactionList.map((transaction) => transaction.id)) + 1;

      // Create the new beneficiary object
      const newBeneficiary = {
        id: newId,
        name,
        accountNo: accountNumber,
        remarks: "New Beneficiary", // Default remarks, can be modified later
      };

      // Add the new beneficiary to the transaction list
      setTransactionList((prevList) => [...prevList, newBeneficiary]);
      setToast({ message: "Beneficiary Added Successfully", type });
      // Reset form and close modal
      reset();
    },
    [accountNumber, name, reset, transactionList]
  );

  const handleEditBeneficiary = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault(); // Prevent default form submission behavior
      // Update the specific transaction by ID
      const updatedTransactionList = transactionList.map((transaction) =>
        transaction.id === editId
          ? { ...transaction, name, accountNo: accountNumber } // Update the name and account number
          : transaction
      );

      // Update the transaction list with the new data
      setTransactionList(updatedTransactionList);
      setToast({ message: "Beneficiary Details Updated Successfully", type });
      // Reset form and close modal
      reset();
    },
    [accountNumber, editId, name, reset, transactionList]
  );

  const columns = [
    { key: "name", header: "Name" },
    { key: "accountNo", header: "Account Number" },
    { key: "remarks", header: "Remarks" },
    {
      key: "",
      header: "Actions",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (value: any, row: any) => (
        <div className={`flex gap-2 text-center justify-center`}>
          <button onClick={() => handleEdit(row)}>
            <Edit2Icon className="text-blue-500 cursor-pointer" />
          </button>
          <button onClick={() => handleDelete(row)}>
            <LucideTrash2 className="text-red-500 cursor-pointer" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full sm:w-11/12 lg:w-12/12 xl:w-12/12">
        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Beneficiaries
          </h2>
          <button
            onClick={() => {
              setType("Add");
              setIsOpen(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 rounded-xl font-bold shadow hover:scale-105 transition cursor-pointer"
          >
            Add Beneficiary
          </button>
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

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="max-w-lg w-full p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border border-blue-200">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
              {`${type} Beneficiary Details`}
            </h2>
            <form
              onSubmit={(e) => {
                if (type === "Add") handleAddBeneficiary(e);
                else handleEditBeneficiary(e);
              }}
              className="space-y-6"
            >
              {/* Name Field */}
              <div>
                <label className=" mb-2 font-semibold text-blue-600 flex items-center gap-2">
                  <User2 className="w-5 h-5" />
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter beneficiary name"
                />
              </div>

              {/* Account Number Field */}
              <div>
                <label className=" mb-2 font-semibold text-blue-600 flex items-center gap-2">
                  <Edit2Icon className="w-5 h-5" />
                  Account Number
                </label>
                <input
                  type="text"
                  className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                  placeholder="Enter account number"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-6 justify-center mt-8">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          type={toast.type as any}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Beneficiary;
