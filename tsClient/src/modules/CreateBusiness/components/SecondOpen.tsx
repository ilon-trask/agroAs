import {
  Box,
  Checkbox,
  Heading,
  Input,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Dialog from "../../../components/Dialog";
import { Context } from "../../../main";
import { CreateBusinessProp } from "../CreateBusiness";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  //   update: boolean;
  //   setUpdate: Dispatch<SetStateAction<boolean>>;
  res: CreateBusinessProp;
  setRes: Dispatch<SetStateAction<CreateBusinessProp>>;
  cultureId: number;
};
const obj = {};
function SecondOpen({ open, setOpen, res, setRes, cultureId }: props) {
  console.log(res);
  console.log("рендер");
  console.log(cultureId);

  const [upd, setUpd] = useState(false);
  function checkIsActive(techId: number) {
    for (let i = 0; i < res.cultureIds?.length; i++) {
      const el = res.cultureIds[i];
      if (el.id == cultureId)
        for (let j = 0; j < el.tech.length; j++) {
          const e = el.tech[j];

          if (e.techId == techId) {
            return true;
          }
        }
    }
    return false;
  }
  function giveInputValue(techId: number) {
    for (let i = 0; i < res.cultureIds?.length; i++) {
      const el = res.cultureIds[i];
      if (el.id == cultureId)
        for (let j = 0; j < el.tech.length; j++) {
          const e = el.tech[j];

          if (e.techId == techId) {
            return e.area;
          }
        }
    }
  }
  function onClose() {
    setRes((prev) => {
      const myCulture = prev.cultureIds.find((el) => el.id == cultureId);
      if (myCulture?.tech?.length == 0) {
        prev.cultureIds = prev.cultureIds.filter((el) => el.id != myCulture.id);
        console.log(prev);

        return prev;
      } else {
        return prev;
      }
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
    >
      <Heading textAlign={"center"} size={"md"}>
        Вибір технології та площі
      </Heading>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"80%"}
        mx={"auto"}
      >
        <Text fontWeight={"bold"}>Технології</Text>
        <Text fontWeight={"bold"}>Площа</Text>
      </Box>
      {map.cultivationTechnologies.map((el) => {
        return (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            w={"80%"}
            mx={"auto"}
            mt={3}
            key={el.id}
          >
            <Checkbox
              isChecked={(() => {
                const res = checkIsActive(el.id!);
                console.log(res);

                return res;
              })()}
              onChange={() => {
                setRes((prev) => {
                  let akk = false;
                  const myCulture = prev.cultureIds.find(
                    (el) => el.id == cultureId
                  );
                  const myTech = myCulture?.tech.find((ex) => {
                    return ex.techId == el.id;
                  });

                  if (myTech) akk = true;
                  // console.log(akk);
                  if (!myCulture) return prev;
                  if (akk) {
                    // console.log("найшло");
                    myCulture.tech = myCulture?.tech.filter(
                      (elx) => elx.techId != el.id
                    );

                    console.log(prev);
                    setUpd((prev) => !prev);
                    return prev;
                  } else {
                    // console.log(prev);
                    myCulture.tech = [
                      ...myCulture?.tech,
                      { techId: el.id!, area: 0 },
                    ];
                    // console.log(prev);
                    setUpd((prev) => !prev);
                    return prev;
                  }

                  return prev;
                });
              }}
            >
              {el.name}
            </Checkbox>
            <Input
              type={"number"}
              inputMode={"numeric"}
              w={"200px"}
              placeholder="Вкажіть площу"
              isDisabled={!checkIsActive(el.id!)}
              value={giveInputValue(el.id!)}
              onChange={(e) => {
                setRes((prev) => {
                  const myCulture = prev.cultureIds.find(
                    (el) => el.id == cultureId
                  );
                  const myTech = myCulture?.tech.find(
                    (ex) => ex.techId == el.id
                  );
                  //@ts-ignore
                  myTech.area = e.target.value as any;
                  return prev;
                });
                setUpd((prev) => !prev);
              }}
            ></Input>
          </Box>
        );
      })}
      <ModalFooter>
        <Button>Внести</Button>
      </ModalFooter>
    </Dialog>
  );
}

export default React.memo(SecondOpen);
