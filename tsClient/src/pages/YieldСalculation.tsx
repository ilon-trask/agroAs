import {
  Button,
  Checkbox,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useEditable,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import CreateYieldCalc from "../modules/CreateYIeldCalculation";
import { GOODS_ROUTER, INCOME_ROUTER } from "../utils/consts";
import { IyieldCalculation } from "../../../tRPC serv/models/models";
import useVegetationYears, {
  VegetationYearsType,
} from "../shared/hook/useVegetationYears";
import { createVegetationYear, getVegetationYear } from "../http/requests";
import MyHeading from "src/ui/MyHeading";

export const plantsHeads: Record<string, string[]> = {
  "Суниця садова": [
    "Кількість розеток",
    "Кількість квітконосів",
    "Кількість ягід",
    "Вага ягоди",
  ],

  Малина: [
    "Кількість пагонів",
    "Кількість суцвіть",
    "Кількість ягід",
    "Вага ягоди",
  ],
  Лохина: [
    "Кількість пагонів",
    "Кількість суцвіть",
    "Кількість ягід",
    "Вага ягоди",
  ],
};
interface IvegetationRes {
  id?: number;
  data: {
    year: VegetationYearsType;
    vegetationCoeff: number | "";
    technologyCoeff: number | "";
    seedlingsCoeff: number | "";
  }[];
  techCartId?: number;
  yieldPlantId?: number;
}
function convertToCSV(data: IyieldCalculation[]) {
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((obj) => Object.values(obj).join(","));
  return `${headers}\n${rows.join("\n")}`;
}
function downloadCSV(data: IyieldCalculation[]) {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function YieldСalculation() {
  const { busId, busProdId } = useParams();
  const { income, map, business } = useContext(Context);
  const busProd = business.businessPlan
    .find((el) => el.id == busId)
    ?.busProds.find((el) => el.id == busProdId);
  const myYield = income.yieldPlant?.find(
    (el) => el.productId == busProd?.productId
  );
  const myCalc = income.yieldCalc?.find(
    (el) => el?.yieldPlantId == myYield?.id
  );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    getVegetationYear(income);
  }, []);
  const yieldPerRoll =
    (myCalc?.numberSocket! *
      myCalc?.numberFlower! *
      myCalc?.numberFruit! *
      myCalc?.fruitWeight!) /
    1000;
  const [res, setRes] = useState<IvegetationRes>({
    data: income.vegetationYear.filter((el) => el.busProdId == busProd?.id),
  });
  console.log(
    income.vegetationYear.filter((el) => el.yieldPlantId == myYield?.id!)
  );

  function isChecked(name: string) {
    let akk: boolean = false;
    res.data.forEach((el) => {
      if (el.year == name) {
        akk = true;
      }
    });
    return akk;
  }
  function changeCoeff(
    event: string,
    coeff: "vegetationCoeff" | "technologyCoeff" | "seedlingsCoeff",
    name: string
  ) {
    setRes((prev) => ({
      ...prev,
      data: prev.data.map((e) => {
        if (e.year == name) {
          e[coeff] = event as any;
        }
        return e;
      }),
    }));
  }
  const carts = map.businessCarts.filter(
    (el) =>
      el.cultureId == myYield?.cultureId &&
      el.cultivationTechnologyId == myYield?.cultivationTechnologyId
  );
  return (
    <Container maxW="container.lg" mt={"30px"}>
      <Link to={GOODS_ROUTER}>
        <Button>Повернутиця до культур</Button>
      </Link>
      <MyHeading>Розрахунок урожайності:</MyHeading>
      <MyHeading>Культура: "{myYield?.culture.name}"</MyHeading>
      <MyHeading>
        Технологія: "{busProd?.cultivationTechnology?.name}"
      </MyHeading>
      <MyHeading>Строк посадки: "{myYield?.landingPeriod}"</MyHeading>
      <MyHeading>Продукт:"{busProd?.product?.name}"</MyHeading>
      <Table size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>Культура</Th>
            <Th>Густота</Th>
            <Th>Урожайність 1га</Th>
            <Th>Урожайність куща</Th>
            {
              //@ts-ignore
              plantsHeads[myYield?.culture.name]?.map((el) => (
                <Th key={el}>{el}</Th>
              ))
            }
            <Th>Коефіцієнт</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{myYield?.culture.name}</Td>
            <Td>{myCalc?.numberPlantsPerHectare || 0}</Td>
            <Td>{myYield?.yieldPerHectare || 0}</Td>
            <Td>{myYield?.yieldPerRoll || 0}</Td>
            <Td>{myCalc?.numberSocket || 0}</Td>
            <Td>{myCalc?.numberFlower || 0}</Td>
            <Td>{myCalc?.numberFruit || 0}</Td>
            <Td>{myCalc?.fruitWeight || 0}</Td>
            <Td>{}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Button
        mt={"15px"}
        ml={"30px"}
        onClick={() => {
          setOpen(true);
        }}
      >
        Внести/редагувати дані
      </Button>
      {/* <Button onClick={() => downloadCSV([myCalc!])}>csv</Button> */}
      <CreateYieldCalc
        open={open}
        setOpen={setOpen}
        id={myYield?.id!}
        myCalc={myCalc}
      />
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Рік вегетації</Th>
            <Th>
              Коефіцієнт
              <br /> вегетації
            </Th>
            <Th>
              Коефіцієнт
              <br /> технології
            </Th>
            <Th>
              Коефіцієнт
              <br /> Саджанців
            </Th>
            <Th>
              Узагальнюючий
              <br />
              коефіцієнт
            </Th>
            <Th>Технологічні карти</Th>
          </Tr>
        </Thead>
        <Tbody>
          {useVegetationYears.map((el) => {
            const checked: boolean = isChecked(el.name);
            const value = res.data.find((e) => e.year == el.name);
            const cart = carts.filter((e) => e.year == el.name);
            return (
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={checked}
                    onChange={() => {
                      if (checked) {
                        setRes((prev) => ({
                          ...prev,
                          data: prev.data.filter((e) => e.year != el.name),
                        }));
                      } else {
                        setRes((prev) => ({
                          ...prev,
                          data: [
                            ...prev.data,
                            {
                              year: el.name,
                              seedlingsCoeff: 0,
                              technologyCoeff: 0,
                              vegetationCoeff: 0,
                            },
                          ],
                        }));
                      }
                    }}
                  />
                </Th>
                <Th>{el.name}</Th>
                <Th>
                  <Editable
                    value={(value?.vegetationCoeff ?? "") + ""}
                    onChange={(e) => changeCoeff(e, "vegetationCoeff", el.name)}
                  >
                    <EditablePreview h={"15px"} w={"50px"} />
                    <EditableInput
                      maxW={"fit-content"}
                      h={"15px"}
                      w={"50px"}
                      borderRadius={3}
                    />
                  </Editable>
                </Th>
                <Th>
                  <Editable
                    value={(value?.technologyCoeff ?? "") + ""}
                    onChange={(e) => changeCoeff(e, "technologyCoeff", el.name)}
                  >
                    <EditablePreview h={"15px"} w={"50px"} />
                    <EditableInput
                      maxW={"fit-content"}
                      h={"15px"}
                      w={"50px"}
                      borderRadius={3}
                    />
                  </Editable>
                </Th>
                <Th>
                  <Editable
                    value={(value?.seedlingsCoeff ?? "") + ""}
                    onChange={(e) => changeCoeff(e, "seedlingsCoeff", el.name)}
                  >
                    <EditablePreview h={"15px"} w={"50px"} />
                    <EditableInput
                      maxW={"fit-content"}
                      h={"15px"}
                      w={"50px"}
                      borderRadius={3}
                    />
                  </Editable>
                </Th>
                <Th>
                  <Text>
                    {checked &&
                      Math.round(
                        +value?.seedlingsCoeff! *
                          +value?.technologyCoeff! *
                          +value?.vegetationCoeff! *
                          100
                      ) / 100}
                  </Text>
                </Th>
                <Th>{cart[0]?.nameCart}</Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        onClick={() => {
          createVegetationYear(income, {
            cultivationTechnologyId: myYield?.cultivationTechnologyId!,
            cultureId: myYield?.cultureId!,
            yieldPlantId: myYield?.id!,
            busProdId: busProd?.id!,
            data: res.data.map((el) => ({
              ...el,
              techCartId: busProd?.techCartId,
              seedlingsCoeff: +el.seedlingsCoeff,
              technologyCoeff: +el.technologyCoeff,
              vegetationCoeff: +el.vegetationCoeff,
            })),
          });
        }}
      >
        Зберегти
      </Button>
    </Container>
  );
}

export default observer(YieldСalculation);
