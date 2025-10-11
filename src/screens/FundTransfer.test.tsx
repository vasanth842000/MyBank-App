import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import FundTransfer from "./FundTransfer";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("../components/shared/Datatable", () => () => (
  <div data-testid="datatable">Mocked DataTable</div>
));

describe("FundTransfer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Fund Transfer title and form fields", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    expect(
      await screen.findByText(/Fund Transfer/i)
    ).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/Enter account number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter amount/i)).toBeInTheDocument();
  });

  test("shows validation errors for empty inputs when sending OTP", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    const sendOtpBtn = screen.getByRole("button", { name: /Send OTP/i });
    fireEvent.click(sendOtpBtn);

    expect(await screen.findByText(/Enter account number/i)).toBeInTheDocument();
    expect(await screen.findByText(/Enter amount/i)).toBeInTheDocument();
  });

  test("shows account number format validation error", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    const accountInput = screen.getByPlaceholderText(/Enter account number/i);
    fireEvent.change(accountInput, { target: { value: "123" } });

    expect(await screen.findByText(/at least 8 digits/i)).toBeInTheDocument();
  });

  test("sends OTP successfully if fields valid", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    const accountInput = screen.getByPlaceholderText(/Enter account number/i);
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);

    fireEvent.change(accountInput, { target: { value: "12345678" } });
    fireEvent.change(amountInput, { target: { value: "500" } });

    const sendOtpBtn = screen.getByRole("button", { name: /Send OTP/i });
    fireEvent.click(sendOtpBtn);

    await waitFor(() =>
      expect(screen.getByPlaceholderText(/Enter OTP/i)).toBeInTheDocument()
    );
  });

  test("displays error when trying to transfer without OTP", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    // Fill fields
    fireEvent.change(screen.getByPlaceholderText(/Enter account number/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter amount/i), {
      target: { value: "1000" },
    });

    // Send OTP
    fireEvent.click(screen.getByRole("button", { name: /Send OTP/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Enter OTP/i)).toBeInTheDocument();
    });

    // Try to submit without OTP
    const transferBtn = screen.getByRole("button", { name: /Transfer Fund$/i });
    fireEvent.click(transferBtn);

    expect(await screen.findByText(/Enter OTP/i)).toBeInTheDocument();
  });

  test("makes POST request when valid data entered", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<FundTransfer />);

    fireEvent.change(screen.getByPlaceholderText(/Enter account number/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter amount/i), {
      target: { value: "1000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send OTP/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Enter OTP/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter OTP/i), {
      target: { value: "999999" },
    });

    fireEvent.click(screen.getByRole("button", { name: /^Transfer Fund$/i }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3000/fundsTransfer",
        expect.objectContaining({
          account: "12345678",
          amount: "1000",
          otp: "999999",
        })
      );
    });
  });

  test("resets fields when Cancel button clicked", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(<FundTransfer />);

    const accountInput = screen.getByPlaceholderText(/Enter account number/i);
    const amountInput = screen.getByPlaceholderText(/Enter amount/i);
    const cancelBtn = screen.getByRole("button", { name: /Transfer Fund Cancel/i });

    fireEvent.change(accountInput, { target: { value: "12345678" } });
    fireEvent.change(amountInput, { target: { value: "500" } });
    fireEvent.click(cancelBtn);

    expect(accountInput).toHaveValue("");
    expect(amountInput).toHaveValue("");
  });
});
