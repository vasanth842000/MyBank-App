import type { IUser } from "../../../@types";

export interface AuthState {
  token: string;
  user: IUser | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}   