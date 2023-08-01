import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import { Context } from "src/main";
import GeneralDataTable from "src/modules/GeneralDataTable";
import OpersTable from "src/modules/OpersTable/OpersTable";
import MyHeading from "src/ui/MyHeading";
import { Icell } from "../../../../tRPC serv/controllers/OperService";
import {
  resTechCartsWithOpers,
  resTechOperation,
} from "../../../../tRPC serv/controllers/TechCartService";

type props = {
  myMap: resTechCartsWithOpers | undefined;
  id: number;
} & (
  | {
      useIcons: true;
      setMapOpen: Dispatch<SetStateAction<boolean>>;
      setRes: Dispatch<SetStateAction<any>>;
      setUpdate: Dispatch<SetStateAction<boolean>>;
      setSecondOpen: Dispatch<SetStateAction<boolean>>;
      setCell: Dispatch<SetStateAction<Icell | "">>;
      setShowAlert: Dispatch<SetStateAction<boolean>>;
      deleteOpen: boolean;
      setDeleteOpen: (open: boolean) => void;
    }
  | { useIcons: false; tech_opers: resTechOperation[] | null }
);

function TechnologicalMapContent(props: props) {
  const { map } = useContext(Context);
  return (
    <>
      <MyHeading>Технологічна карта</MyHeading>
      {props.myMap?.isComplex && (
        <MyHeading>Комплекс робіт: {props.myMap?.nameCart}</MyHeading>
      )}
      {props.myMap?.isComplex && (
        <MyHeading>
          Розділ:{" "}
          {map.section.find((el) => el.id == props.myMap?.sectionId)?.name}
        </MyHeading>
      )}
      {props.useIcons ? (
        <Box>
          <Box overflowX={"auto"}>
            <GeneralDataTable
              useIcons={props.useIcons}
              myMap={props.myMap}
              setMapOpen={props.setMapOpen}
              setRes={props.setRes}
              setUpdate={props.setUpdate}
            />
          </Box>
          <OpersTable
            useIcons={props.useIcons}
            opers={props.myMap?.tech_operations || []}
            id={props.id}
            setRes={props.setRes}
            setSecondOpen={props.setSecondOpen}
            setCell={props.setCell}
            setUpdate={props.setUpdate}
            setShowAlert={props.setShowAlert}
            deleteOpen={props.deleteOpen}
            setDeleteOpen={props.setDeleteOpen}
            area={props.myMap?.area || 0}
          />
        </Box>
      ) : (
        <Box>
          <Box overflowX={"auto"}>
            <GeneralDataTable useIcons={props.useIcons} myMap={props.myMap} />
          </Box>
          <OpersTable
            opers={
              props.tech_opers?.length
                ? props.tech_opers
                : props.myMap?.tech_operations
            }
            useIcons={props.useIcons}
            id={props.id}
            area={props.myMap?.area || 0}
          />
        </Box>
      )}
    </>
  );
}

export default TechnologicalMapContent;
