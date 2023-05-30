import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { IoutcomeGroup } from "../../../../../tRPC serv/controllers/outComeService";
import useOutcomeGroup from "../../../shared/hook/useOutcomeGroup";
import { outcomeProps } from "../CreateOutcome";
const outcomeGroup = useOutcomeGroup;
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: outcomeProps;
  setRes: Dispatch<SetStateAction<outcomeProps>>;
};
function OutcomeGroup({ setScreen, res, setRes }: props) {
  return (
    <Box>
      <ModalBody>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Виберіть групу витрат
        </Heading>
        <Select
          mt={"10px"}
          onChange={(e) =>
            setRes((prev) => ({
              ...prev,
              group: e.target.value as "" | IoutcomeGroup,
            }))
          }
          value={res.group}
        >
          <option hidden defaultChecked value="">
            Виберіть групу
          </option>
          {outcomeGroup.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </Select>
      </ModalBody>
      <ModalFooter justifyContent={"space-between"}>
        <Button onClick={() => setScreen(1)}>Назад</Button>
        <Button onClick={() => setScreen(3)} isDisabled={!res.group}>
          Далі
        </Button>
      </ModalFooter>
    </Box>
  );
}

export default OutcomeGroup;
