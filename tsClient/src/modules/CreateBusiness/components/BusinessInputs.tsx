import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Input,
  Heading,
  Select,
  Text,
  Checkbox,
  Button,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react";
import { CreateBusinessProp } from "../CreateBusiness";
import { Context } from "../../../main";
import SecondOpen from "./SecondOpen";
import TableComponent from "src/components/TableComponent";
import { ColumnDef } from "@tanstack/react-table";
import TableContent from "src/components/TableComponent/TableContent";
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
  // console.log(map.culture);

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
            <Text fontWeight={"bold"}>Виберіть підприємство</Text>
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
      <Box>
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
      <Box>
        <Text fontWeight={"bold"}>Виберіть продукт</Text>
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
        <Box>
          {(() => {
            const data = [
              ...res.cultureIds
                .map((cul) =>
                  cul.tech.map((tech) => ({
                    id: tech.techId,
                    product: "",
                    culture: map.culture.find((el) => el.id == cul.id)?.name,
                    technology: map.cultivationTechnologies.find(
                      (el) => el.id == tech.techId
                    )?.name,
                    area: tech.area,
                  }))
                )
                .flat(),
            ];
            const sum = data.reduce((p, c) => p + c.area, 0);
            const columns = useMemo<
              ColumnDef<{
                id: number;
                product: string;
                culture: string;
                technology: string;
                area: string;
              }>
            >(
              () => [
                { header: "", accessorKey: "id" },
                { header: "Продукт", accessorKey: "product" },
                { header: "Культура", accessorKey: "culture" },
                { header: "Технологія", accessorKey: "technology" },
                { header: "Площа", accessorKey: "area" },
              ],
              []
            );
            return (
              <Table size={"sm"}>
                <TableContent columns={columns} data={data} />
                <Tr>
                  <Td colSpan={4}>Корисна площа</Td>
                  <Td>{sum}</Td>
                </Tr>
              </Table>
            );
          })()}
        </Box>
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
