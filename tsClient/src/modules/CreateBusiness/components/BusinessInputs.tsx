import React, { Dispatch, SetStateAction, useContext } from "react";
import { Box, Input, Heading, Select, Text, Checkbox } from "@chakra-ui/react";
import { CreateBusinessProp } from "../CreateBusiness";
import { Context } from "../../../main";
type props = {
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  isEnterprise?: boolean;
};
function BusinessInputs({ res, setRes, isEnterprise }: props) {
  const { map, enterpriseStore } = useContext(Context);
  function setCulture(id: number) {
    if (res.cultureIds.includes(id)) {
      let akk = res.cultureIds.filter((el) => el != id);
      setRes((prev) => ({ ...prev, cultureIds: [...akk] }));
    } else {
      setRes((prev) => ({ ...prev, cultureIds: [...prev.cultureIds, id] }));
    }
  }

  function isCheckedCulture(id: number) {
    if (res.cultureIds?.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <Box>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Внесіть загальні дані бізнес-плану
      </Heading>
      <Box>
        {isEnterprise && (
          <>
            <Text>Виберіть підприємство</Text>
            <Select
              value={res.enterpriseId}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, enterpriseId: +e.target.value }))
              }
            >
              <option value="" hidden defaultChecked>
                Виберіть опцію
              </option>
              {enterpriseStore.enterprise?.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
          </>
        )}
      </Box>
      <Box>
        <Text>Вкажіть назву бізнес-плану</Text>
        <Input
          value={res.name}
          onChange={(e) =>
            setRes((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Впишіть назву"
        />
      </Box>
      <Box>
        <Text>Виберіть культуру</Text>
        <Box>
          {map.culture.map((el) => (
            <Box key={el.id} as="span" ml={2} display={"inline-flex"} gap={1}>
              <Checkbox
                onChange={() => setCulture(el.id!)}
                isChecked={isCheckedCulture(el.id!)}
              />
              <Box
                as="span"
                cursor="pointer"
                onClick={() => setCulture(el.id!)}
              >
                {el.name}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Text>Виберіть технологію</Text>
        <Select>
          {map.cultivationTechnologies.map((el) => (
            <option key={el.id}>{el.name}</option>
          ))}
        </Select>
      </Box>
      <Box>
        <Text>Вкажіть дату початку</Text>
        <Input
          value={res.dateStart}
          onChange={(e) =>
            setRes((prev) => ({ ...prev, dateStart: e.target.value }))
          }
          placeholder="Впишіть дату"
          type={"date"}
        />
      </Box>
      <Box>
        <Text>Вкажіть термін реалізації</Text>
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
      <Box>
        <Text>Вкажіть початкову суму</Text>
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
    </Box>
  );
}

export default BusinessInputs;
