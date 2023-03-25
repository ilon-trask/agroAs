import React, { useContext, useEffect, Dispatch, SetStateAction } from "react";
import { observer } from "mobx-react-lite";
import { FeedBackProps, feedBackProps } from "../FeedBackForm";
import { func, InputProps } from "../../../components/Dialog";
import { Context } from "../../../main";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  ModalBody,
  Button,
  Center,
  ModalFooter,
  Input,
  Text,
  Select,
  Textarea,
} from "@chakra-ui/react";
import MapStore from "../../../store/MapStore";
import BusinessStore from "../../../store/BusinessStore";
import { sendFeedBack } from "../../../http/requests";

const createFeedBack: (
  id: number,
  map: MapStore,
  bus: BusinessStore,
  res: FeedBackProps,
  setIsErr: (isErr: boolean) => void,
  setOpen: (open: boolean) => void,
  setRes: (res: FeedBackProps) => void
) => void = function (id, map, bus, res, setIsErr, setOpen, setRes) {
  if (res.email == "" || res.message == "") {
    setIsErr(true);
  } else {
    setOpen(false);
    setRes(feedBackProps);
    setIsErr(false);
    sendFeedBack(res);
  }
};
const FeedBack = observer(
  ({
    res,
    setRes,
    setIsErr,
    setOpen,
  }: {
    res: FeedBackProps;
    setRes: Dispatch<SetStateAction<FeedBackProps>>;
    setIsErr: (isErr: boolean) => void;
    setOpen: (open: boolean) => void;
  }) => {
    const { map, business } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {}, [res]);
    return (
      <ModalBody>
        <Heading as={"h3"} fontSize={"25px"} textAlign={"center"}>
          Чекаємо Ваших побажань щодо роботи сайту, розширення функціоналу сайту
          та з іншими пропозиціями.
        </Heading>
        <Box mt={"30px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Ваш Email для відповіді
          </Heading>
          <Input
            mt={"4px"}
            type={"email"}
            size={"sm"}
            value={res.email}
            onChange={(e) => {
              setRes((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
        </Box>
        <Box mt={"10px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Номер телефону (необов'язково)
          </Heading>
          <Input
            mt={"4px"}
            type={"tel"}
            size={"sm"}
            value={res.tel}
            onChange={(e) => {
              setRes((prev) => ({ ...prev, tel: e.target.value }));
            }}
          />
        </Box>
        <Box mt={"10px"}>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Повідомлення
          </Heading>
          <Textarea
            mt={"4px"}
            placeholder="Напишіть запитання, побажання, пропозоції"
            size={"md"}
            value={res.message}
            onChange={(e) => {
              setRes((prev) => ({ ...prev, message: e.target.value }));
            }}
          />
        </Box>

        <ModalFooter>
          <Button
            onClick={() => {
              createFeedBack(
                +id!,
                map,
                business,
                res,
                setIsErr,
                setOpen,
                setRes
              );
            }}
          >
            Надіслати
          </Button>
        </ModalFooter>
      </ModalBody>
    );
  }
);

export default FeedBack;
