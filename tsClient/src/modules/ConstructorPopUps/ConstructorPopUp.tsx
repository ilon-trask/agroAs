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
import { downloaded, patchOperation, updateMap } from "../../http/requests";
import { useParams } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import {
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../../tRPC serv/controllers/TechCartService";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TechnologicalMapPdf from "../../pages/pdf/TechnologicalMapPdf";
import { sectionsOpers } from "../../store/GetSectionsOpers";
import { prope2 } from "../../../../tRPC serv/controllers/OperService";
import {
  cost_service,
  Icost_service,
} from "../../../../tRPC serv/models/models";

function ConstructorPopUp({
  open,
  setOpen,
  pdfContent,
  print,
  sections,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pdfContent: RefObject<HTMLDivElement>;
  print: () => void;
  sections: sectionsOpers;
}) {
  const { id } = useParams();
  const { map } = useContext(Context);
  const myMap = map.maps.find((el) => el.id == +id!);
  const [cont, setCont] = useState(0);
  const [res, setRes] = useState<resTechCartsWithOpers>(myMap!);
  useEffect(() => {
    setRes(myMap!);
  }, [myMap]);
  const [propRes, setPropRes] = useState<resTechOperation[]>([]);
  const content = [
    <First res={res} setRes={setRes as any} />,
    <Second prop={propRes} setProp={setPropRes} />,
    <Third prop={propRes} setProp={setPropRes} />,
    <Fourth prop={propRes} setProp={setPropRes} />,
    <Fifth prop={propRes} setProp={setPropRes} />,
    <Sixth prop={propRes} setProp={setPropRes} />,
    <Seventh />,
  ];
  const funcs = {
    0: () => {
      if (
        res.area != myMap?.area ||
        res.salary != myMap?.salary ||
        res.priceDiesel != myMap?.priceDiesel ||
        res.nameCart != myMap?.nameCart
      ) {
        console.log(res);
        res.salary = +res?.salary;
        res.area = +res?.area;
        res.priceDiesel = +res?.priceDiesel;
        updateMap(map, res!);
      }
    },
    1: () => {
      propRes.forEach((el) => {
        const myMech = map.costMechanical.find(
          (e) => e.id == el?.aggregate?.id
        );
        //@ts-ignore
        el.operId = el.id;
        //@ts-ignore
        el.nameOper = el.nameOperation;
        //@ts-ignore
        el.salary = myMap?.salary;
        //@ts-ignore
        el.priceDiesel = myMap?.priceDiesel;
        if (
          //@ts-ignore
          myMech?.workingSpeed != el.workingSpeed ||
          //@ts-ignore
          myMech?.fuelConsumption != el.fuelConsumption
        ) {
          patchOperation(map, { cell: "costMechanical", res: el }, myMap?.id!);
        }
      });
    },
    2: () => {
      propRes.forEach((el) => {
        const myHand = map.costHandWork.find(
          (e) => e.id == el?.cost_hand_work?.id
        );
        //@ts-ignore
        el.operId = el.id;
        //@ts-ignore
        el.nameOper = el.nameOperation;
        //@ts-ignore
        el.salary = myMap?.salary;
        // //@ts-ignore
        // el.unitsOfCost = el.cost_material?.unitsOfCost;
        if (
          //@ts-ignore
          myHand?.productionRateTime != el.productionRateTime ||
          //@ts-ignore
          myHand?.yieldСapacity != el.yieldСapacity ||
          //@ts-ignore
          myHand?.productionRateWeight != el.productionRateWeight ||
          //@ts-ignore
          myHand?.spending != el.spending ||
          //@ts-ignore
          myHand?.productionRateAmount != el.productionRateAmount
        ) {
          patchOperation(map, { cell: "costHandWork", res: el }, myMap?.id!);
        }
      });
    },
    3: () => {
      propRes.forEach((el) => {
        const myMater = map.costMaterials.find(
          (e) => e.id == el?.cost_material?.id
        );
        //@ts-ignore
        el.operId = el.id;
        //@ts-ignore
        el.nameOper = el.nameOperation;
        //@ts-ignore
        el.unitsOfConsumption = el?.cost_material?.unitsOfConsumption;
        //@ts-ignore
        el.unitsOfCost = el.cost_material?.unitsOfCost;
        //@ts-ignore
        if (myMater?.price != el.price) {
          patchOperation(map, { cell: "costMaterials", res: el }, myMap?.id!);
        }
      });
    },
    4: () => {
      propRes.forEach((el) => {
        const myService = map.costServices.find(
          (e) => e.id == el?.cost_service?.id
        );
        //@ts-ignore
        el.operId = el.id;
        //@ts-ignore
        el.nameOper = el.nameOperation;
        //@ts-ignore
        el.price = +el.costServices;
        //@ts-ignore
        el.unitsOfCost = el.cost_service?.unitsOfCost;

        if (myService?.price != el.costServices) {
          patchOperation(map, { cell: "costServices", res: el }, myMap?.id!);
        }
      });
    },
    5: () => {
      propRes.forEach((el) => {
        const myTransp = map.costTransport.find(
          (e) => e.id == el?.cost_transport?.id
        );
        //@ts-ignore
        el.operId = el.id;
        //@ts-ignore
        el.nameOper = el.nameOperation;
        //@ts-ignore
        el.price = +el.costTransport;
        //@ts-ignore
        el.unitsOfCost = el.cost_transport?.unitsOfCost;

        if (myTransp?.price != el.costTransport) {
          patchOperation(map, { cell: "costTransport", res: el }, myMap?.id!);
        }
      });
    },
    6: () => {},
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
          {cont != content.length - 1 ? (
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
              Далі
            </Button>
          ) : (
            <PDFDownloadLink
              document={
                <TechnologicalMapPdf cart={myMap!} sections={sections} />
              }
              fileName={"tech_cart"}
            >
              <Button
                as={"button"}
                onClick={() => {
                  downloaded(map, myMap?.id!, myMap?.timesDow!);
                }}
              >
                Отримати
              </Button>
            </PDFDownloadLink>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
export default observer(ConstructorPopUp);
