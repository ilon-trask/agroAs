import { observer } from "mobx-react-lite";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { setIsAgreeCarts, setIsPublic, supabase } from "../http/requests";
type props = {
  data: {
    isOpen: boolean;
    data: { id: number; isPublic: boolean; agree: boolean };
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

function CartPublicationPopUp({ data, setData }: props) {
  const [isErr, setIsErr] = useState(false);
  const { map, user } = useContext(Context);
  const imgRef = useRef(null);
  const [cart] = map.NoAgreeCarts.filter((el) => el.id == data.data.id);
  const [myCart] = map.maps.filter((el) => el.id == data.data.id);
  useEffect(() => {
    setCultural(cart?.culturesTypeId || myCart?.culturesTypeId || 0);
    setAuthorName(cart?.authorName || myCart?.authorName || "");

    setDescription(cart?.description || myCart?.description || "");
  }, [cart, myCart]);

  const [cultural, setCultural] = useState(
    cart?.culturesTypeId || myCart?.culturesTypeId || 0
  );
  const [authorName, setAuthorName] = useState(
    cart?.authorName || myCart?.authorName || ""
  );
  const [description, setDescription] = useState(
    cart?.description || myCart?.description || ""
  );

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
          <Box display={"flex"} mt={3}>
            <Input
              type="text"
              maxLength={45}
              value={description}
              placeholder="Впишіть опис"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            {user.role == "ADMIN" || user.role == "service_role" ? (
              <Box>
                <Button
                  onClick={() => {
                    //@ts-ignore
                    imgRef?.current?.click();
                  }}
                >
                  Додоти фото
                </Button>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/jpg, image/png"
                  ref={imgRef}
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (!e.target.files) return;
                    const file = e.target?.files[0];

                    // const { data, error } = await supabase.storage
                    //   .from("images")
                    //   .list("unUsed", {
                    //     limit: 100,
                    //     offset: 0,
                    //     sortBy: { column: "name", order: "asc" },
                    //   });
                    const res = await supabase.storage
                      .from("images")
                      .upload("unUsed/" + data.data.id, file);
                    //@ts-ignore
                    if (res.error?.error == "Duplicate") {
                      const res = await supabase.storage
                        .from("images")
                        .update("unUsed/" + data.data.id, file);
                    }
                  }}
                />
              </Box>
            ) : null}
          </Box>
          {isErr ? "Ви не заповнили поля" : ""}
        </ModalBody>
        <ModalFooter>
          <Box>
            <Button
              mt={"10px"}
              onClick={() => {
                if (authorName === "" || cultural === 0) {
                  setIsErr(true);
                } else {
                  setIsErr(false);
                  setData({ isOpen: false, data: { id: 0, isPublic: false } });
                  if (data.data.agree) {
                    setIsAgreeCarts(
                      map,
                      true,
                      data.data.id,
                      authorName,
                      cultural,
                      description
                    );
                  } else {
                    setIsPublic(map, {
                      id: data.data.id,
                      isPublic: data.data.isPublic,
                      authorName,
                      cultural,
                      description,
                    });
                  }
                }
              }}
            >
              Підтвердити
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default observer(CartPublicationPopUp);
