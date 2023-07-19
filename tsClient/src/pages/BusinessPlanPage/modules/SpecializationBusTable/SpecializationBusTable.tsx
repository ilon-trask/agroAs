import { Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import TableComponent from "src/components/TableComponent";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyHeading from "src/ui/MyHeading";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import SecondOpen, { productProps } from "./SecondOpen";

function SpecializationBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  start: number;
  end: number;
}) {
  const [data, setData] = useState<productProps>({
    area: "",
    cultivationTechnologyId: 0,
    productId: 0,
    techCartId: 0,
    year: 0,
  });

  const specData = useMemo(() => {
    const res = [];
    for (let i = start; i <= end; i++) {
      const busProd = myBusiness?.busProds.filter((el) => el.year == i - start);
      if (busProd)
        res.push(
          ...(busProd.map((el) => ({
            id: el.id,
            year: i,
            product: el.product?.name,
            culture: el.product?.culture?.name,
            technology: el.cultivationTechnology?.name,
            area: el.area,
            cartId: el.techCartId,
            productId: el.productId,
          })) || []),
          {
            id: i + " plus",
            year: i,
            product: "Разом:",
            area: busProd?.reduce((p, c) => p + c.area, 0),
            bold: true,
          }
        );
    }
    return res;
  }, [myBusiness?.busProds, myBusiness?.busProds.length]);

  const specColumns = useMemo<
    ColumnDef<{
      id: number | "plus";
      product: string | number;
      culture: string | number;
      technology: string;
      area: number;
      year: number;
      // productId?: number;
    }>[]
  >(
    () => [
      {
        header: "",
        accessorKey: "id",
        cell: ({ row: { original } }) => {
          return (
            <Box>
              {original.id.toString().split(" ")[1] == "plus" ? (
                <MyPlusIcon
                  onClick={() => {
                    setOpen(true);
                    setData({
                      area: "",
                      cultivationTechnologyId: 0,
                      productId: 0,
                      techCartId: 0,
                      year: original.year - start,
                    });
                  }}
                />
              ) : (
                <MyEditIcon
                  onClick={() => {
                    setOpen(true);
                    setData(() => {
                      const myBusProd = myBusiness?.busProds.find(
                        (el) => el.id == original.id
                      );
                      return {
                        area: myBusProd?.area! + "",
                        cultivationTechnologyId:
                          myBusProd?.cultivationTechnologyId!,
                        ownId: myBusProd?.id!,
                        productId: myBusProd?.productId!,
                        techCartId: myBusProd?.techCartId!,
                        year: myBusProd?.year!,
                      };
                    });
                  }}
                />
              )}
            </Box>
          );
        },
      },
      { header: "Рік", accessorKey: "year" },
      { header: "Продукт", accessorKey: "product" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Технологія", accessorKey: "technology" },
      { header: "Площа", accessorKey: "area" },
      { header: "Технологічна карта", accessorKey: "cartId" },
      {
        header: "",
        accessorKey: "productId",
        cell: ({ row: { original } }) => (
          <Box>{original.id != "plus" && <MyDeleteIcon />}</Box>
        ),
      },
    ],
    [myBusiness?.busProds]
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <MyHeading>Спеціалізація</MyHeading>
      <TableComponent columns={specColumns} data={specData} />
      {open ? (
        <SecondOpen
          open={open}
          setOpen={setOpen}
          data={data}
          setData={setData}
        />
      ) : null}
    </>
  );
}

export default SpecializationBusTable;
