import { AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DeleteAlert, { DeleteProps } from "src/components/DeleteAlert";
import TableComponent from "src/components/TableComponent";
import { deleteBusProd } from "src/http/requests";
import { Context } from "src/main";
import BusHeading from "src/ui/BusHeading";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyPlusIcon from "src/ui/Icons/MyPlusIcon";
import MyViewIcon from "src/ui/Icons/MyViewIcon";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { TEHMAP_ROUTER } from "src/utils/consts";
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
      cartName: string;
      cartId: number;
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
                        price: myBusProd?.price!,
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
      {
        header: "Технологічна карта",
        accessorKey: "cartName",
        cell: ({ row: { original } }) => {
          return (
            <Box>
              {original.isAll ? (
                <></>
              ) : (
                original.id.toString().split(" ")[1] != "plus" && (
                  <Link to={TEHMAP_ROUTER + `/${original.cartId}`}>
                    <MyViewIcon /> {original.cartName}
                  </Link>
                )
              )}
            </Box>
          );
        },
      },
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
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Спеціалізація</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MyTableContainer>
          <TableComponent columns={specColumns} data={specData} />
        </MyTableContainer>
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
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(SpecializationBusTable);
