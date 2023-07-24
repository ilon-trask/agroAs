import { Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useMemo, useState } from "react";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import TableComponent from "src/components/TableComponent";
import { deleteBusProd } from "src/http/requests";
import { Context } from "src/main";
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
  const { business } = useContext(Context);
  const [data, setData] = useState<productProps>({
    area: "",
    cultivationTechnologyId: 0,
    productId: 0,
    techCartId: 0,
    year: 0,
  });
  const [deleteData, setDeleteData] = useState<DeleteProps>({
    func: () => {
      setDeleteData((prev) => ({ ...prev, isOpen: false }));
      // deleteBusProd(business,{})
    },
    isOpen: false,
    text: "спеціалізацію",
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
            cartName: el.tech_cart?.nameCart + " " + el.tech_cart?.year,
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
    res.push({
      bold: true,
      isAll: true,
      product: "ВСЕ РАЗОМ:",
      area: myBusiness?.busProds?.reduce((p, c) => p + c.area, 0),
    });
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
      cartName: string;
      isAll?: boolean;
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
              {original.isAll ? (
                <></>
              ) : original.id.toString().split(" ")[1] == "plus" ? (
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
      { header: "Технологічна карта", accessorKey: "cartName" },
      {
        header: "",
        accessorKey: "productId",
        cell: ({ row: { original } }) => (
          <Box>
            {original.isAll ? (
              <></>
            ) : (
              original.id.toString().split(" ")[1] != "plus" && (
                <MyDeleteIcon
                  onClick={() => {
                    setDeleteData((prev) => ({
                      ...prev,
                      isOpen: true,
                      func: () => {
                        setDeleteData((prev) => ({ ...prev, isOpen: false }));
                        deleteBusProd(business, {
                          id: +original.id!,
                          busId: myBusiness?.id!,
                        });
                      },
                    }));
                  }}
                />
              )
            )}
          </Box>
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
      {deleteData.isOpen ? (
        <DeleteAlert
          func={deleteData.func}
          isOpen={deleteData.isOpen}
          text={deleteData.text}
          setOpen={setDeleteData}
        />
      ) : null}
    </>
  );
}

export default SpecializationBusTable;
