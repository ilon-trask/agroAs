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
import { Link } from "react-router-dom";
import MyAddIcon from "src/ui/Icons/MyAddIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
export type TableColumnsType = { header: string; accessorKey: string }[];
function TableComponent({
  setOpen,
  data,
  columns,
  needIcons = true,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any[];
  columns: TableColumnsType;
  needIcons?: boolean;
}) {
  const [newData, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(JSON.parse(JSON.stringify(data)));
  }, [data.length]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    columns: columns,
    data: newData,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Table size={"sm"}>
      <Thead>
        {getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {needIcons && (
              <Th>
                <Tooltip label="Додати рядок">
                  <Box>
                    <MyAddIcon
                      onClick={() => {
                        setOpen(true);
                        setData((prev) => {
                          return prev;
                        });
                      }}
                    />
                  </Box>
                </Tooltip>
              </Th>
            )}
            {headerGroup.headers.map((header) => (
              <Th key={header.id} colSpan={header.colSpan}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Th>
            ))}
            {needIcons && <Th></Th>}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {getRowModel().rows.map((row) => {
          return (
            <Tr key={row.id}>
              {needIcons && (
                <Td>
                  <Tooltip label="Редагувати рядок">
                    <Box>
                      <MyEditIcon onClick={() => setOpen(true)} />
                    </Box>
                  </Tooltip>
                </Td>
              )}
              {row.getVisibleCells().map((cell) => {
                if (cell.column.columnDef.header?.toString() == "№ партії") {
                  // if (cell != "№ партії") {
                  return (
                    <Td key={cell.id}>
                      {/* <Link to={PARCEL_ROUT + "/" + cell.getValue()}> */}
                      <Box minW={"max-content"}>
                        <MyViewIcon />
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Box>
                      {/* </Link> */}
                    </Td>
                  );
                } else if (
                  cell.column.columnDef.header?.toString() ==
                  "Кількість піддонів"
                ) {
                  return (
                    <Td key={cell.id}>
                      <Box minW={"max-content"}>
                        <MyViewIcon color={"black"} />
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Box>
                    </Td>
                  );
                } else {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                }
              })}
              {needIcons && (
                <Td>
                  <Tooltip label="Видалити рядок">
                    <Box>
                      <MyDeleteIcon />
                    </Box>
                  </Tooltip>
                </Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default TableComponent;
