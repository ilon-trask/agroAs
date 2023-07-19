import {
  Box,
  Heading,
  Input,
  Select,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import useCreditCalculationMethod, {
  CreditCalculationMethodType,
} from "src/shared/hook/useCreditCalculationMethod";
import { DerjPurposeType } from "src/shared/hook/useDerjPurpose";
import { FinancingType } from "src/shared/hook/useFinancingType";
import { GrantPurposeType } from "src/shared/hook/useGrantPurpose";
import { InvestmentOriginType } from "src/shared/hook/useInvestmentOrigin";
import Dialog from "../../components/Dialog";
import {
  createFinancingForBusiness,
  patchFinancingForBusiness,
} from "../../http/requests";
import { Context } from "../../main";
import useCreditPurpose, {
  CreditPurposeType,
} from "../../shared/hook/useCreditPurpose";
import useDerjPurpose from "src/shared/hook/useDerjPurpose";
import useGrantPurpose from "src/shared/hook/useGrantPurpose";
import useInvestmentOrigin from "src/shared/hook/useInvestmentOrigin";
import useFinancingType from "src/shared/hook/useFinancingType";
import { useParams } from "react-router-dom";
export type FinancingProps = {
  id?: number;
  name: string;
  type: FinancingType | "";
  date: string;
  purpose:
    | CreditPurposeType
    | InvestmentOriginType
    | DerjPurposeType
    | GrantPurposeType
    | "";
  cost: number | "";
  enterpriseId: number | undefined;
  isUseCost: boolean;
  calculationMethod: CreditCalculationMethodType | "";
  cultureId?: number | null | "";
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: FinancingProps;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  busId: number;
};
const obj = {};
function CreateFinancing({
  open,
  setOpen,
  data,
  setUpdate,
  update,
  busId,
}: props) {
  const { income, business, map } = useContext(Context);
  const [res, setRes] = useState(data);
  const arr =
    res.type == "credit"
      ? useCreditPurpose
      : res.type == "derj_support"
      ? useDerjPurpose
      : res.type == "grant"
      ? useGrantPurpose
      : res.type == "investment"
      ? useInvestmentOrigin
      : [];
  useEffect(() => setRes(data), [data]);
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
          type: prev.type,
          isUseCost: false,
          name: "",
          purpose: "",
          calculationMethod: "",
          calculationType: "",
          cultureId: undefined,
        }))
      }
    >
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Введіть данні для розрахунку кредиту
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"} mt={3}>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть назву
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
            Виберіть тип фінансування
          </Heading>
          <Select
            size={"sm"}
            value={res.type}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                type: e.target.value as FinancingType,
              }))
            }
          >
            <option value="" defaultChecked hidden>
              Виберіть опцію
            </option>
            {useFinancingType.map((el) => (
              <option value={el.name} key={el.id}>
                {el.clientName}
              </option>
            ))}
          </Select>
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
            isDisabled={!res.type}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                purpose: e.target.value as CreditPurposeType,
              }))
            }
          >
            <option value="" hidden defaultChecked>
              {res.type ? "Виберіть опцію" : "Виберіть тип"}
            </option>
            {arr.map((el) => (
              <option value={el.name} key={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} mt={3}>
        <Box>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Метод розрахунку
          </Heading>
          <Select
            size={"sm"}
            value={res.calculationMethod}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                calculationMethod: e.target.value as any,
              }))
            }
          >
            <option value="" hidden>
              Виберіть опцію
            </option>
            {useCreditCalculationMethod.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>

        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Виберіть культури
          </Heading>
          <Select
            //@ts-ignore
            value={res.cultureId}
            size={"sm"}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, cultureId: +e.target.value }))
            }
          >
            <option value="" hidden>
              виберіть опцію
            </option>
            {map.culture.map((el) => (
              <option key={el.id!} value={el.id}>
                {el.name}
              </option>
            ))}
            <option
              //@ts-ignore
              value={null}
            >
              Без культури
            </option>
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          onClick={() => {
            if (
              res.name &&
              res.cost &&
              res.date &&
              res.purpose &&
              res.calculationMethod &&
              res.type &&
              res.cultureId
            ) {
              res.cost = +res.cost;
              if (update) {
                patchFinancingForBusiness(business, {
                  busId: busId,
                  financingId: res.id!,
                  cost: res.cost,
                  date: res.date,
                  name: res.name,
                  purpose: res.purpose,
                  isUseCost: res.isUseCost || false,
                  enterpriseId: res.enterpriseId,
                  calculationMethod: res.calculationMethod,
                  type: res.type,
                  cultureId: res.cultureId,
                });
              } else {
                createFinancingForBusiness(business, {
                  busId: busId,
                  cost: res.cost,
                  date: res.date,
                  name: res.name,
                  purpose: res.purpose,
                  isUseCost: res.isUseCost || false,
                  enterpriseId: res.enterpriseId,
                  calculationMethod: res.calculationMethod,
                  type: res.type,
                  cultureId: res.cultureId,
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
                calculationMethod: "",
                type: prev.type,
                cultureId: undefined,
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

export default CreateFinancing;
