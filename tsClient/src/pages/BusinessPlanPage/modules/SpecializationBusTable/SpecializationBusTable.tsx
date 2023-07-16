import { Box, Heading, Table, Td, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";
import TableContent from "src/components/TableComponent/TableContent";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";

function SpecializationBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  start: number;
  end: number;
}) {
  const specData = [];
  for (let i = start; i < end; i++) {
    specData.push(
      {
        id: "year",
        product: i,
      },
      ...(myBusiness?.busProds
        .filter((el) => el.year == i - start)
        .map((el) => ({
          id: el.id + "" + i,
          product: el.product?.name,
          culture: el.product?.culture?.name,
          technology: el.cultivationTechnology?.name,
          area: el.area,
        })) || []),
      { id: "plus", year: i - start }
    );
  }

  const specColumns = useMemo<
    ColumnDef<{
      id: number | "year" | "plus";
      product: string | number;
      culture: string | number;
      technology: string;
      area: number;
      year: number;
    }>[]
  >(
    () => [
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => {
          return (
            <Box>
              {original.id == "year" ? null : original.id == "plus" ? (
                <MyPlusIcon
                  onClick={() => {
                    console.log("plus" + original.year);
                  }}
                />
              ) : (
                <MyEditIcon />
              )}
            </Box>
          );
        },
      },
      { header: "Продукт", accessorKey: "product" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Технологія", accessorKey: "technology" },
      { header: "Площа", accessorKey: "area" },
      { header: "Технологічна карта", accessorKey: "id" },
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => (
          <Box>
            {original.id != "year" && original.id != "plus" && <MyDeleteIcon />}
          </Box>
        ),
      },
    ],
    []
  );
  return (
    <>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Спеціалізація
      </Heading>
      <Table size={"sm"}>
        <TableContent columns={specColumns} data={specData} />
        {specData.length < 5 && (
          <Tr>
            <Td colSpan={7}>
              <MyPlusIcon />
            </Td>
          </Tr>
        )}
        {/* <Tr>
          <Td colSpan={4}>Корисна площа</Td>
          <Td>{specData?.reduce((p, c) => p + +c.area || 0, 0)}</Td>
          <Td colSpan={2}></Td>
        </Tr> */}
      </Table>
    </>
  );
}

export default SpecializationBusTable;
