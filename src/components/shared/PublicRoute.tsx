// PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector, type RootState } from "../../redux/store";
import type { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  if (token) return <Navigate to="/" replace />;
  return children;
};
