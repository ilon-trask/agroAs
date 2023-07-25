import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  Iadministration,
  Ibuying_machine,
  Itech_cart,
} from "../../../../../tRPC serv/models/models";
import { createOutcome, patchOutcome } from "../../../http/requests";
import { Context } from "../../../main";
import { outcomeProps } from "../CreateOutcome";
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: outcomeProps;
  setRes: Dispatch<SetStateAction<outcomeProps>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
function OutcomeElem({
  setScreen,
  res,
  setRes,
  setOpen,
  update,
  setUpdate,
}: props) {
  const { map } = useContext(Context);
  let prop: Itech_cart[] | Ibuying_machine[] | Iadministration[] = [];
  // if (res.group == "Купівля техніки і обладнання") {
  //   prop = map.buyingMachine;
  // } else
  if (res.group == "Прямі") {
    prop = map.maps;
  } else if (res.group == "Постійні") {
    prop = map.administration;
  }

  return (
    <Box>
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Виберіть
        </Heading>
        <Select
          mt={"10px"}
          onChange={(e) => setRes((prev) => ({ ...prev, id: +e.target.value }))}
          value={res.id}
        >
          <option hidden defaultChecked value="">
            Виберіть
          </option>
          {prop?.map((el) => (
            <option key={el.id} value={el.id}>
              {
                //@ts-ignore
                el.nameCart || el.name
              }
            </option>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter justifyContent={"space-between"}>
        <Button onClick={() => setScreen(2)}>Назад</Button>
        <Button
          isDisabled={!res.id}
          onClick={() => {
            if (res.group && res.type) {
              // if (update) {
              //   patchOutcome(map, {
              //     type: res.type,
              //     propId: res.id,
              //     group: res.group,
              //     outcomeId: res.outId!,
              //   });
              //   setUpdate(false);
              // } else {
              //   createOutcome(map, {
              //     propId: res.id,
              //     group: res.group,
              //     type: res.type,
              //   });
              // }
              setOpen(false);
            }
          }}
        >
          Збегерти
        </Button>
      </ModalFooter>
    </Box>
  );
}

export default OutcomeElem;
