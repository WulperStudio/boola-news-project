import React from "react"
import useStyles from "./Table.styles"

export interface DataRow {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export interface HeadCell {
  id: string;
  disablePadding: boolean;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc"

export interface TableHeadProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
}

export type TableProps = {
  headCells: HeadCell[],
  dataRows: any,
  formatRows: FormatRow[],
}
export type FormatRow = {
  key: string,
  align?: "left" | "right" | "center",
  chip?: boolean,
  image?: string,
}

export function descendingComparator(a: any[], b: any[], orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator(order: Order, orderBy: any) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

export function stableSort(array: any[], comparator: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index])
  stabilizedThis.sort((a: any[], b: any[]) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el: any[]) => el[0])
}

