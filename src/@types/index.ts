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
  tableHeight: string
};