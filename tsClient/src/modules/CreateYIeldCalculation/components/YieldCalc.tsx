import { Box, Button, Heading, Input, ModalFooter } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { createYieldCalc, updateYieldCalc } from "../../../http/requests";
import { Context } from "../../../main";
import { yieldCalcProp } from "../CreateYieldCalc";
type props = {
  res: yieldCalcProp;
  setRes: Dispatch<SetStateAction<yieldCalcProp>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  update: boolean;
};

function YieldCalc({ res, setRes, setOpen, id, update }: props) {
  const { income } = useContext(Context);
  console.log(res);

  return (
    <Box>
      <Heading as={"h4"} size="md" textAlign={"center"} mt={3}>
        Введіть данні для розрахунку уражайності
      </Heading>
      <Box mt={3}>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box>
            <Heading as={"h4"} size="sm">
              Густота насаджень 1га
            </Heading>
            <Input
              placeholder="Введіть густоту"
              size={"sm"}
              type={"number"}
              mt={2}
              value={res?.numberPlantsPerHectare}
              onChange={(e) => {
                setRes({ ...res, numberPlantsPerHectare: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Кількість розеток
            </Heading>
            <Input
              placeholder="Введіть кількість"
              size={"sm"}
              type={"number"}
              mt={2}
              value={res?.numberSocket}
              onChange={(e) => {
                setRes({ ...res, numberSocket: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Кількість квітконосів
            </Heading>
            <Input
              placeholder="Введіть кількість"
              size={"sm"}
              type={"number"}
              mt={2}
              value={res?.numberFlower}
              onChange={(e) => {
                setRes({ ...res, numberFlower: e.target.value });
              }}
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"} mt={2}>
          <Box>
            <Heading as={"h4"} size="sm">
              Кількість ягід
            </Heading>
            <Input
              placeholder="Введіть кількість"
              size={"sm"}
              type={"number"}
              mt={2}
              value={res?.numberFruit}
              onChange={(e) => {
                setRes({ ...res, numberFruit: e.target.value });
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              Вага ягоди
            </Heading>
            <Input
              placeholder="Введіть кількість"
              size={"sm"}
              type={"number"}
              mt={2}
              value={res?.fruitWeight}
              onChange={(e) => {
                setRes({ ...res, fruitWeight: e.target.value });
              }}
            />
          </Box>
        </Box>
      </Box>
      <ModalFooter p={"15px 67px"}>
        <Button
          isDisabled={
            !res.numberPlantsPerHectare ||
            !res.numberSocket ||
            !res.numberFlower ||
            !res.numberFruit ||
            !res.fruitWeight
          }
          onClick={() => {
            if (!update) {
              createYieldCalc(income, {
                fruitWeight: +res.fruitWeight,
                numberFlower: +res.numberFlower,
                numberFruit: +res.numberFruit,
                numberPlantsPerHectare: +res.numberPlantsPerHectare,
                numberSocket: +res.numberSocket,
                yieldPlantId: id,
              });
            } else {
              updateYieldCalc(income, {
                fruitWeight: +res.fruitWeight,
                numberFlower: +res.numberFlower,
                numberFruit: +res.numberFruit,
                numberPlantsPerHectare: +res.numberPlantsPerHectare,
                numberSocket: +res.numberSocket,
                yieldPlantId: id,
              });
            }
            setOpen(false);
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Box>
  );
}

export default YieldCalc;
