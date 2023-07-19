import {
  Box,
  Heading,
  Input,
  ModalFooter,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import Dialog from "../../../../components/Dialog";
import { createBusProd, patchBusProd } from "../../../../http/requests";
import { Context } from "../../../../main";
export type productProps = {
  ownId?: number;
  year: number;
  productId: number;
  cultivationTechnologyId: number;
  techCartId: number;
  area: string;
};
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: productProps;
  setData: Dispatch<SetStateAction<productProps>>;
};
const obj = {};
function SecondOpen({ open, setOpen, data, setData }: props) {
  const [res, setRes] = useState(data);
  const { business, map } = useContext(Context);
  const { id } = useParams();
  useEffect(() => {
    setRes(data);
  }, [data]);

  const [cultureId, setCultureId] = useState(
    map.product.find((el) => el.id == res.productId)?.cultureId! || 0
  );
  console.log(map.product.filter((el) => el.cultureId == cultureId));
  const onClose = () => {};
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={true}
      setUpdate={() => {}}
      isErr={false}
      setRes={() => {}}
      setIsErr={() => {}}
      props={obj}
      res={obj}
      onClose={onClose}
      size="3xl"
    >
      <Heading textAlign={"center"} size={"md"}>
        Вибір технології та площі
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box>
          <label>
            Виберіть культуру
            <Select
              value={cultureId}
              onChange={(e) => setCultureId(+e.target.value)}
            >
              <option value="" defaultChecked hidden>
                Виберіть опцію
              </option>
              {map.culture.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
          </label>
        </Box>
        <Box>
          <label>
            Виберіть продукт
            <Select
              value={res?.productId}
              onChange={(e) => {
                setCultureId(
                  map.product.find((el) => el.id == +e.target.value)?.cultureId!
                );
                setRes((prev) => ({ ...prev, productId: +e.target.value }));
              }}
            >
              <option value="" defaultChecked hidden>
                Виберіть опцію
              </option>
              {(() => {
                console.log("cultureId");
                console.log(cultureId);
                console.log(map.product);

                let prod =
                  cultureId == 0
                    ? map.product
                    : map.product.filter((el) => el.cultureId == cultureId);
                return prod.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ));
              })()}
            </Select>
          </label>
        </Box>
        <Box>
          <label>
            Виберіть технологію
            <Select
              value={res.cultivationTechnologyId}
              onChange={(e) =>
                setRes((prev) => ({
                  ...prev,
                  cultivationTechnologyId: +e.target.value,
                }))
              }
            >
              <option value="" hidden defaultChecked>
                Виберіть опцію
              </option>
              {map.cultivationTechnologies.map((el) => (
                <option value={el.id} key={el.id}>
                  {el.name}
                </option>
              ))}
            </Select>
          </label>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box minW={"max-content"}>
          <label>
            Виберіть технологічну карту
            <Select
              value={res.techCartId || 0}
              onChange={(e) =>
                setRes((prev) => ({ ...prev, techCartId: +e.target.value }))
              }
            >
              <option value="" hidden defaultChecked>
                Виберіть опцію
              </option>
              {map.businessCarts.map((el) => (
                <option value={el.id}>{el.nameCart}</option>
              ))}
            </Select>
          </label>
        </Box>
        <Box>
          <Text>Впишіть площу</Text>
          <Input
            type={"number"}
            inputMode={"numeric"}
            placeholder="Вкажіть площу"
            value={res.area}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, area: e.target.value }))
            }
          />
        </Box>
      </Box>
      <ModalFooter>
        <Button
          onClick={() => {
            setOpen(false);
            if (res.ownId) {
              patchBusProd(business, {
                area: +res.area,
                businessPlanId: +id!,
                cultivationTechnologyId: res.cultivationTechnologyId,
                ownId: res.ownId,
                productId: res.productId,
                techCartId: res.techCartId,
                year: res.year,
              });
            } else {
              console.log(res);

              createBusProd(business, {
                area: +res.area,
                businessPlanId: +id!,
                cultivationTechnologyId: res.cultivationTechnologyId,
                productId: res.productId,
                techCartId: res.techCartId,
                year: res.year,
              });
            }
          }}
        >
          Внести
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default React.memo(SecondOpen);
