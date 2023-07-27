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
import { IyieldCalculation } from "../../../tRPC serv/models/models";
import useVegetationYears, {
  VegetationYearsType,
} from "../shared/hook/useVegetationYears";
import {
  createVegetationYear,
  getBusinessPlans,
  getVegetationYear,
} from "../http/requests";
import MyHeading from "src/ui/MyHeading";
import { BUSINESSpLAN_ROUTER } from "src/utils/consts";

export const plantsHeads: Record<string, string[]> = {
  "Суниця садова": [
    "Кількість розеток (шт)",
    "Кількість квітконосів (шт)",
    "Кількість ягід (шт)",
    "Вага ягоди (грам)",
  ],

  Малина: [
    "Кількість пагонів (шт)",
    "Кількість суцвіть (шт)",
    "Кількість ягід (шт)",
    "Вага ягоди (грам)",
  ],
  Лохина: [
    "Кількість пагонів (шт)",
    "Кількість суцвіть (шт)",
    "Кількість ягід (шт)",
    "Вага ягоди (грам)",
  ],
};
interface IvegetationRes {
  id?: number;
  data: {
    year: VegetationYearsType;
    vegetationCoeff: number | "";
    technologyCoeff: number | "";
    seedlingsCoeff: number | "";
    numberPlantsPerHectare: number | "";
    numberPerRoll: number | "";
    techCartId: number | null;
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
    ?.busProds.find((el) => el.id == +busProdId!);
  console.log(income.vegetationYear);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    getVegetationYear(income);
    getBusinessPlans(map, business);
  }, []);

  const vegetationYear = income.vegetationYear.filter(
    (el) => el.busProdId == busProd?.id
  );
  const [res, setRes] = useState<IvegetationRes>({
    data: income.vegetationYear.filter((el) => el.busProdId == busProd?.id),
  });
  console.log(vegetationYear);
  useEffect(() => {
    setRes({ data: vegetationYear });
  }, [JSON.stringify(vegetationYear)]);

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
    coeff:
      | "vegetationCoeff"
      | "technologyCoeff"
      | "seedlingsCoeff"
      | "numberPerRoll"
      | "numberPlantsPerHectare",
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
      el.cultureId == busProd?.product?.cultureId &&
      el.cultivationTechnologyId == busProd?.cultivationTechnologyId
  );
  return (
    <Container maxW="container.lg" mt={"30px"}>
      <Link to={BUSINESSpLAN_ROUTER + "/" + busProd?.businessPlanId}>
        <Button>Повернутиця до бізнес-плану</Button>
      </Link>
      <MyHeading>Розрахунок урожайності:</MyHeading>
      <MyHeading>Культура: "{busProd?.product?.culture?.name}"</MyHeading>
      <MyHeading>
        Технологія: "{busProd?.cultivationTechnology?.name}"
      </MyHeading>
      <MyHeading>Продукт:"{busProd?.product?.name}"</MyHeading>
      {/* <Table size={"sm"} mt={5}>
        <Thead>
          <Tr>
            <Th>Культура</Th>
            <Th>Густота (шт/га)</Th>
            <Th>Урожайність 1га (т)</Th>
            <Th>Урожайність куща (кг)</Th>
            {
              //@ts-ignore
              plantsHeads[busProd?.product?.culture.name]?.map((el) => (
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
      </Button> */}
      {/* <Button onClick={() => downloadCSV([myCalc!])}>csv</Button> */}
      {/* <CreateYieldCalc
        open={open}
        setOpen={setOpen}
        id={myYield?.id!}
        myCalc={myCalc}
      /> */}
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>
              Назва
              <br /> карти
            </Th>
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
            <Th>
              Густота <br /> насаджень
            </Th>
            <Th>Урожайність куща</Th>
            <Th>
              Потенційна <br /> урожайність (т)
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {useVegetationYears.map((el) => {
            const checked: boolean = isChecked(el.name);
            const value = res.data.find((e) => e.year == el.name);
            const cart = carts.find((e) => e.year == el.name);
            return (
              <Tr>
                <Th>{cart?.nameCart}</Th>
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
                              numberPerRoll: 0,
                              numberPlantsPerHectare: 0,
                              techCartId: cart?.id!,
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
                      type={"number"}
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
                      type={"number"}
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
                      type={"number"}
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
                <Th>
                  <Editable
                    value={(value?.numberPlantsPerHectare ?? "") + ""}
                    onChange={(e) =>
                      changeCoeff(e, "numberPlantsPerHectare", el.name)
                    }
                  >
                    <EditablePreview h={"15px"} w={"50px"} />
                    <EditableInput
                      type={"number"}
                      maxW={"fit-content"}
                      h={"15px"}
                      w={"50px"}
                      borderRadius={3}
                    />
                  </Editable>
                </Th>
                <Th>
                  <Editable
                    value={(value?.numberPerRoll ?? "") + ""}
                    onChange={(e) => changeCoeff(e, "numberPerRoll", el.name)}
                  >
                    <EditablePreview h={"15px"} w={"50px"} />
                    <EditableInput
                      type={"number"}
                      maxW={"fit-content"}
                      h={"15px"}
                      w={"50px"}
                      borderRadius={3}
                    />
                  </Editable>
                </Th>
                <Th>
                  {((value?.numberPerRoll || 0) *
                    (value?.numberPlantsPerHectare || 0)) /
                    1000}
                </Th>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Button
        onClick={() => {
          createVegetationYear(income, {
            cultivationTechnologyId: busProd?.cultivationTechnologyId!,
            cultureId: busProd?.product?.cultureId!,

            busProdId: busProd?.id!,
            data: res.data.map((el) => ({
              ...el,
              techCartId: el?.techCartId!,
              seedlingsCoeff: +el.seedlingsCoeff,
              technologyCoeff: +el.technologyCoeff,
              vegetationCoeff: +el.vegetationCoeff,
              year: el.year,
              numberPerRoll: +el.numberPerRoll,
              numberPlantsPerHectare: +el.numberPlantsPerHectare,
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
