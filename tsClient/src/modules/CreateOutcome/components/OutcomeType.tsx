import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { IoutcomeType } from "../../../../../tRPC serv/controllers/outComeService";
import useOutcomeTypes from "../../../pages/hook/useOutcomeTypes";
import { outcomeProps } from "../CreateOutcome";
const outcomeTypes = useOutcomeTypes;
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: outcomeProps;
  setRes: Dispatch<SetStateAction<outcomeProps>>;
};
function OutcomeType({ setScreen, res, setRes }: props) {
  return (
    <Box>
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Виберіть тип витрат
        </Heading>
        <Select
          mt={"10px"}
          onChange={(e) =>
            setRes((prev) => ({
              ...prev,
              type: e.target.value as "" | IoutcomeType,
            }))
          }
          value={res.type}
        >
          <option hidden defaultChecked value="">
            Виберіть тип
          </option>
          {outcomeTypes.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setScreen(2)} isDisabled={!res.type}>
          Далі
        </Button>
      </ModalFooter>
    </Box>
  );
}

export default OutcomeType;
