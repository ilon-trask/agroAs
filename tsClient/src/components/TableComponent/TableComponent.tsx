import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ExpandedState,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import TableContent from "./TableContent";
export type TableProps = {
  data: any[];
  columns: ColumnDef<any>[];
};
function TableComponent({ data, columns }: TableProps) {
  return (
    <Table size={"sm"}>
      <TableContent columns={columns} data={data} />
    </Table>
  );
}

export default TableComponent;
