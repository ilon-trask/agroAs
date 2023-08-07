import { Box, Button, Heading, Input, ModalFooter } from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Dialog from "src/components/Dialog";
import {
  createBuildingForBusiness,
  patchBuildingForBusiness,
} from "src/http/requests";
import { Context } from "src/main";
const obj = {};
export interface CreateBuildingProps {
  id?: number;
  name: string;
  date: string;
  year: number;
  description: string;
  startPrice: string | number;
  introductionDate?: string | null;
  depreciationPeriod?: number | string | null;
  businessPlanId: number | null | undefined;
  enterpriseId?: number;
}
function CreateBuilding({
  open,
  setOpen,
  update,
  setUpdate,
  data,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  data: CreateBuildingProps;
}) {
  const { business } = useContext(Context);
  const [res, setRes] = useState<CreateBuildingProps>(data);
  useEffect(() => setRes(data), [data]);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={update}
      setUpdate={setUpdate}
      res={obj}
      setRes={setRes}
      props={obj}
      isErr={false}
      setIsErr={() => {}}
      onClose={() =>
        setRes((prev) => ({
          enterpriseId: prev.enterpriseId,
          businessPlanId: prev.businessPlanId,
          description: "",
          date: "",
          name: "",
          startPrice: "",
          year: 0,
        }))
      }
    >
      <Heading textAlign={"center"} fontWeight={"bold"} size={"md"}>
        Впишіть дані для стоворення земельної ділянки
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
            Введіть опис
          </Heading>
          <Input
            size={"sm"}
            value={res.description}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </Box>
        <Box maxW={"190px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть стартову ціну
          </Heading>
          <Input
            size={"sm"}
            value={res.startPrice}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, startPrice: e.target.value }))
            }
          />
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.description && !res.name && !res.startPrice}
          onClick={() => {
            if (res.description && res.name && res.startPrice) {
              if (update) {
                patchBuildingForBusiness(business, {
                  ...res,
                  businessPlanId: res.businessPlanId!,
                  startPrice: +res.startPrice,
                  enterpriseId: res.enterpriseId!,
                  buildId: res.id!,
                });
              } else {
                createBuildingForBusiness(business, {
                  ...res,
                  businessPlanId: res.businessPlanId!,
                  startPrice: +res.startPrice,
                  enterpriseId: res.enterpriseId!,
                });
              }
              setUpdate(false);
              setOpen(false);
              setRes((prev) => ({
                enterpriseId: prev.enterpriseId,
                businessPlanId: prev.businessPlanId,
                description: "",
                date: "",
                name: "",
                startPrice: "",
                year: 0,
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

export default CreateBuilding;
