import {
  Box,
  Button,
  Input,
  ModalFooter,
  Text,
  ModalBody,
  Heading,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "../components/Dialog";
import { updateMap } from "../http/requests";
import { Context } from "../main";
import { cartProps } from "./CreateCart";

export const CartProps: cartProps = {
  nameCart: "",
  area: "",
  salary: "",
  isPublic: false,
  priceDiesel: "",
  cultivationTechnologyId: 6,
  cultureId: 4,
};

interface props {
  open: boolean;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: (update: boolean) => void;
  res: cartProps;
  setRes: Dispatch<SetStateAction<cartProps>>;
}
function UpdateAreaCart({
  open,
  res,
  setOpen,
  setRes,
  setUpdate,
  update,
}: props) {
  const { map } = useContext(Context);
  const [isErr, setIsErr] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      res={res}
      setRes={setRes}
      update={update}
      setUpdate={setUpdate}
      props={CartProps}
      isErr={isErr}
      setIsErr={setIsErr}
    >
      <ModalBody>
        <Box>
          <Heading size="sm" minW={"max-content"}>
            Площа
          </Heading>
          <Input
            value={res.area}
            placeholder="Введіть площу"
            type="number"
            onChange={(e) =>
              setRes((prev) => ({ ...prev, area: +e.target.value }))
            }
          />
        </Box>
        <ModalFooter>
          <Button
            onClick={() => {
              updateMap(map, res);
            }}
          >
            Зберегти
          </Button>
        </ModalFooter>
      </ModalBody>
    </Dialog>
  );
}

export default UpdateAreaCart;
