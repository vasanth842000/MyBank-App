// ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector, type RootState } from "../../redux/store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
