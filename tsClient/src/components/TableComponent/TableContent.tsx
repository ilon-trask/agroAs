import { Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { TableProps } from "./TableComponent";

function TableContent({ data, columns }: TableProps) {
  const [newData, setData] = useState<any[]>(data);
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(data)));
  }, [data, data.length]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns: columns,
    data: newData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Thead>
        {getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td
                  whiteSpace={"pre-wrap"}
                  key={cell.id}
                  fontWeight={
                    row.original.bold == true
                      ? "bold"
                      : row.original.extraBold == true
                      ? "extrabold"
                      : "normal"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </>
  );
}

export default TableContent;
