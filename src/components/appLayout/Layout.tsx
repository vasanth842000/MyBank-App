import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { AppSidebar } from "../appSidebar/AppSidebar";
const Layout: FC = () => {
  return (
    <section className="w-full flex">
      <AppSidebar />
      <main className="flex-1">
        <header className="h-12 flex items-center border-b">
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
