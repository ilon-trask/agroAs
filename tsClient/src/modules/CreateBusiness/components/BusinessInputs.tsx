import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Box, Input, Heading, Text, Select } from "@chakra-ui/react";
import { CreateBusinessProp } from "../CreateBusiness";
import { Context } from "../../../main";
type props = {
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  isWOEnterprise?: boolean;
};
function BusinessInputs({ res, setRes, isWOEnterprise }: props) {
  const { enterpriseStore } = useContext(Context);
  // const [secondOpen, setSecondOpen] = useState(false);
  // const [culture, setCulture] = useState(0);
  // function setCulture(id: number) {
  //   if (res.cultureIds.includes(id)) {
  //     let akk = res.cultureIds.filter((el) => el != id);
  //     setRes((prev) => ({ ...prev, cultureIds: [...akk] }));
  //   } else {
  //     setRes((prev) => ({ ...prev, cultureIds: [...prev.cultureIds, id] }));
  //   }
  // }
  // console.log(map.culture);

  // function isCheckedCulture(id: number) {
  //   console.log(res.cultureIds);

  //   if (
  //     res.cultureIds?.find((el) => {
  //       return el.id == id;
  //     })
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <Box>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть загальні дані бізнес-плану
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box width={"40%"}>
          <Text fontWeight={"bold"}>Вкажіть назву бізнес-плану</Text>
          <Input
            value={res.name}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Впишіть назву"
          />
        </Box>
        <Box width={"40%"}>
          <Text fontWeight={"bold"}>Вкажіть тему бізнес-плану</Text>
          <Input
            value={res.topic}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, topic: e.target.value }))
            }
            placeholder="Впишіть тему"
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box width={"40%"}>
          <Text fontWeight={"bold"}>Вкажіть дату початку</Text>
          <Input
            value={res.dateStart}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, dateStart: e.target.value }))
            }
            placeholder="Впишіть дату"
            type={"date"}
          />
        </Box>
        <Box width={"40%"}>
          <Text fontWeight={"bold"}>Вкажіть термін реалізації</Text>
          <Input
            value={res.realizationTime}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                realizationTime: e.target.value as any,
              }))
            }
            placeholder="Впишіть термін"
            type={"number"}
            inputMode={"numeric"}
          />
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box width={"40%"}>
          <Text fontWeight={"bold"}>Вкажіть початкову суму</Text>
          <Input
            value={res.initialAmount}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                initialAmount: e.target.value as any,
              }))
            }
            placeholder="Впишіть термін"
            type={"number"}
            inputMode={"numeric"}
          />
        </Box>
        {!isWOEnterprise ? (
          <Box width={"40%"}>
            <Text fontWeight={"bold"}>Виберіть підприємство</Text>
            <Select
              value={res.enterpriseId!}
              onChange={(e) =>
                setRes((prev) => ({
                  ...prev,
                  enterpriseId: e.target.value,
                }))
              }
            >
              <option value="" hidden defaultChecked>
                Виберіть опцію
              </option>
              {enterpriseStore.enterprise.map((el) => (
                <option value={el.id!}>{el.name}</option>
              ))}
            </Select>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default BusinessInputs;
