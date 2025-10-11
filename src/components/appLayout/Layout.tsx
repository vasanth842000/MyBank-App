import { type FC } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { AppSidebar } from "../appSidebar/AppSidebar";
import { useAppSelector, type RootState } from "../../redux/store";
const Layout: FC = () => {
  const { token } = useAppSelector((state: RootState) => state.auth);

  // Redirect to login if not authenticated
  if (!token) return <Navigate to={"/login"} />;
  return (
    <section className="w-full flex">
      <AppSidebar />
      <main className="flex-1">
        <header className="h-12 flex items-center border-b pl-2">
          <CircleArrowLeft />
        </header>
        <section className="h-[calc(100vh-48px)] w-full overflow-y-auto p-4">
          <Outlet />
        </section>
      </main>
    </section>
  );
};

export default Layout;
