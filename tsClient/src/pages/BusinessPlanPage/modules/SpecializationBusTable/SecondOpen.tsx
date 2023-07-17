import {
  Box,
  Checkbox,
  Heading,
  Input,
  Text,
  ModalFooter,
  Button,
  Select,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "../../../../components/Dialog";
import { Context } from "../../../../main";
export type productIds = {
  ownId: number;
  year: number;
  productId: number;
  tech: { cultivationTechnologyId: number; techCartId: number; area: number }[];
}[];
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: productIds;
  setData: Dispatch<SetStateAction<productIds>>;
  year: number;
  ownId: number | undefined;
};
const obj = {};
function SecondOpen({ open, setOpen, data, setData, year, ownId }: props) {
  const [upd, setUpd] = useState(false);
  const [res, setRes] = useState(data);
  const [culture, setCulture] = useState(0);
  let thisProduct = res.find((el) => el.year == year && el.ownId == ownId);
  if (!thisProduct) {
    res.push({ ownId: ownId!, productId: 0, tech: [], year: year });
    thisProduct = res.find((el) => el.year == year && el.ownId == ownId);
  }
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
    setRes((prev) => {
      const myCulture = prev.find((el) => el.ownId == ownId);
      if (myCulture?.tech?.length == 0) {
        prev = prev.filter((el) => el.ownId != myCulture.ownId);
      }
      return prev;
    });
  }
  const { map } = useContext(Context);

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
        <Box maxW={"40%"}>
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
                <option value={el.id}>{el.name}</option>
              ))}
            </Select>
          </label>
        </Box>
        <Box maxW={"40%"}>
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
                  <option value={el.id}>{el.name}</option>
                ));
              })()}
            </Select>
          </label>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"90%"}
        mx={"auto"}
      >
        <Text fontWeight={"bold"}>Технології</Text>
        <Text fontWeight={"bold"}>Площа</Text>
      </Box>
      {map.cultivationTechnologies.map((el) => (
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          w={"90%"}
          mx={"auto"}
          mt={3}
          key={el.id}
        >
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
                    { cultivationTechnologyId: el.id!, area: 0, techCartId: 0 },
                  ];
                  setUpd((prev) => !prev);
                  return prev;
                }
              });
            }}
          >
            {el.name}
          </Checkbox>
          <Box>
            <Select
              value={
                thisProduct?.tech.find(
                  (e) => e.cultivationTechnologyId == el.id!
                )?.techCartId
              }
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
          </Box>
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
        </Box>
      ))}
      <ModalFooter>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Внести
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default React.memo(SecondOpen);
