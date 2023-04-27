import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
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
            Виберіть групу
          </option>
          {map.maps.map((el) => (
            <option key={el.id} value={el.id}>
              {el.nameCart}
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
              if (update) {
                patchOutcome(map, {
                  type: res.type,
                  cartId: res.id,
                  group: res.group,
                  outcomeId: res.outId!,
                });
                setUpdate(false);
              } else {
                createOutcome(map, {
                  cartId: res.id,
                  group: res.group,
                  type: res.type,
                });
              }
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
