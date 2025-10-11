export type Column<T> = {
  key: any;
  header: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: T) => React.ReactNode;
};


export type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export interface IUser {
  _id:string;
  account_holder_name: string;
  account_type_account_no: string;
  balance: number;
  phone: string;
  email: string;
  customer_id: string;
  created_date: string;
  updated_date: string;
  createdAt: string;
  updatedAt: string;
  password: string; // hashed password
  isAdmin: boolean;
}

export interface LoginData {
  customer_id: string;
  password: string;
}