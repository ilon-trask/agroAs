import { Box, Button, Heading, Input, ModalFooter } from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Dialog from "src/components/Dialog";
import { createBuilding, patchBuilding } from "src/http/requests";
import { Context } from "src/main";
const obj = {};
export interface CreateBuildingProps {
  id?: number;
  name: string;
  depreciationPeriod: string;
  startPrice: string;
  businessPlanId?: number;
  enterpriseId: number;
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
  const { enterpriseStore } = useContext(Context);
  const [res, setRes] = useState<CreateBuildingProps>({
    depreciationPeriod: "",
    name: "",
    startPrice: "",
    enterpriseId: 0,
  });
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
          depreciationPeriod: "",
          name: "",
          startPrice: "",
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
            Введіть <br />
            амортизаційний період
          </Heading>
          <Input
            size={"sm"}
            value={res.depreciationPeriod}
            type={"number"}
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                depreciationPeriod: e.target.value,
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
          isDisabled={
            !res.depreciationPeriod &&
            !res.enterpriseId &&
            !res.name &&
            !res.startPrice
          }
          onClick={() => {
            if (
              res.depreciationPeriod &&
              res.enterpriseId &&
              res.name &&
              res.startPrice
            ) {
              if (update) {
                patchBuilding(enterpriseStore, {
                  ...res,
                  startPrice: +res.startPrice,
                  enterpriseId: res.enterpriseId!,
                  buildId: res.id!,
                });
              } else {
                createBuilding(enterpriseStore, {
                  ...res,
                  startPrice: +res.startPrice,
                  enterpriseId: res.enterpriseId!,
                });
              }
              setUpdate(false);
              setOpen(false);
              setRes((prev) => ({
                enterpriseId: prev.enterpriseId,
                businessPlanId: prev.businessPlanId,
                depreciationPeriod: "",
                name: "",
                startPrice: "",
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
