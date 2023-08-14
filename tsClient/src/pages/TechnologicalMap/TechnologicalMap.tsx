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

import { Icell } from "../../../../tRPC serv/controllers/OperService";
import { Button, Box, Table, Thead, Tbody, Th, Tr, Td } from "@chakra-ui/react";
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

import TechnologicalMapContent from "./TechnologicalMapContent";
import { DoughnutChart } from "src/shared/charts";
import MyHeading from "src/ui/MyHeading";
import { CartNamesData } from ".";
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

  let myMap = map.allMaps.find((el) => el.id == id);
  const operData = map.opers.filter((el) => el?.techCartId == id);
  operData.sort((a, b) => a.id! - b.id!);
  const sections = useMemo(
    () => getSectionsOpers(map, +id!),
    [map.opers, operData]
  );
  console.log(myMap);
  console.log(operData);

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

  const data = {
    labels: CartNamesData.map((el) => el.name),
    datasets: [
      {
        label: "Сума",
        //@ts-ignore
        data: CartNamesData.map((el) => myMap && myMap[el.label]),
        backgroundColor: CartNamesData.map((el) => el.bgColor),
        borderColor: CartNamesData.map((el) => el.borderColor),
        borderWidth: 1,
      },
    ],
  };
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
          <Button onClick={() => navigate(-2)}>{"ПОВЕРНУТИСЯ"}</Button>
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
              tech_opers={myMap.tech_operations || operData}
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
        <Box display={"flex"}>
          <Box width={"25%"} mx={"auto"} px={"auto"}>
            <DoughnutChart data={data} />
          </Box>
          <Box width={"50%"} px={"auto"}>
            <MyHeading>Структура прямих витрат</MyHeading>
            <Table>
              <Thead>
                <Tr>
                  <Th>Колір</Th>
                  <Th>Назва</Th>
                  <Th>Сума</Th>
                  <Th>Частка %</Th>
                </Tr>
              </Thead>
              <Tbody>
                {myMap &&
                  CartNamesData.map((el) => (
                    <Tr key={el.name}>
                      <Td>
                        <Box
                          h={2}
                          bgColor={el.bgColor}
                          borderColor={el.borderColor}
                          borderWidth={2}
                        />
                      </Td>
                      <Td>{el.name}</Td>

                      <Td>
                        {
                          //@ts-ignore
                          (myMap[el.label] || 0) * (myMap?.area || 0)
                        }
                      </Td>
                      <Td>
                        {myMap?.costHectare
                          ? +(
                              (//@ts-ignore
                              (myMap[el.label] || 0) /
                                myMap.costHectare) *
                              100
                            ).toFixed(1)
                          : null}
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
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
        isOpen={deleteOpen.isOpen}
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
