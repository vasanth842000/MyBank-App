export interface AuthState {
  token: string;
  user: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}   