import { type FC } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { AppSidebar } from "../appSidebar/AppSidebar";
import { useAppSelector, type RootState } from "../../redux/store";
import { ProtectedRoute } from "../shared/ProtectedRoute";
const Layout: FC = () => {
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  const userInitial = user?.account_holder_name
    ? user.account_holder_name.charAt(0).toUpperCase()
    : "";
  // Redirect to login if not authenticated
  if (!token) return <Navigate to={"/login"} />;
  return (
    <ProtectedRoute>
      <section className="w-full flex">
        <AppSidebar />
        <main className="flex-1">
          <header className="h-12 flex items-center justify-between border-b pl-2 pr-4">
            <CircleArrowLeft />
            {userInitial && (
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {userInitial}
              </div>
            )}
          </header>
          <section className="h-[calc(100vh-48px)] w-full overflow-y-auto p-4">
            <Outlet />
          </section>
        </main>
      </section>
    </ProtectedRoute>
  );
};

export default Layout;
