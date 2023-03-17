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
  Input,
  Image,
} from "@chakra-ui/react";
import { setIsAgreeCarts, setIsPublic } from "../http/requests";
type props = {
  data: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean };
  };
  setData: (
    data:
      | {
          isOpen: boolean;
          data: { id: number; isPublic: boolean };
        }
      | ((a: any) => void)
  ) => void;
};

function PublicationPopUp({ data, setData }: props) {
  const [isErr, setIsErr] = useState(false);
  const { map, user } = useContext(Context);
  const [cart] = map.NoAgreeCarts.filter((el) => el.id == data.data.id);
  useEffect(() => {
    setCultural(cart?.culturesTypeId || 0);
    setAuthorName(cart?.authorName || "");
  }, [cart]);

  const [cultural, setCultural] = useState(cart?.culturesTypeId || 0);
  const [authorName, setAuthorName] = useState(cart?.authorName || "");
  const whichFunc = {
    ADMIN() {
      setIsAgreeCarts(map, true, data.data.id, authorName, cultural);
    },
    AUTHOR() {
      setIsPublic(map, {
        id: data.data.id,
        isPublic: data.data.isPublic,
        authorName,
        cultural,
      });
    },
    "": () => {},
    authenticated: () => {},
    service_role: () => {},
  };

  return (
    //@ts-ignore
    <Modal
      isOpen={data.isOpen}
      onClose={() => {
        setData({ isOpen: false, data: { id: 0, isPublic: false } });
        setIsErr(false);
        setCultural(0);
        setAuthorName("");
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w={"max-content"}>
        <ModalBody w={"max-content"}>
          <Heading as={"h4"} size="md" textAlign={"center"}>
            Виберіть категорію культури та <br />
            впишіть автора
          </Heading>
          <Box as={"div"} display={"flex"} gap={10} mt={"15px"}>
            <Box>
              <Heading as={"h4"} size="sm">
                Виберіть категорію
              </Heading>
              <Box>
                <Select
                  size={"sm"}
                  onChange={(e) => {
                    setCultural(+e.target.value);
                  }}
                  value={cultural}
                  defaultValue={0}
                >
                  <option disabled hidden value={0}>
                    Виберіть розділ
                  </option>
                  {map.cultural?.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.nameCulture}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box>
              <Heading as={"h4"} size="sm">
                Впишіть автора
              </Heading>
              <Box>
                <Input
                  type="text"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value);
                  }}
                  placeholder={"Впишіть"}
                  size={"sm"}
                />
              </Box>
            </Box>
          </Box>
          {user.role == "ADMIN" ? (
            <Box>
              ASDF
              <Image></Image>
            </Box>
          ) : null}
          {isErr ? "Ви не заповнили поля" : ""}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Button
              mt={"10px"}
              onClick={() => {
                console.log(authorName);
                console.log(cultural);

                if (authorName === "" || cultural === 0) {
                  setIsErr(true);
                } else {
                  setIsErr(false);
                  setData({ isOpen: false, data: { id: 0, isPublic: false } });
                  console.log(user.role);
                  console.log(whichFunc[user.role]());

                  whichFunc[user.role]();
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

export default observer(PublicationPopUp);
