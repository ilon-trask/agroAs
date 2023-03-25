import { observer } from "mobx-react-lite";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
import {
  setIsAgreeBusiness,
  setIsAgreeCarts,
  setIsPublic,
  setIsPublicBusiness,
  supabase,
} from "../http/requests";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: {
    BusinessId: number;
    isPublic: boolean;
    isAgree?: boolean;
  };

  setData: Dispatch<
    SetStateAction<{ BusinessId: number; isPublic: boolean; isAgree?: boolean }>
  >;
};

function PublicationPopUp({ open, setOpen, data, setData }: props) {
  console.log(data);

  const [isErr, setIsErr] = useState(false);
  const { map, business, user } = useContext(Context);
  const imgRef = useRef(null);
  const [myBusines] = business.businessPlan.filter(
    (el) => el.id == data.BusinessId
  );
  const [busines] = business.noAgreeBusinessPlan.filter(
    (el) => el.id == data.BusinessId
  );
  useEffect(() => {
    setDescription(busines?.description || myBusines?.description || "");
    console.log(busines?.description || myBusines?.description || "");
  }, [busines, myBusines]);

  const [description, setDescription] = useState(
    busines?.description || myBusines?.description || ""
  );

  return (
    //@ts-ignore
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
        setData({ BusinessId: 0, isPublic: false, isAgree: false });
        setIsErr(false);
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
          <Box as={"div"} display={"flex"} gap={10} mt={"15px"}></Box>
          <Box display={"flex"} mt={3}>
            <Input
              type="text"
              maxLength={45}
              value={description}
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

                    console.log(file);

                    // const { data, error } = await supabase.storage
                    //   .from("images")
                    //   .list("unUsed", {
                    //     limit: 100,
                    //     offset: 0,
                    //     sortBy: { column: "name", order: "asc" },
                    //   });
                    const res = await supabase.storage
                      .from("business-imgs")
                      .upload("" + data.BusinessId, file);
                    console.log(res.data);
                    console.log(res.error);
                    //@ts-ignore
                    if (res.error?.error == "Duplicate") {
                      const res = await supabase.storage
                        .from("business-imgs")
                        .update("" + data.BusinessId, file);
                      console.log(res.data);
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
                if (false) {
                  setIsErr(true);
                } else {
                  setIsErr(false);
                  setOpen(false);
                  setData({ BusinessId: 0, isPublic: false, isAgree: false });
                  if (data.isAgree) {
                    setIsAgreeBusiness(map, business, {
                      BusinessId: data.BusinessId,
                      isAgree: data.isAgree,
                      description: description,
                    });
                  } else {
                    setIsPublicBusiness(map, business, {
                      BusinessId: data.BusinessId,
                      isPublic: data.isPublic,
                      description: description,
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

export default observer(PublicationPopUp);
