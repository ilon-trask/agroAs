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
import Dialog from "../../components/Dialog";
import {
  createBuyingMachineForBusiness,
  patchBuyingMachineForBusiness,
} from "../../http/requests";
import { Context } from "../../main";
import useBuyingMachinePurpose, {
  BuyingMachinePurposeType,
} from "../../shared/hook/useBuyingMachinePurpose";
type props = {
  isMSHP?: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  data: CreateBuyingMachineProps;
};
export type CreateBuyingMachineProps = {
  buyingId?: number;
  name: string;
  brand: string;
  date: string;
  year: number;
  purpose: BuyingMachinePurposeType | "" | "МШП";
  amount: number | "";
  price: number | "";
  businessPlanId: number;
  enterpriseId?: number;
};
const obj = {};
function CreateBuyingMachine({
  open,
  setOpen,
  update,
  setUpdate,
  data,
  isMSHP,
}: props) {
  const purpose = useBuyingMachinePurpose;
  const { business } = useContext(Context);

  let [input, setInput] = useState(data as CreateBuyingMachineProps);

  useEffect(() => {
    if (data) setInput(data);
  }, [data]);

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      res={obj}
      props={obj}
      setIsErr={() => {}}
      setRes={setInput}
      setUpdate={setUpdate}
      update={update}
      onClose={() =>
        setInput((prev) => ({
          name: "",
          amount: "",
          brand: "",
          price: "",
          date: "",
          purpose: "",
          businessPlanId: prev.businessPlanId,
          enterpriseId: prev.enterpriseId,
          year: 0,
        }))
      }
    >
      <Box>
        <Heading as={"h4"} size="md" textAlign={"center"}>
          Внесіть дані для розрахунку
        </Heading>
        <Box
          mt={"15px"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Box>
            <Heading as={"h4"} size="sm">
              {isMSHP ? (
                <>Назва предмета</>
              ) : (
                <>
                  Назва машини <br />
                  або обладнання
                </>
              )}
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={input?.name}
              onChange={(e) => {
                setInput((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              {isMSHP ? (
                <>Марка придмета</>
              ) : (
                <>
                  Марка машини <br />
                  або обладнання
                </>
              )}
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              type="text"
              value={input?.brand}
              onChange={(e) => {
                setInput((prev) => ({ ...prev, brand: e.target.value }));
              }}
            />
          </Box>
        </Box>
        <Box
          mt={"15px"}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
          maxW={"490px"}
          mx={"auto"}
        >
          <Box>
            <Heading as={"h4"} size="sm">
              {isMSHP ? (
                <>Ціна придмета</>
              ) : (
                <>
                  Ціна машини <br />
                  або обладнання
                </>
              )}
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть ціну"
              inputMode="numeric"
              type="number"
              value={input?.price}
              onChange={(e) => {
                setInput((prev) => ({ ...prev, price: e.target.value as any }));
              }}
            />
          </Box>
          <Box>
            <Heading as={"h4"} size="sm">
              {isMSHP ? (
                <>Кількість предметів</>
              ) : (
                <>
                  Кількість машин <br />
                  або обладнання
                </>
              )}
            </Heading>
            <Input
              size={"sm"}
              placeholder="Вкажіть назву"
              inputMode="numeric"
              type="number"
              value={input?.amount}
              onChange={(e) => {
                setInput((prev) => ({
                  ...prev,
                  amount: e.target.value as any,
                }));
              }}
            />
          </Box>
        </Box>
        {!isMSHP && (
          <Box
            mt={"15px"}
            display={"flex"}
            justifyContent={"space-around"}
            alignItems={"center"}
            maxW={"490px"}
            mx={"auto"}
          >
            <Box>
              <Heading as={"h4"} size="sm">
                Напрямок машин <br />
                або обладнання
              </Heading>
              <Select
                size={"sm"}
                value={input?.purpose}
                onChange={(e) => {
                  setInput((prev) => ({
                    ...prev,
                    purpose: e.target.value as any,
                  }));
                }}
              >
                <option value="" hidden defaultChecked>
                  Виберіть опцію
                </option>
                {purpose.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
        )}
      </Box>
      <ModalFooter>
        <Button
          isDisabled={
            !input?.name &&
            !input?.brand &&
            !input?.amount &&
            !input?.price &&
            !input?.date &&
            !input?.purpose
          }
          onClick={() => {
            if (
              input.name &&
              input.brand &&
              input.amount &&
              input.price &&
              input.date &&
              input.purpose
            ) {
              input.price = +input.price;
              input.amount = +input.amount;
              if (update) {
                patchBuyingMachineForBusiness(business, {
                  ...input,
                  price: +input.price,
                  amount: +input.amount,
                  purpose: input.purpose,
                  buyingId: input.buyingId!,
                });
              } else {
                createBuyingMachineForBusiness(business, {
                  ...input,
                  price: +input.price,
                  amount: +input.amount,
                  purpose: input.purpose,
                });
              }
              setOpen(false);
              setUpdate(false);
            }
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateBuyingMachine;
