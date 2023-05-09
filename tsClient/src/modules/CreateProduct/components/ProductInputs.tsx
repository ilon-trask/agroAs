import React, { Dispatch, SetStateAction, useContext } from "react";
import { Box, Text, Select, Input } from "@chakra-ui/react";
import { Context } from "../../../main";
import { CreateProductProps } from "../CreateProduct";
type props = {
  res: CreateProductProps;
  setRes: Dispatch<SetStateAction<CreateProductProps>>;
};
function ProductInputs({ res, setRes }: props) {
  const { map } = useContext(Context);
  return (
    <Box>
      <Text textAlign={"center"} fontWeight={"bold"}>
        Внесіть загальні дані про продукт
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
    </Box>
  );
}

export default ProductInputs;
