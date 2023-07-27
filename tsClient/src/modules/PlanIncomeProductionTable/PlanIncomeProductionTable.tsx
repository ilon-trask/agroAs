import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext } from "react";
import MyDeleteIcon from "src/ui/Icons/MyDeleteIcon";
import MyEditIcon from "src/ui/Icons/MyEditIcon";
import MyTableContainer from "src/ui/MyTableContainer";
import { Iproduction } from "../../../../tRPC serv/models/models";
import { DeleteProps } from "../../components/DeleteAlert";
import { deleteProduction, productSetIsPlan } from "../../http/requests";
import { Context } from "../../main";
import useProductionTypes from "../../shared/hook/useProductionTypes";
import IncomeStore from "../../store/IncomeStore";
import { productionProp } from "../CreateProductService/CreateProduction";

function Item({
  el,
  setOpen,
  setUpdate,
  setDeleteOpen,
  setRes,
  isPlan,
}: {
  el: Iproduction;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen?: Dispatch<SetStateAction<DeleteProps>>;
  setRes?: Dispatch<SetStateAction<productionProp>>;
  isPlan?: boolean;
}) {
  const { income, map } = useContext(Context);
  const myProduct = map.product.find((e) => e.id! == el.productId!);

  const myCart = map.maps.find((e) => e.id! == el.techCartId!);
  const vegetationYear = income.vegetationYear?.find(
    (e) => e.techCartId == el.techCartId
  );
  const planYield = +(
    vegetationYear?.potentialYieldPerHectare! * myCart?.area!
  ).toFixed(2);
  return (
    <Tr key={el.id}>
      {!isPlan && (
        <Td
          onClick={() => {
            if (setOpen) setOpen(true);
            if (setUpdate) setUpdate(true);
            if (setRes)
              setRes({
                prodId: el.id!,
                isPrimary: el.isPrimary,
                productId: el.productId!,
                techCartId: el.techCartId!,
                year: el.year,
              });
          }}
        >
          <MyEditIcon />
        </Td>
      )}
      <Td>{myProduct?.name}</Td>
      <Td>{vegetationYear?.potentialYieldPerHectare}</Td>
      <Td>{myCart?.area}</Td>
      <Td>{planYield}</Td>
      <Td>
        {Math.round(
          ((myCart?.costHectare! * myCart?.area!) / planYield) * 100
        ) / 100}
      </Td>
      <Td>{myCart?.costHectare! * myCart?.area!}</Td>
      {!isPlan && (
        <Td
          onClick={() => {
            //@ts-ignore
            setDeleteOpen({
              isOpen: true,
              func: () => {
                deleteProduction(income, { prodId: el.id! });
                //@ts-ignore
                setDeleteOpen({ isOpen: false });
              },
              text: "виробинцтво",
            });
          }}
        >
          <MyDeleteIcon />
        </Td>
      )}
      <Td>
        <Checkbox
          isChecked={el.isPlan}
          onChange={() =>
            productSetIsPlan(income, { prodId: el.id!, isPlan: !el.isPlan })
          }
        >
          В бізнес-план
        </Checkbox>
      </Td>
    </Tr>
  );
}
function GigItem({
  arr,
  isPrimary,
  year,
  setOpen,
  setUpdate,
  setDeleteOpen,
  setRes,
  isPlan,
}: {
  arr: Iproduction[];
  year: number;
  isPrimary: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen?: Dispatch<SetStateAction<DeleteProps>>;
  setRes?: Dispatch<SetStateAction<productionProp>>;
  isPlan?: boolean;
}) {
  return (
    <>
      <Tr>
        <Td></Td>
        <Td>
          {year + " рік "}
          {useProductionTypes.find((e) => e.value == isPrimary)?.name}
        </Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
        <Td></Td>
      </Tr>
      {arr.map((e) => (
        <Item
          key={e.id}
          el={e}
          setOpen={setOpen}
          setUpdate={setUpdate}
          setDeleteOpen={setDeleteOpen}
          setRes={setRes}
          isPlan={isPlan}
        />
      ))}
    </>
  );
}
function returner(
  isPrimary: boolean,
  income: IncomeStore,
  setOpen?: Dispatch<SetStateAction<boolean>>,
  setUpdate?: Dispatch<SetStateAction<boolean>>,
  setDeleteOpen?: Dispatch<SetStateAction<DeleteProps>>,
  setRes?: Dispatch<SetStateAction<productionProp>>,
  isPlan?: boolean
) {
  const array = new Array(20);
  array.fill(1);
  return array.map((e, ind) => {
    const arr = income.production.filter(
      (e) => e.year == ind && e.isPrimary == isPrimary
    );
    return (
      arr[0] && (
        <GigItem
          arr={arr}
          isPrimary={isPrimary}
          year={ind}
          setOpen={setOpen}
          setUpdate={setUpdate}
          setDeleteOpen={setDeleteOpen}
          setRes={setRes}
          isPlan={isPlan}
        />
      )
    );
  });
}
export function PlanIncomeProductionTableHeadRow({
  isPlan,
}: {
  isPlan?: boolean;
}) {
  return (
    <Tr>
      {!isPlan && <Th></Th>}
      <Th>Продукт </Th>
      <Th>
        Планова <br />
        урожайність (т/га)
      </Th>
      <Th>Площа (га)</Th>
      <Th>
        Плановий <br />
        збір (т)
      </Th>
      <Th>Ціна грн/т</Th>
      <Th>Сума грн</Th>
      {!isPlan && <Th></Th>}
    </Tr>
  );
}
function PlanIncomeProductionTable({
  setOpen,
  setUpdate,
  setDeleteOpen,
  setRes,
  isPlan,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setUpdate?: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen?: Dispatch<SetStateAction<DeleteProps>>;
  setRes?: Dispatch<SetStateAction<productionProp>>;
  isPlan?: boolean;
}) {
  const { income, map } = useContext(Context);

  return (
    <MyTableContainer>
      <Table size={"sm"}>
        <Thead>
          <PlanIncomeProductionTableHeadRow />
        </Thead>
        <Tbody>
          {returner(
            true,
            income,
            setOpen,
            setUpdate,
            setDeleteOpen,
            setRes,
            isPlan
          )}
          {returner(
            false,
            income,
            setOpen,
            setUpdate,
            setDeleteOpen,
            setRes,
            isPlan
          )}
        </Tbody>
      </Table>
    </MyTableContainer>
  );
}

export default observer(PlanIncomeProductionTable);
