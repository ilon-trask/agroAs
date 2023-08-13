import { observer } from "mobx-react-lite";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { Context } from "../main";
import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { setIsAgreeTEJ, setIsPublicTEJ, supabase } from "../http/requests";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  TEJData: {
    TEJId: number;
    isPublic: boolean;
    isAgree: boolean;
    authorName: string;
    publicComment: string;
  };
};

function TEJPublicationPopUp({ open, setOpen, TEJData }: props) {
  const [isErr, setIsErr] = useState(false);
  const { TEJ, user } = useContext(Context);
  const imgRef = useRef(null);
  const [data, setData] = useState<{
    authorName: string;
    publicComment: string;
  }>({
    authorName: TEJData.authorName,
    publicComment: TEJData.publicComment,
  });

  return (
    //@ts-ignore
    <Modal
      isOpen={open}
      onClose={() => {
        setIsErr(false);
        setOpen(false);
        setData({
          authorName: "",
          publicComment: "",
        });
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
                Впишіть автора
              </Heading>
              <Box>
                <Input
                  type="text"
                  value={data?.authorName}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      authorName: e.target.value,
                    }));
                  }}
                  placeholder={"Впишіть"}
                  size={"sm"}
                />
              </Box>
            </Box>
            <Box>
              <Heading as={"h4"} size="sm">
                Впишіть опис
              </Heading>
              <Input
                size={"sm"}
                type="text"
                placeholder={"Впишіть"}
                maxLength={45}
                value={data?.publicComment}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    publicComment: e.target.value,
                  }));
                }}
              />
            </Box>
          </Box>
          <Box display={"flex"} mt={3}>
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
                  accept="image/jpeg, image/png"
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
                      .upload("TEJ/" + TEJData.TEJId, file);
                    //@ts-ignore
                    if (res.error?.error == "Duplicate") {
                      const res = await supabase.storage
                        .from("images")
                        .update("TEJ/" + TEJData.TEJId, file);
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
              onClick={() => {
                if (data?.authorName === "") {
                  setIsErr(true);
                } else {
                  setIsErr(false);
                  setData({
                    authorName: "",
                    publicComment: "",
                  });
                  setOpen(false);
                  if (TEJData.isAgree) {
                    setIsAgreeTEJ(TEJ, {
                      publicComment: data.publicComment,
                      authorName: data.authorName,
                      isPublic: TEJData.isPublic,
                      TEJId: TEJData.TEJId,
                      isAgree: TEJData.isAgree,
                    });
                  } else {
                    setIsPublicTEJ(TEJ, {
                      authorName: data.authorName,
                      isPublic: TEJData.isPublic,
                      TEJId: TEJData.TEJId,
                      publicComment: data.publicComment,
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

export default observer(TEJPublicationPopUp);
