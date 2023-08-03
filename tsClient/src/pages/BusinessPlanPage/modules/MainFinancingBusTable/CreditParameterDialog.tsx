import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  InputGroup,
  InputRightAddon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Td,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useForm } from "react-hook-form";
import Dialog from "src/components/Dialog";
import { createUpdateCreditParameter } from "src/http/requests";
import { Context } from "src/main";
import useMonthArray from "src/shared/hook/useMonthArray";
import MyHeading from "src/ui/MyHeading";
import usePaymentsFrequencys, {
  PaymentsFrequencysType,
} from "src/shared/hook/usePaymentsFrequencys";
import useRepaymentMethods, {
  RepaymentsMethodsType,
} from "src/shared/hook/useRepaymentMethods";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: CreditParameterProps;
  busId: number;
};

export type CreditParameterProps = {
  id?: number;
  amount: string | number;
  procent: string | number;
  creditTerm: string | number;
  monthlyСommission: string | number;
  commissionForCredit: string | number;
  repaymentMethod: RepaymentsMethodsType | "";
  paymentsFrequency: PaymentsFrequencysType | "";
  year: number;
  month: number;
};
function CreditParameterDialog({ open, setOpen, data, busId }: props) {
  const { business } = useContext(Context);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      amount: 0,
      procent: 0,
      creditTerm: 0,
      monthlyСommission: 0,
      commissionForCredit: 0,
      repaymentMethod: "",
      paymentsFrequency: "",
    },
    values: data,
  });
  const onSubmit = (res: CreditParameterProps) => {
    console.log(res);
    if (res.id && res.repaymentMethod && res.paymentsFrequency)
      createUpdateCreditParameter(business, {
        creditTerm: +res.creditTerm,
        financingId: res.id,
        monthlyСommission: +res.monthlyСommission,
        commissionForCredit: +res.commissionForCredit,
        repaymentMethod: res.repaymentMethod,
        paymentsFrequency: res.paymentsFrequency,
        procent: +res.procent,
        busId,
      });
    setOpen(false);
  };
  return (
    <Dialog open={open} setOpen={setOpen}>
      <Box mx={"20px"}>
        <MyHeading>Кредитний калькулятор</MyHeading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} justifyContent={"space-evenly"} gap={6}>
            <Box>
              <FormLabel>Розмір позики</FormLabel>
              <InputGroup size="sm">
                <Input size="sm" disabled={true} {...register("amount")} />
                <InputRightAddon children="₴" />
              </InputGroup>
            </Box>
            <Box>
              <FormLabel>Процентна ставка</FormLabel>
              <InputGroup size="sm">
                <Input
                  size="sm"
                  maxW={"100px"}
                  {...register("procent", { required: true })}
                />
                <InputRightAddon children="%" />
              </InputGroup>
            </Box>
          </Box>
          <Box
            mt={2}
            display={"flex"}
            justifyContent={"space-evenly"}
            gap={10}
            alignItems="flex-end"
          >
            <Box>
              <FormLabel>Термін кредитування</FormLabel>

              <Input
                size="sm"
                maxW={"180px"}
                {...register("creditTerm", { required: true })}
              />
            </Box>
            <Box>
              <FormLabel>Щомісячна комісія</FormLabel>
              <InputGroup size={"sm"} maxW={"170px"}>
                <Input size="sm" {...register("monthlyСommission")} />{" "}
                <InputRightAddon children="₴" />
              </InputGroup>
            </Box>
            <Box>
              <FormLabel>Комісія за видачу кредиту</FormLabel>
              <InputGroup size={"sm"}>
                <Input size="sm" {...register("commissionForCredit")} />{" "}
                <InputRightAddon children="₴" />
              </InputGroup>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems="flex-end"
            mt={2}
          >
            <Box>
              <FormLabel>Спосіб погашення</FormLabel>
              <Select
                size="sm"
                {...register("repaymentMethod", { required: true })}
              >
                <option value="" hidden defaultChecked>
                  Виберіть опцію
                </option>{" "}
                {useRepaymentMethods.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel>Частота платежів</FormLabel>
              <Select
                size="sm"
                {...register("paymentsFrequency", { required: true })}
              >
                <option value="" hidden defaultChecked>
                  Виберіть опцію
                </option>
                {usePaymentsFrequencys.map((el) => (
                  <option value={el.name} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          <Box>
            <MyHeading fontSize={"20"}>Результат</MyHeading>
            <Box mt={2} maxH={"416px"} overflowY={"auto"}>
              <Tabs align="center">
                <TabList>
                  <Tab>Відсотки</Tab>
                  <Tab>Діаграма</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Table size="sm">
                      <Thead>
                        <Tr>
                          <Th>Дата</Th>
                          <Th>Тіло кредиту</Th>
                          <Th>Відсотки</Th>
                          <Th>Платежі</Th>
                          <Th>Залишок боргу</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {(() => {
                          if (watch("paymentsFrequency") == "Кожен рік") {
                            const res = [];
                            if (watch("repaymentMethod") == "Класична схема") {
                              let remainder = data.amount;
                              const amount = +(
                                +data.amount / +watch("creditTerm")
                              ).toFixed(2);
                              for (
                                let i = data.year + 1;
                                i <= +data.year + +watch("creditTerm");
                                i++
                              ) {
                                res.push(
                                  <Tr key={i}>
                                    <Td>{i}</Td>
                                    <Td>{amount}</Td>
                                    <Td>
                                      {
                                        +(
                                          +remainder *
                                          (+watch("procent") / 100)
                                        ).toFixed(2)
                                      }
                                    </Td>
                                    <Td>
                                      {
                                        +(
                                          amount +
                                          +(
                                            +remainder *
                                            (+watch("procent") / 100)
                                          ).toFixed(2)
                                        ).toFixed(2)
                                      }
                                    </Td>
                                    <Td>
                                      {(() => {
                                        //@ts-ignore
                                        remainder -= amount;
                                        return +(+remainder).toFixed(2);
                                      })()}
                                    </Td>
                                  </Tr>
                                );
                              }
                            }
                            return res;
                          } else if (
                            watch("paymentsFrequency") == "Кожний місяць"
                          ) {
                            const res = [];
                            if (watch("repaymentMethod") == "Класична схема") {
                              const amount = +(
                                +data.amount /
                                (+watch("creditTerm") * 12)
                              ).toFixed(2);
                              let remainder = data.amount;

                              for (
                                let i = data.year;
                                i <= +data.year + +watch("creditTerm");
                                i++
                              ) {
                                let sumAmount = 0;
                                let sumProcent = 0;
                                let sumPayment = 0;
                                let month = 0;
                                if (i == data.year) {
                                  month = data.month;
                                }
                                let max = 12;
                                if (i == +data.year + +watch("creditTerm")) {
                                  max = data.month;
                                }
                                for (let j = month; j < max; j++) {
                                  sumAmount += amount;
                                  sumProcent += +(
                                    +remainder *
                                    (+watch("procent") / 100)
                                  ).toFixed(2);
                                  sumPayment += +(
                                    amount +
                                    +(
                                      +remainder *
                                      (+watch("procent") / 100)
                                    ).toFixed(2)
                                  ).toFixed(2);
                                  res.push(
                                    <Tr key={j + "" + i}>
                                      <Td>{useMonthArray[j]?.name}</Td>
                                      <Td>{amount}</Td>
                                      <Td>
                                        {
                                          +(
                                            +remainder *
                                            (+watch("procent") / 100)
                                          ).toFixed(2)
                                        }
                                      </Td>
                                      <Td>
                                        {
                                          +(
                                            amount +
                                            +(
                                              +remainder *
                                              (+watch("procent") / 100)
                                            ).toFixed(2)
                                          ).toFixed(2)
                                        }
                                      </Td>
                                      <Td>
                                        {(() => {
                                          //@ts-ignore
                                          remainder -= amount;
                                          return +(+remainder).toFixed(2);
                                        })()}
                                      </Td>
                                    </Tr>
                                  );
                                }
                                console.log(i);
                                res.push(
                                  <Tr key={i}>
                                    <Td fontWeight={"bold"}>{i}</Td>
                                    <Td fontWeight={"bold"}>
                                      {+sumAmount.toFixed(2)}
                                    </Td>
                                    <Td fontWeight={"bold"}>
                                      {+sumProcent.toFixed(2)}
                                    </Td>
                                    <Td fontWeight={"bold"}>
                                      {+sumPayment.toFixed(2)}
                                    </Td>
                                  </Tr>
                                );
                              }
                            }
                            return res;
                          }
                          return (
                            <Tr>
                              <Td colSpan={5}>
                                <Text textAlign={"center"} fontSize={"18px"}>
                                  Ви не заповнили всі поля
                                </Text>
                              </Td>
                            </Tr>
                          );
                        })()}
                      </Tbody>
                    </Table>
                  </TabPanel>
                  <TabPanel>
                    <p>one!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Box>
          <ModalFooter>
            <Button type="submit">Зберегти</Button>
          </ModalFooter>
        </form>
      </Box>
    </Dialog>
  );
}

export default CreditParameterDialog;
