import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, type RootState } from "../redux/store";
import { setCredentials } from "../redux/features/auth/authSlice";
import type { IUser } from "../@types";
import API from "../axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    customer_id: yup
      .string()
      .required("Customer ID is required")
      .min(8, "Customer ID must be at least 8 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

// 2️⃣ Define form type
type LoginFormInputs = {
  customer_id: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state: RootState) => state.auth);

  // 3️⃣ Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  // 4️⃣ Submit handler
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await API.post<{ token: string; user: IUser }>(
        "/users/login",
        data
      );

      const { token, user } = response.data;

      dispatch(setCredentials({ token, user }));
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };
  if (token) <Navigate to="/" />;
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">My Bank Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="customer_id"
              className="block text-sm font-medium mb-1"
            >
              Customer ID
            </label>
            <input
              type="text"
              id="customer_id"
              placeholder="CUST0001"
              {...register("customer_id")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.customer_id && (
              <p className="text-red-600 text-sm mt-1">
                {errors.customer_id.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password")}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
