import {
  Box,
  Checkbox,
  Heading,
  Input,
  ModalFooter,
  Button,
  Select,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
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
import { changeBusinessProducts } from "../../../../http/requests";
import { Context } from "../../../../main";
export type productIds = {
  ownId: number;
  year: number;
  productId: number;
  tech: {
    cultivationTechnologyId: number;
    techCartId: number;
    area: string | number;
  }[];
}[];
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: productIds;
  setData: Dispatch<SetStateAction<productIds>>;
  ownId: number | undefined;
};
const obj = {};
function SecondOpen({ open, setOpen, data, setData, ownId }: props) {
  const [upd, setUpd] = useState(false);
  const [res, setRes] = useState(data);
  const { business } = useContext(Context);
  const { id } = useParams();
  useEffect(() => {
    setRes(data);
  }, [data]);
  const [culture, setCulture] = useState(0);
  let thisProduct = res.find((el) => el.ownId == ownId);
  function checkIsActive(techId: number) {
    const data = res.find((el) => el.ownId == thisProduct?.ownId);
    const e = data?.tech.find((el) => el.cultivationTechnologyId == techId);
    if (e) return true;
    return false;
  }
  function giveInputValue(techId: number) {
    for (let j = 0; j < (thisProduct?.tech.length || 0); j++) {
      const e = thisProduct?.tech[j];
      if (e?.cultivationTechnologyId == techId) return e.area;
    }
  }
  function onClose() {
    setData((prev) => {
      const thisPrev = prev.find((el) => el.ownId == ownId);
      if (thisPrev?.tech?.length == 0) {
        return prev.filter((el) => el.ownId != thisPrev.ownId);
      }
      return prev;
    });
  }
  const { map } = useContext(Context);
  console.log("resultamba");
  console.log(ownId);

  console.log(res);
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
      size="4xl"
    >
      <Heading textAlign={"center"} size={"md"}>
        Вибір технології та площі
      </Heading>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Box width={"40%"}>
          <label>
            Виберіть культуру
            <Select
              value={culture}
              onChange={(e) => setCulture(+e.target.value)}
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
        <Box width={"40%"}>
          <label>
            Виберіть продукт
            <Select
              value={thisProduct?.productId}
              onChange={(e) => {
                setCulture(
                  map.product.find((el) => el.id == +e.target.value)?.cultureId!
                );
                setRes((prev) => {
                  const thisPrev = prev.find(
                    (el) => el.ownId == thisProduct?.ownId
                  );
                  if (!thisPrev) return prev;
                  thisPrev.productId = +e.target.value;
                  console.log(thisPrev);
                  console.log(e.target.value);
                  setUpd((prev) => !prev);
                  return prev;
                });
              }}
            >
              <option value="" defaultChecked hidden>
                Виберіть опцію
              </option>
              {(() => {
                let prod =
                  culture == 0
                    ? map.product
                    : map.product.filter((el) => el.cultureId == culture);
                return prod.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ));
              })()}
            </Select>
          </label>
        </Box>
      </Box>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Td>Технології</Td>
            <Td>Карта</Td>
            <Td>Площа</Td>
          </Tr>
        </Thead>
        <Tbody>
          {map.cultivationTechnologies.map((el) => (
            <Tr key={el.id}>
              <Td>
                <Checkbox
                  isChecked={checkIsActive(el.id!)}
                  onChange={() => {
                    setRes((prev) => {
                      if (!thisProduct) return prev;
                      const thisPrev = prev.find(
                        (el) => el.ownId == thisProduct?.ownId
                      );
                      if (!thisPrev) return prev;
                      const myTech = thisProduct?.tech.find((ex) => {
                        return ex.cultivationTechnologyId == el.id;
                      });
                      if (myTech) {
                        thisPrev.tech = thisProduct?.tech.filter(
                          (elx) => elx.cultivationTechnologyId != el.id
                        );
                        setUpd((prev) => !prev);
                        return prev;
                      } else {
                        thisPrev.tech = [
                          ...thisProduct?.tech,
                          {
                            cultivationTechnologyId: el.id!,
                            area: 0,
                            techCartId: 0,
                          },
                        ];
                        setUpd((prev) => !prev);
                        return prev;
                      }
                    });
                  }}
                >
                  {el.name}
                </Checkbox>
              </Td>
              <Td>
                <Select
                  value={
                    thisProduct?.tech.find(
                      (e) => e.cultivationTechnologyId == el.id!
                    )?.techCartId
                  }
                  isDisabled={!checkIsActive(el.id!)}
                  onChange={(e) => {
                    setRes((prev) => {
                      const thisPrev = prev.find(
                        (el) => el.ownId == thisProduct?.ownId
                      );
                      if (!thisPrev) return prev;
                      const thisTech = thisPrev.tech.find(
                        (e) => e.cultivationTechnologyId == el.id
                      );
                      if (!thisTech) return prev;
                      thisTech.techCartId = +e.target.value;
                      setUpd((prev) => !prev);
                      return prev;
                    });
                  }}
                >
                  <option value="" hidden defaultChecked>
                    Виберіть опцію
                  </option>
                  {map.businessCarts.map((el) => (
                    <option value={el.id}>{el.nameCart}</option>
                  ))}
                </Select>
              </Td>
              <Td>
                <Input
                  type={"number"}
                  inputMode={"numeric"}
                  w={"200px"}
                  placeholder="Вкажіть площу"
                  isDisabled={!checkIsActive(el.id!)}
                  value={giveInputValue(el.id!)}
                  onChange={(e) => {
                    setRes((prev) => {
                      const thisPrev = prev.find(
                        (el) => el.ownId == thisProduct?.ownId
                      );
                      const myTech = thisProduct?.tech.find(
                        (ex) => ex.cultivationTechnologyId == el.id
                      );
                      //@ts-ignore
                      myTech.area = e.target.value as any;
                      return prev;
                    });
                    setUpd((prev) => !prev);
                  }}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ModalFooter>
        <Button
          onClick={() => {
            setOpen(false);
            changeBusinessProducts(business, { busId: +id!, productIds: res });
          }}
        >
          Внести
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default React.memo(SecondOpen);
