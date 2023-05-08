import {
  AlertDialogFooter,
  Box,
  Button,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { createProduction, patchProduction } from "../../../http/requests";
import { Context } from "../../../main";
import useProductionTypes from "../../../pages/hook/useProductionTypes";
import { productionProp } from "../CreateProduction";
type props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  res: productionProp;
  setRes: Dispatch<SetStateAction<productionProp>>;
  setProductOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};
function ProductService({
  setOpen,
  res,
  setRes,
  setProductOpen,
  update,
  setUpdate,
}: props) {
  const { map, income, user } = useContext(Context);
  return (
    <Box>
      <Text textAlign={"center"} fontWeight={"bold"}>
        Виберіть дані
      </Text>
      <Box mt={3} gap={4} maxW={"90%"} mx={"auto"}>
        <Box
          w={"100%"}
          display={"flex"}
          gap={4}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть продукт або послугу
          </Text>
          <Select
            width={"fit-content"}
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
          {user.role == "service_role" && (
            <Button
              onClick={() => {
                setProductOpen(true);
              }}
            >
              Створити новий
            </Button>
          )}
        </Box>
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть карту
          </Text>
          <Select
            value={res.techCartId}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, techCartId: e.target.value as any }))
            }
          >
            <option value={""} hidden defaultChecked>
              Виберіть
            </option>
            {map.maps.map((el) => {
              const product = map.product.find((e) => e.id == res.productId);
              const culture = map.culture.find(
                (e) => e.id == product?.cultureId
              );
              if (el?.cultureId == culture?.id)
                return (
                  <option key={el.id} value={el.id}>
                    {el.nameCart}
                  </option>
                );
              // } else if (culture?.name == "Не визначино") {
              //   return (
              //     <option key={el.id} value={0} defaultChecked>
              //       Не визначено
              //     </option>
              //   );
              // }
            })}
          </Select>
        </Box>
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть тип виробництва
          </Text>
          <Select
            //@ts-ignore
            value={res.isPrimary}
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                isPrimary: e.target.value as any,
              }))
            }
          >
            <option value={""} hidden defaultChecked>
              Виберіть
            </option>
            {useProductionTypes.map((el) => (
              //@ts-ignore
              <option key={el.id} value={el.value}>
                {el.name}
              </option>
            ))}
          </Select>
        </Box>
        <Box w={"100%"}>
          <Text textAlign={"center"} fontWeight={"bold"}>
            Виберіть рік планування
          </Text>
          <Input
            value={res.year}
            type="number"
            inputMode="numeric"
            onChange={(e) =>
              setRes((prev) => ({
                ...prev,
                year: e.target.value as any,
              }))
            }
          />
        </Box>
      </Box>
      <AlertDialogFooter>
        <Button
          onClick={() => {
            if (res.productId && res.techCartId && res.isPrimary && res.year) {
              if (update) {
                patchProduction(income, {
                  prodId: res.prodId!,
                  //@ts-ignore
                  isPrimary: res.isPrimary == "true",
                  productId: res.productId,
                  techCartId: res.techCartId,
                  year: +res.year,
                });
              } else {
                createProduction(income, {
                  productId: res.productId,
                  techCartId: +res.techCartId,
                  //@ts-ignore
                  isPrimary: res.isPrimary == "true",
                  year: +res.year,
                });
              }
              setOpen(false);
              setUpdate(false);
              //@ts-ignore
              setRes({});
            }
          }}
        >
          Зберегти
        </Button>
      </AlertDialogFooter>
    </Box>
  );
}

export default observer(ProductService);
