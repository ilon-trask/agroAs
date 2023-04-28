import { AlertDialogFooter, Box, Button, Select, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { createProduction } from "../../../http/requests";
import { Context } from "../../../main";
import { productionProp } from "../CreateProduction";
type props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: productionProp;
  setRes: Dispatch<SetStateAction<productionProp>>;
};
function ProductService({ setOpen, res, setRes }: props) {
  const { map, income } = useContext(Context);
  return (
    <Box>
      <Text textAlign={"center"} fontWeight={"bold"}>
        Виберіть дані
      </Text>
      <Box display={"flex"} mt={3} gap={4} maxW={"80%"} mx={"auto"}>
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть продукт або послугу
          </Text>
          <Select
            value={res.productId}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, productId: +e.target.value }))
            }
          >
            <option value={""} hidden defaultChecked>
              Виберіть
            </option>
            {map.product.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть карту
          </Text>
          <Select
            value={res.techCartId}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, techCartId: +e.target.value }))
            }
          >
            <option value={""} hidden defaultChecked>
              Виберіть
            </option>
            {map.outcome.map((el) => {
              if (el.isUsing)
                return (
                  <option key={el.id} value={el.techCartId}>
                    {el.name}
                  </option>
                );
            })}
          </Select>
        </Box>
      </Box>
      <AlertDialogFooter>
        <Button
          onClick={() => {
            if (res.productId && res.techCartId) {
              createProduction(income, {
                productId: res.productId,
                techCartId: res.techCartId,
                isPrimary: true,
              });
              setOpen(false);
            }
          }}
        >
          Зберегти
        </Button>
      </AlertDialogFooter>
    </Box>
  );
}

export default ProductService;
