import {
  Box,
  Button,
  Heading,
  Input,
  ModalFooter,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createAdministration, patchAdministration } from "../../http/requests";
import { Context } from "../../main";
import useAdministrationPeriodCalc, {
  AdministrationPeriodCalcType,
} from "../../pages/hook/useAdministrationPeriodCalc";
import useAdministrationPurpose, {
  AdministrationPurposeType,
} from "../../pages/hook/useAdministrationPurpose";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: CreateAdministrationProp;
  setRes: Dispatch<SetStateAction<CreateAdministrationProp>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
export type CreateAdministrationProp = {
  admId?: number;
  name: string;
  price: number | "";
  dateFrom: string;
  dateTo: string;
  purpose: AdministrationPurposeType | "";
  periodCalc: AdministrationPeriodCalcType | "";
};
const obj = {};
const periodCalc = useAdministrationPeriodCalc;
const purpose = useAdministrationPurpose;
function CreateAdministration({
  open,
  setOpen,
  res,
  setRes,
  update,
  setUpdate,
}: props) {
  const { map } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      props={obj}
      isErr={false}
      setIsErr={() => {}}
      setUpdate={setUpdate}
      update={update}
    >
      <Box>
        <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
          Впишіть дані для розрахунку
        </Heading>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть назву
            </Heading>
            <Input
              size={"sm"}
              type={"text"}
              value={res.name}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, name: e.target.value as any }))
              }
              placeholder="Введіть дані"
            />
          </Box>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть суму
            </Heading>
            <Input
              size={"sm"}
              type={"number"}
              inputMode={"numeric"}
              value={res.price}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, price: e.target.value as any }))
              }
              placeholder="Введіть дані"
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть дату початку
            </Heading>
            <Input
              size={"sm"}
              type={"date"}
              value={res.dateFrom}
              onChange={(e) => {
                console.log(res.dateTo);

                // console.log(
                //   res.dateTo &&
                //     res.dateTo.split("-")[0] == e.target.value.split("-")[0]
                // );

                // if (
                //   res.dateTo &&
                //   res.dateTo.split("-")[0] == e.target.value.split("-")[0]
                // ) {
                setRes((prev) => ({
                  ...prev,
                  dateFrom: e.target.value as any,
                }));
                // }
              }}
              placeholder="Введіть дані"
            />
          </Box>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Введіть дату кінця
            </Heading>
            <Input
              size={"sm"}
              type={"date"}
              value={res.dateTo}
              onChange={(e) => {
                // if (
                //   res.dateFrom &&
                //   res.dateFrom.split("-")[0] == e.target.value.split("-")[0]
                // ) {
                setRes((prev) => ({
                  ...prev,
                  dateTo: e.target.value as any,
                }));
                // }
              }}
              placeholder="Введіть дані"
            />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Виберіть призначення
            </Heading>
            <Select
              size={"sm"}
              value={res.purpose}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, purpose: e.target.value as any }))
              }
            >
              <option value={""} hidden defaultChecked>
                Виберіть опцію
              </option>
              {purpose.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box maxW={"190px"}>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Виберіть період розрахунку
            </Heading>
            <Select
              size={"sm"}
              value={res.periodCalc}
              onChange={(e) =>
                setRes((prev) => ({
                  ...prev,
                  periodCalc: e.target.value as any,
                }))
              }
            >
              <option value={""} hidden defaultChecked>
                Виберіть опцію
              </option>
              {periodCalc.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          onClick={() => {
            if (
              res.name &&
              res.dateFrom &&
              res.dateTo &&
              res.periodCalc &&
              res.price &&
              res.purpose
            ) {
              res.price = +res.price;
              if (update) {
                //@ts-ignore
                patchAdministration(map, res);
              } else {
                //@ts-ignore
                createAdministration(map, res);
              }
              setOpen(false);
              setUpdate(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateAdministration;
