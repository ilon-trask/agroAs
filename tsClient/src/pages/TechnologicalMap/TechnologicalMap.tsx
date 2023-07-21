import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import OperSection from "src/modules/OperSection";

import { Context } from "src/main";
import CreateCostHandWork from "src/modules/CreateCostHandWork";
import CreateCostMaterials from "src/modules/CreateCostMaterials";
import CreateCostServices from "src/modules/CreateCostServices";
import CreateCostTransport from "src/modules/CreateCostTransport";
import CreateCostMechanical from "src/modules/CreateCostMechanical/CreateCostMechanical";
import CreateCart, { cartProps } from "src/modules/CreateCart";
import GeneralDataTable from "src/modules/GeneralDataTable";
import OpersTable from "src/modules/OpersTable";
import { Icell } from "../../../../tRPC serv/controllers/OperService";
import { Text, Button, Box } from "@chakra-ui/react";
import NoAuthAlert from "src/components/NoAuthAlert";
import DeleteAlert from "src/components/DeleteAlert";
import {
  deleteOper,
  downloaded,
  getCarts,
  getGrades,
  getMachine,
  getTractor,
} from "src/http/requests";
import { CALENDAR_ROUTER } from "src/utils/consts";
import ConstructorPopUp from "src/modules/ConstructorPopUps/ConstructorPopUp";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TechnologicalMapPdf from "../pdf/TechnologicalMapPdf";
import getSectionsOpers from "src/store/GetSectionsOpers";
import ComplexChose from "src/modules/ComplexChose";
import MyHeading from "src/ui/MyHeading";
import TechnologicalMapContent from "./TechnologicalMapContent";
export type createOperProps<T> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCell: (cell: Icell | "") => void;
  section: number | "";
  setSection: (section: number | "") => void;
  res: T | {};
  setRes: (res: T | ((res: T) => T) | {}) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  isErr: boolean;
  setIsErr: (isErr: boolean) => void;
};

const TechnologicalMap = observer(() => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [cell, setCell] = useState<Icell | "">("");
  const [section, setSection] = useState<number | "">("");
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState({});
  const [isErr, setIsErr] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [openConstructor, setOpenConstructor] = useState<boolean>(false);
  const { map, user } = useContext(Context);
  let { id } = useParams();
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
    operId: null,
    cartId: null,
  });
  const navigate = useNavigate();
  const pdfContent = useRef<HTMLDivElement>(null);

  let myMap =
    map.maps.find((el) => el.id == id) ||
    map.complex.find((el) => el.id == id) ||
    map.businessCarts.find((el) => el.id == id);
  const operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  const sections = useMemo(() => {
    let a = getSectionsOpers(map, +id!);
    return a;
  }, [map.opers, operData]);
  useEffect(() => {
    const myMap = map.maps.find((el) => el.id == id);
    console.log(myMap);
    getCarts(map, +id!);
    if (!myMap?.tech_operations) {
      getTractor(map);
      getMachine(map);
      getGrades(map);
    }
  }, []);

  return (
    <Box pb={"25px"}>
      <Box px={["10px", "40px"]}>
        <Box
          mt={"30px"}
          display={"flex"}
          flexDirection={["column", "row"]}
          rowGap={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{ fontSize: "20px" }}
        >
          <Button onClick={() => navigate("/")}>{"НА ГОЛОВНУ"}</Button>
          {user.role == "" && (
            <Box
              display={"flex"}
              flexDirection={["column", "row"]}
              columnGap={"30px"}
              rowGap={"10px"}
            >
              <Button onClick={() => setOpenConstructor(true)} as={"button"}>
                Конструктор
              </Button>
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
                  Отримати ПДФ
                </Button>
              </PDFDownloadLink>
              {/* <Button ml={"30px"} as={"button"} onClick={() => print()}>
                Отримати ПДФ
              </Button> */}
            </Box>
          )}
        </Box>
        <Box ref={pdfContent} className="print-container">
          {myMap ? (
            <TechnologicalMapContent
              myMap={myMap}
              useIcons={user.isAuth}
              deleteOpen={deleteOpen}
              id={+id!}
              setCell={setCell}
              setDeleteOpen={setDeleteOpen}
              setMapOpen={setMapOpen}
              setRes={setRes}
              setSecondOpen={setSecondOpen}
              setShowAlert={setShowAlert}
              setUpdate={setUpdate}
            />
          ) : null}
        </Box>
        <Box mt={"15px"} ml={"31px"} display={"flex"} gap={"10px"}>
          <Button
            onClick={
              user.role == ""
                ? () => {
                    setShowAlert(true);
                  }
                : () => {
                    setUpdate(false);
                    setOpen(true);
                  }
            }
          >
            Додати технологічну операцію
          </Button>
          {user.role == "ADMIN" ? (
            <Button onClick={() => navigate(CALENDAR_ROUTER + "/" + id)}>
              Створити календар робіт
            </Button>
          ) : (
            ""
          )}
        </Box>
        <OperSection
          open={open}
          setOpen={setOpen}
          setSecondOpen={setSecondOpen}
          cell={cell}
          setCell={setCell}
          section={section}
          setSection={setSection}
          sectionId={myMap?.sectionId}
        />

        {cell === "costMaterials" ? (
          <CreateCostMaterials
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        ) : cell === "costServices" ? (
          <CreateCostServices
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        ) : cell === "costTransport" ? (
          <CreateCostTransport
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        ) : cell === "costMechanical" ? (
          <CreateCostMechanical
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
            isErr={isErr}
            setIsErr={setIsErr}
            setShowAlert={setShowAlert}
          />
        ) : cell == "costHandWork" ? (
          <CreateCostHandWork
            open={secondOpen}
            setOpen={setSecondOpen}
            res={res}
            setRes={setRes}
            section={section}
            setSection={setSection}
            setCell={setCell}
            update={update}
            setUpdate={setUpdate}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        ) : //@ts-ignore
        cell == "complex" ? (
          <ComplexChose
            open={secondOpen}
            setOpen={setSecondOpen}
            section={section}
            setSection={setSection}
          />
        ) : (
          ""
        )}
        <CreateCart
          open={mapOpen}
          setOpen={setMapOpen}
          update={update}
          setUpdate={setUpdate}
          res={res as cartProps}
          setRes={setRes}
          complex={myMap?.isComplex}
          setComplex={() => {}}
        />
      </Box>
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      <DeleteAlert
        open={deleteOpen.isOpen}
        setOpen={setDeleteOpen}
        text={"операцію"}
        func={() => {
          setDeleteOpen({ ...deleteOpen, isOpen: false });
          deleteOper(map, deleteOpen.operId!, deleteOpen.cartId);
        }}
      />
      <ConstructorPopUp
        open={openConstructor}
        setOpen={setOpenConstructor}
        pdfContent={pdfContent}
        print={print}
        sections={sections}
      />
    </Box>
  );
});
export default TechnologicalMap;