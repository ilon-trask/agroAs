import {
  AlertDialogFooter,
  Box,
  Button,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "../../components/Dialog";
import { copyComplex } from "../../http/requests";
import { Context } from "../../main";
const Item = () => <Box>asdf</Box>;
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  section: number;
  setSection: Dispatch<SetStateAction<number>>;
};
function ComplexChose({ open, setOpen, section, setSection }: props) {
  const { map } = useContext(Context);
  const { id } = useParams();
  const [res, setRes] = useState<number | "">("");
  const [isErr, setIsErr] = useState(false);
  const thisComplexes = map.complex.filter((el) => el.sectionId == section);
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      update={false}
      isErr={isErr}
      setRes={setRes}
      res={res}
      props={""}
      setIsErr={setIsErr}
      setUpdate={() => {}}
    >
      <Box>
        <Heading as={"h4"} size="md" textAlign={"center"} mt={3}>
          Комплекси робіт для розділу:{" "}
          {map.section.find((el) => el.id == section)?.name}
        </Heading>
        <Box mt={"15px"} maxW={"50%"} mx={"auto"}>
          <Text fontWeight={"bold"}>Виберіть комплекс</Text>
          <Select onChange={(e) => setRes(+e.target.value)}>
            <option defaultChecked hidden value="">
              Виберіть комплекс
            </option>
            {thisComplexes.map((el) => {
              return <option value={el.id}>{el.nameCart}</option>;
            })}
          </Select>
          {!thisComplexes[0] ? (
            <Text fontSize={"15px"}>
              Немає доступних комплексів для цього розділу
            </Text>
          ) : null}
        </Box>
      </Box>
      <AlertDialogFooter>
        <Button
          onClick={() => {
            if (res != "") {
              copyComplex(map, +res, +id!);
            }
            setOpen(false);
          }}
        >
          Зберегти
        </Button>
      </AlertDialogFooter>
    </Dialog>
  );
}

export default ComplexChose;
