import {
  Box,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "../../../main";
import useIncomeGroup from "../../../shared/hook/useIncomeGroup";
import { IncomeProp } from "../CreateIncome";
import useIncomeTypes from "../../../shared/hook/useIncomeTypes";
type props = {
  setScreen: Dispatch<SetStateAction<number>>;
  res: IncomeProp;
  setRes: Dispatch<SetStateAction<IncomeProp>>;
};
function IncomeChooseGroup({ setScreen, res, setRes }: props) {
  const { map } = useContext(Context);
  const type = useIncomeTypes.find((el) => el.name == res.type);
  let group = useIncomeGroup.filter((el) => el.typeId == type?.id);
  const thisGroup = useIncomeGroup.find((el) => el.name == res.group);
  return (
    <ModalBody>
      <Heading size="md" textAlign={"center"}>
        Внесіть дані для розрахунку
      </Heading>
      <Select
        value={res.group}
        onChange={(e) =>
          setRes((prev) => ({ ...prev, group: e.target.value as any }))
        }
      >
        <option hidden defaultChecked value="">
          Виберіть
        </option>
        {group.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </Select>
      <ModalFooter justifyContent={"space-around"}>
        <Button onClick={() => setScreen(0)}>Назад</Button>
        <Button
          onClick={() => setScreen(2)}
          isDisabled={!res.group || thisGroup?.typeId != type?.id}
        >
          Далі
        </Button>
      </ModalFooter>
    </ModalBody>
  );
}

export default observer(IncomeChooseGroup);
