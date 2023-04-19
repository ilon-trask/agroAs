import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Icell } from "../../../tRPC serv/controllers/OperService";
import { Context } from "../main";
import css from "./Dialog.module.css";
import {
  Box,
  Heading,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Center,
  ModalFooter,
} from "@chakra-ui/react";
type props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSecondOpen: (open: boolean) => void;
  cell: Icell | "";
  setCell: (cell: Icell | "") => void;
  section: number | "";
  setSection: (section: number | "") => void;
  sectionId: number | null | undefined;
};
function OperSection({
  open,
  setOpen,
  setSecondOpen,
  cell,
  setCell,
  section,
  setSection,
  sectionId,
}: props) {
  const [isErr, setIsErr] = useState(false);
  const { map, user } = useContext(Context);
  useEffect(() => {
    if (sectionId) {
      setSection(sectionId);
    }
  }, [sectionId]);
  return (
    //@ts-ignore
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
        setIsErr(false);
        setCell("");
        setSection("");
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w={"max-content"}>
        <ModalBody w={"max-content"}>
          <Heading as={"h4"} size="md" textAlign={"center"}>
            {sectionId ? "Виберіть тип робіт" : "Виберіть розділ та тип робіт"}
          </Heading>
          <Box as={"div"} display={"flex"} gap={10} mt={"15px"}>
            <Box>
              <Heading as={"h4"} size="sm">
                Виберіть розділ
              </Heading>
              <Box>
                <Select
                  size={"sm"}
                  onChange={(e) => {
                    setSection(+e.target.value);
                  }}
                  value={section}
                  disabled={!!sectionId}
                >
                  <option disabled hidden value="">
                    Виберіть розділ
                  </option>
                  {map.section?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box>
              <Heading as={"h4"} size="sm">
                Виберіть тип
              </Heading>
              <Box>
                <Select
                  size={"sm"}
                  onChange={(e) => {
                    setCell(e.target.value as Icell);
                  }}
                  value={cell}
                  defaultValue={""}
                >
                  <option disabled hidden value="">
                    Виберіть тип
                  </option>
                  <option value="costMechanical">Механізовані роботи</option>
                  <option value="costHandWork">Ручні роботи</option>
                  <option value="costMaterials">Матеріали</option>
                  <option value="costServices">Послуги</option>
                  <option value="costTransport">Транспортування</option>
                  {user.role == "service_role" && !sectionId && (
                    <option value="complex">Комплекс</option>
                  )}
                </Select>
              </Box>
            </Box>
            {/* <Box>
                <Heading as={"h4"} size="sm">
                  Одиниці виміру
                </Heading>
                <Box>
                  <Select onChange={(e) => {}} value={cell} defaultValue={""}>
                    <option disabled hidden value="">
                      грн/га
                    </option>
                  </Select>
                </Box>
              </Box> */}
          </Box>
          {isErr ? "Ви не заповнили поля" : ""}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Button
              mt={"10px"}
              onClick={() => {
                if (cell === "" || section === "") {
                  setIsErr(true);
                } else {
                  setIsErr(false);
                  setOpen(false);
                  setSecondOpen(true);
                }
              }}
            >
              Створити
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
export default observer(OperSection);
