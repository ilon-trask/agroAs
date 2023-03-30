import { Box, Button, Heading } from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import Dialog from "../../components/Dialog";
import First from "./first/First";
import Second from "./second/Second";
import Third from "./third/Third";
import Fourth from "./fourth/Fourth";
import Fifth from "./fifth/Fifth";
import Sixth from "./sixth/Sixth";
import Seventh from "./seventh/Seventh";
import { updateMap } from "../../http/requests";
import { useParams } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";

function ConstructorPopUp({
  open,
  setOpen,
  pdfContent,
  print,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pdfContent: RefObject<HTMLDivElement>;
  print: () => void;
}) {
  const { id } = useParams();
  const { map } = useContext(Context);
  const myMap = map.maps.find((el) => el.id == +id!);
  const [cont, setCont] = useState(0);
  const [res, setRes] = useState<resTechCartsWithOpers>(myMap!);
  useEffect(() => {
    setRes(myMap!);
  }, [myMap]);
  const content = [
    <First res={res} setRes={setRes as any} />,
    <Second />,
    <Third />,
    <Fourth />,
    <Fifth />,
    <Sixth />,
    <Seventh />,
  ];
  const funcs = {
    0: () => {
      console.log(res);
      res.salary = +res?.salary;
      res.area = +res?.area;
      res.priceDiesel = +res?.priceDiesel;
      updateMap(map, res!);
    },
    1: () => {},
    2: () => {},
    3: () => {},
    4: () => {},
    5: () => {},
    6: () => {
      console.log("print");

      print();
    },
  };
  return (
    <Dialog
      isErr={false}
      open={open}
      setOpen={setOpen}
      setIsErr={() => {}}
      update={false}
      res={{}}
      setRes={() => {}}
      setUpdate={() => {}}
      props={{}}
    >
      <Box py={"20px"}>
        {/* <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
          Змінити загальні данні
        </Heading> */}
        {content[cont]}
        <Box display={"flex"} justifyContent={" space-evenly"}>
          {cont != 0 && (
            <Button
              onClick={() => {
                setCont((prev) => {
                  if (prev > 0) return prev - 1;
                  else return prev;
                });
              }}
            >
              Назад
            </Button>
          )}
          <Button
            onClick={() => {
              //@ts-ignore
              funcs[cont]();

              setCont((prev) => {
                if (prev < content.length - 1) return prev + 1;
                else return prev;
              });
            }}
          >
            {cont != content.length - 1 ? "Далі" : "Отримати"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
export default observer(ConstructorPopUp);
