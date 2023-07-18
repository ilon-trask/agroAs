import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Table } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
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
