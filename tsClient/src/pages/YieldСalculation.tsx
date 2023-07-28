import {
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
// import { IyieldCalculation } from "../../../tRPC serv/models/models";
import { VegetationYearsType } from "../shared/hook/useVegetationYears";
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
  year: VegetationYearsType | undefined;
  vegetationCoeff: number | string;
  technologyCoeff: number | string;
  seedlingsCoeff: number | string;
  numberPlantsPerHectare: number | string;
  numberPerRoll: number | string;
  techCartId: number | null | undefined;
  yieldPlantId?: number;
}
// function convertToCSV(data: IyieldCalculation[]) {
//   const headers = Object.keys(data[0]).join(",");
//   const rows = data.map((obj) => Object.values(obj).join(","));
//   return `${headers}\n${rows.join("\n")}`;
// }
// function downloadCSV(data: IyieldCalculation[]) {
//   const csv = convertToCSV(data);
//   const blob = new Blob([csv], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = "data.csv";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

function YieldСalculation() {
  const { busId, busProdId } = useParams();
  const { income, map, business } = useContext(Context);
  const busProd = business.businessPlan
    .find((el) => el.id == busId)
    ?.busProds.find((el) => el.id == +busProdId!);

  useEffect(() => {
    getVegetationYear(income);
    getBusinessPlans(map, business);
  }, []);
  //@ts-ignore
  const [value, setValue] = useState<IvegetationRes>(busProd?.vegetationYear!);
  useEffect(() => {
    //@ts-ignore
    setValue(busProd?.vegetationYear);
  }, [JSON.stringify(busProd?.vegetationYear)]);
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
              Потенційна <br /> урожайність (
              {busProd?.product?.unitMeasure == "шт" ? "шт" : "т"})
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{busProd?.tech_cart?.nameCart}</Td>
            <Td>{busProd?.tech_cart?.year}</Td>
            <Td>
              <Editable
                value={(value?.vegetationCoeff ?? "") + ""}
                onChange={(e) =>
                  setValue((prev) => ({
                    ...prev,
                    vegetationCoeff: e,
                  }))
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
            </Td>
            <Td>
              <Editable
                value={(value?.technologyCoeff ?? "") + ""}
                onChange={(e) =>
                  setValue((prev) => ({
                    ...prev,
                    technologyCoeff: e,
                  }))
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
            </Td>
            <Td>
              <Editable
                value={(value?.seedlingsCoeff ?? "") + ""}
                onChange={(e) =>
                  setValue((prev) => ({
                    ...prev,
                    seedlingsCoeff: e,
                  }))
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
            </Td>
            <Td>
              <Text>
                {+(
                  +value?.seedlingsCoeff! *
                  +value?.technologyCoeff! *
                  +value?.vegetationCoeff!
                ).toFixed(2) || ""}
              </Text>
            </Td>
            <Td>
              <Editable
                value={(value?.numberPlantsPerHectare ?? "") + ""}
                onChange={(e) =>
                  setValue((prev) => ({
                    ...prev,
                    numberPlantsPerHectare: e,
                  }))
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
            </Td>
            <Td>
              <Editable
                value={(value?.numberPerRoll ?? "") + ""}
                onChange={(e) =>
                  setValue((prev) => ({
                    ...prev,
                    numberPerRoll: e,
                  }))
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
            </Td>
            <Td>
              {busProd?.product?.unitMeasure == "шт"
                ? (+value?.numberPerRoll || 0) *
                  +(value?.numberPlantsPerHectare || 0)
                : (+(value?.numberPerRoll || 0) *
                    +(value?.numberPlantsPerHectare || 0)) /
                  1000}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Button
        onClick={() => {
          createVegetationYear(business, {
            cultivationTechnologyId: busProd?.cultivationTechnologyId!,
            cultureId: busProd?.product?.cultureId!,
            businessPlanId: +busId!,
            busProdId: busProd?.id!,
            techCartId: busProd?.techCartId!,
            seedlingsCoeff: +value.seedlingsCoeff,
            technologyCoeff: +value.technologyCoeff,
            vegetationCoeff: +value.vegetationCoeff,
            year: busProd?.tech_cart?.year!,
            numberPerRoll: +value.numberPerRoll,
            numberPlantsPerHectare: +value.numberPlantsPerHectare,
          });
        }}
      >
        Зберегти
      </Button>
    </Container>
  );
}

export default observer(YieldСalculation);
