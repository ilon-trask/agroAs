import { Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import TableComponent from "src/components/TableComponent";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyHeading from "src/ui/MyHeading";
import {
  resBusinessPlan,
  resBusProd,
} from "../../../../../../tRPC serv/controllers/BusinessService";
import SecondOpen, { productIds } from "./SecondOpen";

function getDataFromBusiness(myBusiness: resBusinessPlan): productIds {
  const result: {
    ownId: number;
    year: number;
    productId: number;
    tech: {
      cultivationTechnologyId: number;
      techCartId: number;
      area: string | number;
    }[];
  }[] = [];
  myBusiness.busProds.forEach((item) => {
    const {
      id,
      businessPlanId,
      year,
      productId,
      cultivationTechnologyId,
      techCartId,
      area,
    } = item;
    // Створюємо ідентифікатор групи за допомогою productId та id
    const groupId = `${productId}-${year}`;

    // Знаходимо чи вже є група з таким ідентифікатором у result
    const index = result.findIndex((item) => item.ownId === groupId);

    // Якщо групи з таким ідентифікатором не існує, додаємо нову групу в result
    if (index === -1) {
      result.push({
        ownId: groupId,
        year: year || 0,
        productId,
        tech: [
          {
            cultivationTechnologyId,
            techCartId: techCartId || 0,
            area: area.toString(),
          },
        ],
      });
    } else {
      // Якщо група з таким ідентифікатором вже є, додаємо tech відповідного продукту
      result[index].tech.push({
        cultivationTechnologyId,
        techCartId: techCartId || 0,
        area: area.toString(),
      });
    }
  });

  return result;
}

function SpecializationBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  start: number;
  end: number;
}) {
  const [data, setData] = useState<productIds>(
    getDataFromBusiness(myBusiness!)
  );
  console.log(getDataFromBusiness(myBusiness));

  const specData = [];
  for (let i = start; i <= end; i++) {
    specData.push(
      ...(myBusiness?.busProds
        .filter((el) => el.year == i - start)
        .map((el) => ({
          id: `${el.productId}-${el.year - start}`,
          year: i,
          product: el.product?.name,
          culture: el.product?.culture?.name,
          technology: el.cultivationTechnology?.name,
          area: el.area,
          cartId: el.techCartId,
          productId: el.productId,
        })) || []),
      { id: i + " plus", year: i }
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
                    setData((prev) => {
                      setOpenData(() => {
                        return {
                          ownId: original.year,
                        };
                      });
                      if (
                        !prev.find((el) => el.ownId == original.year)?.ownId
                      ) {
                        return [
                          ...prev,
                          {
                            ownId: original.year!,
                            productId: 0,
                            tech: [],
                            year: original.year - start,
                          },
                        ];
                      } else {
                        return prev;
                      }
                    });
                  }}
                />
              ) : (
                <MyEditIcon
                  onClick={() => {
                    setOpen(true);
                    setOpenData({
                      ownId: `${original.productId}-${original.year - start}`,
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
      { header: "Технологічна карта", accessorKey: "cartId" },
      {
        header: "",
        accessorKey: "productId",
        cell: ({ row: { original } }) => (
          <Box>{original.id != "plus" && <MyDeleteIcon />}</Box>
        ),
      },
    ],
    []
  );
  const [open, setOpen] = useState(false);
  const [openData, setOpenData] = useState({ ownId: 0 });

  return (
    <>
      <MyHeading>Спеціалізація</MyHeading>
      <TableComponent columns={specColumns} data={specData} />
      {openData.ownId ? (
        <SecondOpen
          open={open}
          setOpen={setOpen}
          data={data}
          setData={setData}
          ownId={openData.ownId}
        />
      ) : null}
    </>
  );
}

export default SpecializationBusTable;
