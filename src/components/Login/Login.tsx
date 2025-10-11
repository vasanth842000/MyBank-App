import { useState } from "react";

function Login() {
  const [formsData, setFormsData] = useState({
    customerID: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log(formsData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormsData({ customerID: "", password: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 py-10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Login to Your Account
        </h2>
        <div>
          <label
            htmlFor="customerID"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Customer ID
          </label>
          <input
            id="customerID"
            name="customerID"
            type="text"
            value={formsData.customerID}
            onChange={handleChange}
            placeholder="Enter your ID"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formsData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;