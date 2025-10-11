import { useEffect, useState } from "react";
import type { Column, IUser } from "../@types";
import API from "../axios";
import DataTable from "../components/shared/Datatable";
import Loader from "../components/shared/Loader";
import { useAppSelector, type RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/users`);
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Define table columns
  const columns: Column<IUser>[] = [
    { key: "customer_id", header: "Customer ID", align: "center" },
    { key: "account_holder_name", header: "Name", align: "center" },
    { key: "account_type_account_no", header: "Account No", align: "center" },
    { key: "phone", header: "Phone", align: "center" },
    { key: "email", header: "Email", align: "center" },
    {
      key: "created_date",
      header: "Created At",
      render: (val) => new Date(val).toLocaleDateString(),
      align: "center",
    },
  ];
  if (!user?.isAdmin) return <Navigate to="/" />;
  if (loading) return <Loader />;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <DataTable
        columns={columns}
        data={users ?? []}
        page={page}
        pageSize={pageSize}
        total={users?.length as number}
        onPageChange={(p: number) => setPage(p)}
        tableHeight={"calc(100vh - 130px)"}
      />
    </section>
  );
};

export default Users;
