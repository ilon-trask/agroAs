import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  Box,
  Input,
  Heading,
  Select,
  Text,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { CreateBusinessProp } from "../CreateBusiness";
import { Context } from "../../../main";
import SecondOpen from "./SecondOpen";
type props = {
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  isEnterprise?: boolean;
};
function BusinessInputs({ res, setRes, isEnterprise }: props) {
  const { map, enterpriseStore } = useContext(Context);
  const [secondOpen, setSecondOpen] = useState(false);
  const [culture, setCulture] = useState(0);
  // function setCulture(id: number) {
  //   if (res.cultureIds.includes(id)) {
  //     let akk = res.cultureIds.filter((el) => el != id);
  //     setRes((prev) => ({ ...prev, cultureIds: [...akk] }));
  //   } else {
  //     setRes((prev) => ({ ...prev, cultureIds: [...prev.cultureIds, id] }));
  //   }
  // }

  function isCheckedCulture(id: number) {
    console.log(res.cultureIds);

    if (
      res.cultureIds?.find((el) => {
        return el.id == id;
      })
    ) {
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
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box width={"40%"}>
          <Text>Вкажіть назву бізнес-плану</Text>
          <Input
            value={res.name}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Впишіть назву"
          />
        </Box>
        <Box width={"40%"}>
          <Text>Вкажіть тему бізнес-плану</Text>
          <Input
            value={res.topic}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, topic: e.target.value }))
            }
            placeholder="Впишіть тему"
          />
        </Box>
      </Box>
      <Box>
        <Text>Виберіть культуру</Text>
        <Box>
          {map.culture.map((el) => (
            <Box key={el.id} as="span" ml={2} display={"inline-flex"} gap={1}>
              <Button
                onClick={() => {
                  setSecondOpen(true);
                  setRes((prev) => {
                    console.log(prev);

                    if (!prev.cultureIds?.find((e) => e.id == el.id)) {
                      return {
                        ...prev,
                        cultureIds: [
                          ...prev.cultureIds,
                          { id: +el.id!, tech: [] },
                        ],
                      };
                    } else {
                      return prev;
                    }
                  });
                  setCulture(el.id!);
                }}
                variant={isCheckedCulture(el.id!) ? "solid" : "outline"}
              >
                {el.name}
              </Button>
            </Box>
          ))}
        </Box>
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
      <SecondOpen
        cultureId={culture}
        open={secondOpen}
        setOpen={setSecondOpen}
        res={res}
        setRes={setRes}
      />
    </Box>
  );
}

export default BusinessInputs;
