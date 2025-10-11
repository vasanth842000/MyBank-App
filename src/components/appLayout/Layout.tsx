import { type FC } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "../appSidebar/AppSidebar";
import { useAppSelector, type RootState } from "../../redux/store";
const Layout: FC = () => {
  const { token, user } = useAppSelector((state: RootState) => state.auth);
  const userInitial = user?.account_holder_name
    ? user.account_holder_name.charAt(0).toUpperCase()
    : "";
  // Redirect to login if not authenticated
  if (!token) return <Navigate to={"/login"} />;
  return (
    <section className="w-full flex">
      <AppSidebar />
      <main className="flex-1">
        <header className="h-12 flex items-center justify-between border-b pl-2 pr-4">
          {/* <CircleArrowLeft /> */}
          <h3 className="font-semibold text-gray-800 text-sm">
            Welcome{" "}
            <span className="text-blue-600 font-bold text-lg">
              {user?.account_holder_name}
            </span>
          </h3>
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
  );
};

export default Layout;
