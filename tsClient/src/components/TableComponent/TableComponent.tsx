import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Table, TableProps as TabProps } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import TableContent from "./TableContent";
export interface TableProps extends TabProps {
  data: any[];
  columns: ColumnDef<any>[];
}
function TableComponent(props: TableProps) {
  const { data, columns } = props;
  return (
    <Table size={"sm"} {...props}>
      <TableContent columns={columns} data={data} />
    </Table>
  );
}

export default TableComponent;
