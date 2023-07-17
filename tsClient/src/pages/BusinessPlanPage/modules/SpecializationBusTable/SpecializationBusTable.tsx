import { Box, Heading, Table, Td, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import TableContent from "src/components/TableComponent/TableContent";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import SecondOpen from "./SecondOpen";

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
  for (let i = start; i <= end; i++) {
    specData.push(
      ...(myBusiness?.busProds
        .filter((el) => el.year == i - start)
        .map((el) => ({
          id: el.id,
          year: i,
          product: el.product?.name,
          culture: el.product?.culture?.name,
          technology: el.cultivationTechnology?.name,
          area: el.area,
        })) || []),
      { id: "plus", year: i }
    );
  }

  const specColumns = useMemo<
    ColumnDef<{
      id: number | "plus";
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
              {original.id == "plus" ? (
                <MyPlusIcon
                  onClick={() => {
                    setOpen(true);
                    setOpenData({ year: original.year - start, ownId: 0 });
                    console.log("plus" + (original.year - start));
                  }}
                />
              ) : (
                <MyEditIcon
                  onClick={() => {
                    setOpen(true);
                    setOpenData({
                      year: original.year - start,
                      ownId: original.id as number,
                    });
                  }}
                />
              )}
            </Box>
          );
        },
      },
      {
        header: "Рік",
        accessorKey: "year",
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
          <Box>{original.id != "plus" && <MyDeleteIcon />}</Box>
        ),
      },
    ],
    []
  );
  const [open, setOpen] = useState(false);
  const [openData, setOpenData] = useState({ year: 0, ownId: 0 });
  const data = [{ ownId: 8, productId: 1, year: 0, tech: [] }];
  return (
    <>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Спеціалізація
      </Heading>
      <Table size={"sm"}>
        <TableContent columns={specColumns} data={specData} />
      </Table>
      {(openData.year || openData.year == 0) && (
        <SecondOpen
          open={open}
          setOpen={setOpen}
          data={data}
          setData={() => {}}
          ownId={openData.ownId || Math.max(...data.map((el) => el.ownId))}
          year={openData.year}
        />
      )}
    </>
  );
}

export default SpecializationBusTable;
