import {
  Box,
  Heading,
  Input,
  Select,
  ModalFooter,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createCredit, patchCredit } from "../../http/requests";
import { Context } from "../../main";
import useCreditPurpose, {
  CreditPurposeType,
} from "../../pages/hook/useCreditPurpose";

export type CreditProps = {
  creditId?: number;
  name: string;
  date: string;
  purpose: CreditPurposeType | "";
  cost: number | "";
  enterpriseId: number;
  isUseCost: boolean;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: CreditProps;
  setRes: Dispatch<SetStateAction<CreditProps>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
const purpose = useCreditPurpose;
const obj = {};
function CreateCredit({
  open,
  setOpen,
  res,
  setRes,
  setUpdate,
  update,
}: props) {
  const { income } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      setRes={setRes}
      props={obj}
      isErr={false}
      res={obj}
      setUpdate={setUpdate}
      update={update}
      setIsErr={() => {}}
      onClose={() =>
        setRes((prev) => ({
          enterpriseId: prev.enterpriseId,
          cost: "",
          date: "",
          isUseCost: false,
          name: "",
          purpose: "",
        }))
      }
    >
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Введіть данні для розрахунку кредиту
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"} mt={3}>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть ім'я
          </Heading>
          <Input
            size={"sm"}
            value={res.name}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Введіть данні"
          />
        </Box>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть дату отримання
          </Heading>
          <Input
            size={"sm"}
            value={res.date}
            type={"date"}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} mt={3}>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть суму
          </Heading>
          <Input
            size={"sm"}
            type={"number"}
            value={res.cost}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, cost: e.target.value as any }))
            }
            placeholder="Введіть дані"
          />
        </Box>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Виберіть напрямок
          </Heading>
          <Select
            size={"sm"}
            value={res.purpose}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                purpose: e.target.value as CreditPurposeType,
              }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {purpose.map((el) => (
              <option value={el.name} key={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box width={"fit-content"} mx={"auto"}>
        <Checkbox
          isChecked={res.isUseCost}
          onChange={() =>
            setRes((prev) => ({ ...prev, isUseCost: !prev.isUseCost }))
          }
        >
          Використовувати в бізнес-плані
        </Checkbox>
      </Box>
      <ModalFooter>
        <Button
          onClick={() => {
            if (res.name && res.cost && res.date && res.purpose) {
              res.cost = +res.cost;

              if (update) {
                patchCredit(income, {
                  creditId: res.creditId!,
                  cost: res.cost,
                  date: res.date,
                  name: res.name,
                  purpose: res.purpose,
                  isUseCost: res.isUseCost,
                  enterpriseId: res.enterpriseId,
                });
              } else {
                createCredit(income, {
                  cost: res.cost,
                  date: res.date,
                  name: res.name,
                  purpose: res.purpose,
                  isUseCost: res.isUseCost,
                  enterpriseId: res.enterpriseId,
                });
              }
              setOpen(false);
              setUpdate(false);
              setRes((prev) => ({
                enterpriseId: prev.enterpriseId,
                cost: "",
                date: "",
                isUseCost: false,
                name: "",
                purpose: "",
              }));
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateCredit;
