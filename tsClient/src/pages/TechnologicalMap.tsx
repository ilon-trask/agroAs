import React, { useContext, useState } from "react";
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
import { deleteOper } from "../http/requests";
import { CALENDAR_ROUTER } from "../utils/consts";
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
  const { map, user } = useContext(Context);
  let { id } = useParams();
  const [deleteOpen, setDeleteOpen] = useState<any>({
    idOpen: false,
    operId: null,
    cartId: null,
  });
  const navigate = useNavigate();
  return (
    <Box pb={"25px"}>
      <Box px={"40px"}>
        <div style={{ fontSize: "20px" }}>
          <Button mt={"30px"} onClick={() => navigate("/")}>
            {"НА ГОЛОВНУ"}
          </Button>
        </div>
        <Text textAlign={"center"} fontSize={"25px"}>
          Технологічна карта
        </Text>
        <div>
          <GeneralDataTable
            id={+id!}
            setMapOpen={setMapOpen}
            setRes={setRes}
            setUpdate={setUpdate}
          />
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
        </div>
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
    </Box>
  );
});
export default TechnologicalMap;
