import { Box, Button, Heading, Input, ModalFooter } from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Dialog from "src/components/Dialog";
import { createLand, patchLand } from "src/http/requests";
import { Context } from "src/main";
const obj = {};
export interface CreateLandProps {
  landId?: number;
  name: string;
  area: number | string;
  cadastreNumber: number | string;
  businessPlanId?: number;
  enterpriseId: number;
}
function CreateLand({
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
  data: CreateLandProps;
}) {
  const { enterpriseStore } = useContext(Context);
  const [res, setRes] = useState<CreateLandProps>({
    area: "",
    cadastreNumber: "",
    enterpriseId: 0,
    name: "",
  });
  useEffect(() => setRes(data), [data]);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={update}
      setUpdate={setUpdate}
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
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Введіть кадастровий номер
          </Heading>
          <Input
            size={"sm"}
            value={res.cadastreNumber}
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
      <ModalFooter>
        <Button
          isDisabled={
            !res.area && !res.cadastreNumber && !res.enterpriseId && !res.name
          }
          onClick={() => {
            if (
              res.area &&
              res.cadastreNumber &&
              res.enterpriseId &&
              res.name
            ) {
              if (update) {
                patchLand(enterpriseStore, {
                  ...res,
                  area: +res.area,
                  cadastreNumber: +res.cadastreNumber,
                  landId: res.landId!,
                });
              } else {
                createLand(enterpriseStore, {
                  ...res,
                  area: +res.area,
                  cadastreNumber: +res.cadastreNumber,
                });
              }
              setUpdate(false);
              setOpen(false);
              setRes((prev) => ({
                enterpriseId: prev.enterpriseId,
                businessPlanId: prev.businessPlanId,
                area: "",
                cadastreNumber: "",
                name: "",
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
