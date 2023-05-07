import {
  Box,
  Button,
  Heading,
  Input,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createYieldPlant, updateYieldPlant } from "../../../http/requests";
import { Context } from "../../../main";
import { incProp } from "../CreateYield";
type props = {
  res: incProp;
  setRes: Dispatch<SetStateAction<incProp>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  plantId: number;
};
function YieldPlant({ res, setRes, setOpen, update, plantId }: props) {
  const { income, map } = useContext(Context);
  //   const [focus, setFocus] = useState(false);

  return (
    <Box>
      <Heading as={"h4"} size="md" textAlign={"center"} mt={3}>
        Створення урожайності культури
      </Heading>
      <Box
        mt={3}
        px={"20px"}
        display={"flex"}
        gap={6}
        justifyContent={"space-around"}
      >
        <Box>
          <Heading as={"h4"} size="sm">
            Виберіть культуру
          </Heading>
          <Select
            size={"sm"}
            mt={2}
            value={res?.cultureId}
            onChange={(e) => {
              setRes({ ...res, cultureId: e.target.value });
            }}
          >
            <option value="" disabled hidden>
              Виберіть назву
            </option>
            {income.cultural.map((el) => (
              <option value={el.id}>{el.name}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <Heading as={"h4"} size="sm">
            Веберіть технологію
          </Heading>
          <Select
            size={"sm"}
            mt={2}
            value={res?.cultivationTechnologyId}
            // maxLength={15}
            onChange={(e) => {
              setRes({
                ...res,
                cultivationTechnologyId: e.target.value as any,
              });
            }}
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {map.cultivationTechnologies.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <ModalFooter p={"15px 67px"}>
        <Button
          isDisabled={!res.cultureId}
          onClick={() => {
            if (!update) {
              createYieldPlant(income, {
                cultureId: +res.cultureId,
                cultivationTechnologyId: +res.cultivationTechnologyId,
              });
            } else {
              updateYieldPlant(income, {
                cultureId: +res.cultureId,
                cultivationTechnologyId: +res.cultivationTechnologyId,
                yieldPlantId: plantId,
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

export default observer(YieldPlant);
