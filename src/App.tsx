import { useSelector } from "react-redux";
import "./App.css";
import type { RootState } from "./redux/store";

function App() {
  const { token, user } = useSelector((state: RootState) => state.auth);
  console.log("token", token, "user", user);

  return <></>;
}

export default App;
