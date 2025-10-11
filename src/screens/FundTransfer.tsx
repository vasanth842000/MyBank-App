import React, { useEffect, useState } from "react";
import { Mail, Smartphone, KeyRound, User2, IndianRupee } from "lucide-react";
import axios from "axios";
import DataTable from "../components/shared/Datatable";

const FundTransfer = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpMethod, setOtpMethod] = useState("sms");
  const [errors, setErrors] = useState<{ account?: string; amount?: string; otp?: string }>({});
  const [fundsData, setFundsData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:3000/fundsTransfer");
      setFundsData(res?.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAccount(value);
      if (value && value.length < 8) {
        setErrors((prev) => ({ ...prev, account: "Account number must be at least 8 digits" }));
      } else {
        setErrors((prev) => ({ ...prev, account: "" }));
      }
    } else {
      setErrors((prev) => ({ ...prev, account: "Account number must contain only digits" }));
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setErrors((prev) => ({ ...prev, amount: "" }));
    } else {
      setErrors((prev) => ({ ...prev, amount: "Amount must contain only digits" }));
    }
  };

  const handleSendOtp = () => {
    let newErrors: typeof errors = {};
    if (!account) {
      newErrors.account = "Enter account number";
    } else if (account.length < 8) {
      newErrors.account = "Account number must be at least 8 digits";
    }
    if (!amount) {
      newErrors.amount = "Enter amount";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setOtpSent(true);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};
    if (!account) newErrors.account = "Enter account number";
    else if (account.length < 8) newErrors.account = "Account number must be at least 8 digits";
    if (!amount) newErrors.amount = "Enter amount";
    if (!otp) newErrors.otp = "Enter OTP";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:3000/fundsTransfer", {
          account,
          amount,
          otp,
          method: otpMethod,
        });
        alert("Fund transferred successfully!");
        handleCancel();
        fetchData();
      } catch (err: any) {
        alert(err?.response?.data?.message || "Fund transfer failed!");
      }
    }
  };

  const handleCancel = () => {
    setAmount("");
    setAccount("");
    setOtp("");
    setOtpSent(false);
    setOtpMethod("sms");
    setErrors({});
  };

  const columns = [
    { key: "account", header: "Account No", align: "left" },
    { key: "amount", header: "Amount", align: "left" },
    { key: "method", header: "Method", align: "left" },
  ];

  const total = fundsData.length;
  const currentPageData = fundsData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <section className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border border-blue-200">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
          Fund Transfer
        </h2>

        <form onSubmit={handleTransfer} className="space-y-6">
          <div>
            <label className="mb-2 font-semibold text-blue-600 flex items-center gap-2">
              <User2 className="w-5 h-5" />
              Account Number
            </label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={account}
              onChange={handleAccountChange}
              required
              placeholder="Enter account number"
            />
            {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account}</p>}
          </div>

          {/* Amount Field */}
          <div>
            <label className="mb-2 font-semibold text-blue-600 flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Amount
            </label>
            <input
              type="text"
              className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={amount}
              onChange={handleAmountChange}
              required
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* OTP Send Section */}
          <div>
            <label className="block mb-2 font-semibold text-blue-600">Send OTP via</label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="otpMethod"
                  value="sms"
                  checked={otpMethod === "sms"}
                  onChange={() => setOtpMethod("sms")}
                  className="accent-blue-600"
                />
                <Smartphone className="w-5 h-5 text-blue-500" />
                SMS
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  checked={otpMethod === "email"}
                  onChange={() => setOtpMethod("email")}
                  className="accent-blue-600"
                />
                <Mail className="w-5 h-5 text-blue-500" />
                Email
              </label>

              <button
                type="button"
                className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition ml-4 font-semibold ${
                  otpSent ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={handleSendOtp}
                disabled={otpSent}
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP Input */}
          {otpSent && (
            <div>
              <label className="mb-2 font-semibold text-blue-600 flex items-center gap-2">
                <KeyRound className="w-5 h-5" />
                Enter OTP
              </label>
              <input
                type="text"
                className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-6 justify-center mt-8">
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition ${
                !otpSent ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={!otpSent}
            >
              Transfer Fund
            </button>
            <button
              type="button"
              className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow hover:scale-105 transition"
              onClick={handleCancel}
            >
              Transfer Fund Cancel
            </button>
          </div>
        </form>
      </section>

      {fundsData && fundsData.length > 0 && (
        <div className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Fund Transfers History:</h3>
          <DataTable
            columns={columns}
            data={currentPageData}
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            tableHeight="350px"
          />
        </div>
      )}
    </>
  );
};

export default FundTransfer;
