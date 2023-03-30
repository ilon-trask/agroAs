import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import OperSection from "../modules/OperSection";

import { Context } from "../main";
import CreateCostHandWork from "../modules/CreateCostHandWork";
import CreateCostMaterials from "../modules/CreateCostMaterials";
import CreateCostServices from "../modules/CreateCostServices";
import CreateCostTransport from "../modules/CreateCostTransport";
import CreateCostMechanical from "../modules/CreateCostMechanical/CreateCostMechanical";
import CreateCart, { cartProps } from "../modules/CreateCart";
import GeneralDataTable from "../modules/GeneralDataTable";
import OpersTable from "../modules/OpersTable";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Text, Button, Box } from "@chakra-ui/react";
import NoAuthAlert from "../components/NoAuthAlert";
import DeleteAlert from "../components/DeleteAlert";
import {
  deleteOper,
  getCarts,
  getGrades,
  getMachine,
  getSection,
  getTractor,
} from "../http/requests";
import { CALENDAR_ROUTER } from "../utils/consts";
import ConstructorPopUp from "../modules/ConstructorPopUps/ConstructorPopUp";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TechnologicalMapPdf from "./pdf/TechnologicalMapPdf";
import getSectionsOpers from "../store/GetSectionsOpers";
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
  const myMap = map.maps.find((el) => el.id == id);
  const operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  const sections = useMemo(() => {
    let a = getSectionsOpers(map, +id!);
    console.log(a);

    return a;
  }, [map.opers, operData]);
  useEffect(() => {
    const myMap = map.maps.find((el) => el.id == id);
    console.log(myMap);
    if (!myMap?.tech_operations) {
      getCarts(map, +id!);
      getSection(map);
      getTractor(map);
      getMachine(map);
      getGrades(map);
    }
  }, []);

  return (
    <Box pb={"25px"}>
      <Box px={"40px"}>
        <Box
          mt={"30px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{ fontSize: "20px" }}
        >
          <Button onClick={() => navigate("/")}>{"НА ГОЛОВНУ"}</Button>
          {user.role == "" && (
            <Box>
              <Button onClick={() => setOpenConstructor(true)} as={"button"}>
                Конструктор
              </Button>
              <PDFDownloadLink
                document={
                  <TechnologicalMapPdf cart={myMap!} sections={sections} />
                }
                fileName={"tech_cart"}
              >
                <Button ml={"30px"} as={"button"}>
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
          <Text textAlign={"center"} fontSize={"25px"}>
            Технологічна карта
          </Text>
          <Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <GeneralDataTable
                id={+id!}
                setMapOpen={setMapOpen}
                setRes={setRes}
                setUpdate={setUpdate}
              />
            </Box>
            <OpersTable
              id={+id!}
              setRes={setRes}
              setSecondOpen={setSecondOpen}
              setCell={setCell}
              setUpdate={setUpdate}
              setShowAlert={setShowAlert}
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
            />
          </Box>
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
            <Button
              onClick={() => {
                console.log(CALENDAR_ROUTER + "/" + id);

                navigate(CALENDAR_ROUTER + "/" + id);
              }}
            >
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
