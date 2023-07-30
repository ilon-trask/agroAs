import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Table, TableProps } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import TableContent from "./TableContent";
export interface MyTableProps extends TableProps {
  data: any[];
  columns: ColumnDef<any>[];
}
function TableComponent(props: MyTableProps) {
  const { data, columns } = props;
  return (
    <Table size={"sm"} {...props}>
      <TableContent columns={columns} data={data} />
    </Table>
  );
}

export default TableComponent;
