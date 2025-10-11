import React, { useState } from "react";
import { Mail, Smartphone, KeyRound, User2, IndianRupee } from "lucide-react";

const FundTransfer = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpMethod, setOtpMethod] = useState("sms");

  const handleSendOtp = () => {
    setOtpSent(true);
    console.log(`OTP sent via ${otpMethod.toUpperCase()}`);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Transferring ${amount} to account ${account} with OTP ${otp}`);
  };

  const handleCancel = () => {
    setAmount("");
    setAccount("");
    setOtp("");
    setOtpSent(false);
    setOtpMethod("sms");
  };

  return (
    <section className="max-w-lg mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border border-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">
        Fund Transfer
      </h2>
      <form onSubmit={handleTransfer} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-blue-600 flex items-center gap-2">
            <User2 className="w-5 h-5" />
            Account Number
          </label>
          <input
            type="text"
            className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            placeholder="Enter account number"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-blue-600 flex items-center gap-2">
            <IndianRupee className="w-5 h-5" />
            Amount
          </label>
          <input
            type="number"
            className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-blue-600">
            Send OTP via
          </label>
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
        {otpSent && (
          <div>
            <label className="block mb-2 font-semibold text-blue-600 flex items-center gap-2">
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
          </div>
        )}
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
  );
};

export default FundTransfer;
