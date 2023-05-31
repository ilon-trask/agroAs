import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "src/main";
import { Ifinancing } from "../../../../tRPC serv/models/models";
type props = {
  thisCredit: Ifinancing[];
  thisInvestment: Ifinancing[];
  thisDerj: Ifinancing[];
  thisGrant: Ifinancing[];
  isPlan?: boolean;
  res?: number[];
  setRes?: Dispatch<SetStateAction<number[]>>;
};
function isChecked(arr: number[], id: number) {
  return arr.includes(id);
}
function ThisCheckbox({
  id,
  res,
  setRes,
}: {
  res: number[];
  setRes: Dispatch<SetStateAction<number[]>>;
  id: number;
}) {
  return (
    <Checkbox
      isChecked={isChecked(res, id)}
      onChange={() => {
        if (setRes) {
          if (isChecked(res!, id)) {
            setRes((prev) => prev.filter((e) => e != id));
          } else {
            setRes((prev) => [...prev, id]);
          }
        }
      }}
    />
  );
}
function MainFinancingBusinessPlanTable({
  thisCredit,
  thisInvestment,
  thisDerj,
  thisGrant,
  isPlan,
  res,
  setRes,
}: props) {
  return (
    <Table size={"sm"}>
      <Thead>
        <Tr>
          {!isPlan && <Th></Th>}
          <Th>Назва</Th>
          <Th>Дата</Th>
          <Th>Сума</Th>
          <Th>Призначення</Th>
          <Th>Метод розрахунку</Th>
          <Th>Вид розрахунку</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontWeight={"bold"}>
          {!isPlan && <Td></Td>}
          <Td>Кредит</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
        {thisCredit.map((el) => (
          <Tr>
            {!isPlan && (
              <Td>
                <ThisCheckbox id={el.id!} setRes={setRes!} res={res!} />
              </Td>
            )}
            <Td>{el.name}</Td>
            <Td>{el.date}</Td>
            <Td>{el.cost}</Td>
            <Td>{el.purpose}</Td>
            <Td>{el.calculationMethod}</Td>
            <Td>{el.calculationType}</Td>
          </Tr>
        ))}
        <Tr fontWeight={"bold"}>
          {!isPlan && <Td></Td>}
          <Td>Інвестиції</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
        {thisInvestment.map((el) => (
          <Tr>
            {!isPlan && (
              <Td>
                <ThisCheckbox id={el.id!} setRes={setRes!} res={res!} />
              </Td>
            )}
            <Td>{el.name}</Td>
            <Td>{el.date}</Td>
            <Td>{el.cost}</Td>
            <Td>{el.purpose}</Td>
            <Td>{el.calculationMethod}</Td>
            <Td>{el.calculationType}</Td>
          </Tr>
        ))}
        <Tr fontWeight={"bold"}>
          {!isPlan && <Td></Td>}
          <Td>Держ. підтримка</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
        {thisDerj.map((el) => (
          <Tr>
            {!isPlan && (
              <Td>
                <ThisCheckbox id={el.id!} setRes={setRes!} res={res!} />
              </Td>
            )}
            <Td>{el.name}</Td>
            <Td>{el.date}</Td>
            <Td>{el.cost}</Td>
            <Td>{el.purpose}</Td>
            <Td>{el.calculationMethod}</Td>
            <Td>{el.calculationType}</Td>
          </Tr>
        ))}
        <Tr fontWeight={"bold"}>
          {!isPlan && <Td></Td>}
          <Td>Грант</Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td></Td>
        </Tr>
        {thisGrant.map((el) => (
          <Tr>
            {!isPlan && (
              <Td>
                <ThisCheckbox id={el.id!} setRes={setRes!} res={res!} />
              </Td>
            )}
            <Td>{el.name}</Td>
            <Td>{el.date}</Td>
            <Td>{el.cost}</Td>
            <Td>{el.purpose}</Td>
            <Td>{el.calculationMethod}</Td>
            <Td>{el.calculationType}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default MainFinancingBusinessPlanTable;
