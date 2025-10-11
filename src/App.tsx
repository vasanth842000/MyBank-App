import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./components/appLayout/Layout";
import Beneficiary from "./screens/Beneficiary";
import AccountDetails from "./screens/AccountDetails";
import Loader from "./components/shared/Loader";
import NotFound from "./NotFound";
import Users from "./screens/Users";
import FundTransfer from "./screens/FundTransfer";

function App() {
  const { token, user } = useSelector((state: RootState) => state.auth);
  console.log("token", token, "user", user);

  return (
    <BrowserRouter>
      <section className="max-w-[1800px] mx-auto">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />} path="/">
              <Route element={<AccountDetails />} index />
              <Route element={<Beneficiary />} path="/beneficiaries" />
              <Route element={<Users />} path="/users" />
              <Route element={<FundTransfer />} path="/fund-transfer" />
            </Route>
            <Route element={<NotFound />} path="*" />
          </Routes>
        </Suspense>
      </section>
    </BrowserRouter>
  );
}

export default App;
