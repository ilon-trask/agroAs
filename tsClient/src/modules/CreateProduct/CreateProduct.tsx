import {
  Box,
  Input,
  Select,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Dialog from "../../components/Dialog";
import { createProduct } from "../../http/requests";
import { Context } from "../../main";
type props = {
  res: CreateProductProps;
  setRes: Dispatch<SetStateAction<CreateProductProps>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const obj = {};
export type CreateProductProps = {
  name: string;
  cultureId: number | "";
};
function CreateProduct({ open, setOpen, res, setRes }: props) {
  const { map } = useContext(Context);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      isErr={false}
      props={obj}
      res={obj}
      setRes={setRes}
      setIsErr={() => {}}
      setUpdate={() => {}}
      update={false}
    >
      <Text textAlign={"center"} fontWeight={"bold"}>
        Виберіть дані
      </Text>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box>
          <Text size={"md"}>Впишіть назву</Text>
          <Input
            value={res.name}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Box>
        <Box>
          <Text size={"md"}>Виберіть культуру</Text>
          <Select
            value={res.cultureId}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, cultureId: +e.target.value }))
            }
          >
            <option value="" hidden defaultChecked>
              Виберіть опцію
            </option>
            {map.culture.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <ModalFooter>
        <Button
          isDisabled={!res.name || !res.cultureId}
          onClick={() => {
            if (res.name && res.cultureId) {
              //@ts-ignore
              createProduct(map, res);
              setOpen(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Збегерти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default CreateProduct;
