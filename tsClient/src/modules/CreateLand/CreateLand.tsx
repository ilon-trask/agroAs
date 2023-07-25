import {
  Box,
  Button,
  Heading,
  Input,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Dialog from "src/components/Dialog";
import { createLandForBusiness, patchLandForBusiness } from "src/http/requests";
import { Context } from "src/main";
const obj = {};
export interface CreateLandProps {
  landId?: number;
  name: string;
  area: number | string;
  cadastreNumber?: number | string | null;
  businessPlanId?: number;
  enterpriseId?: number;
  date: string;
  rate: number | string;
  ownership: "Комунальна" | "Приватна" | "Державна" | "";
  rightOfUse: "Оренда" | "Власна" | "";
}
function CreateLand({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CreateLandProps;
}) {
  const { business } = useContext(Context);
  const [res, setRes] = useState<CreateLandProps>({
    area: "",
    enterpriseId: 0,
    name: "",
    date: "",
    rightOfUse: "",
    ownership: "",
    rate: "",
  });
  useEffect(() => setRes(data), [data]);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={false}
      setUpdate={() => {}}
      isErr={false}
      res={obj}
      props={obj}
      setIsErr={() => {}}
      setRes={setRes}
      onClose={() =>
        setRes((prev) => ({
          enterpriseId: prev.enterpriseId,
          businessPlanId: prev.businessPlanId,
          area: "",
          cadastreNumber: "",
          name: "",
          date: "",
          rightOfUse: "",
          ownership: "",
          rate: "",
        }))
      }
    >
      <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
        Впишіть дані для стоворення земельної ділянки
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"} mt={3}>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm">
            Виберіть право користування
          </Heading>
          <Select
            value={res.rightOfUse}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, rightOfUse: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            <option value="Оренда">Оренда</option>
            <option value="Власна">Власна</option>
          </Select>
        </Box>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm">
            Введіть площу
          </Heading>
          <Input
            size={"sm"}
            value={res.area}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, area: e.target.value }))
            }
          />
        </Box>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm">
            Введіть кадастровий номер
          </Heading>
          <Input
            size={"sm"}
            value={res.cadastreNumber as any}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                cadastreNumber: e.target.value,
              }))
            }
            placeholder="Введіть данні"
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box>
          <Heading as={"h4"} size="sm">
            Внесіть ставку
          </Heading>
          <Input
            type={"number"}
            inputMode="numeric"
            placeholder="Впишіть данні"
            value={res.rate}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, rate: e.target.value }))
            }
          />
        </Box>
        <Box>
          <Heading as={"h4"} size="sm">
            Виберіть власність
          </Heading>
          <Select
            value={res.ownership}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, ownership: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            <option value="Приватна">Приватна</option>
            <option value="Комунальна">Комунальна</option>
            <option value="Державна">Державна</option>
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={
            !res.area &&
            !res.enterpriseId &&
            !res.rightOfUse &&
            !res.ownership &&
            !res.rate
          }
          onClick={() => {
            if (res.area && res.rightOfUse && res.ownership && res.rate) {
              if (res.landId) {
                patchLandForBusiness(business, {
                  ...res,
                  area: +res.area,
                  cadastreNumber: res.cadastreNumber
                    ? +res.cadastreNumber
                    : null,
                  landId: res.landId!,
                  rightOfUse: res.rightOfUse as any,
                  rate: +res.rate,
                  ownership: res.ownership as any,
                });
              } else {
                createLandForBusiness(business, {
                  ...res,
                  area: +res.area,
                  cadastreNumber: res.cadastreNumber
                    ? +res.cadastreNumber
                    : null,
                  rightOfUse: res.rightOfUse as any,
                  rate: +res.rate,
                  ownership: res.ownership as any,
                });
              }
              setOpen(false);
              setRes((prev) => ({
                enterpriseId: prev.enterpriseId,
                businessPlanId: prev.businessPlanId,
                area: "",
                cadastreNumber: "",
                name: "",
                date: "",
                rightOfUse: "",
                ownership: "",
                rate: "",
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

export default CreateLand;
