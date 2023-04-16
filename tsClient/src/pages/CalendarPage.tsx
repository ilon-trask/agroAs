import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { TEHMAP_ROUTER } from "../utils/consts";
import { Context } from "../main";
import getSectionsOpers from "../store/GetSectionsOpers";
import CalendarTable from "../modules/CalendarTable";
import { observer } from "mobx-react-lite";

function CalendarPage() {
  const { map } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart] = map.maps.filter((el) => el.id == id);
  const sections = getSectionsOpers(map, +id!);
  console.log(map.maps);
  console.log(cart);

  return (
    <Box pb={"25px"}>
      <Box px={"40px"}>
        <Button mt={"30px"} onClick={() => navigate(TEHMAP_ROUTER + "/" + id)}>
          {"ДО КАРТИ"}
        </Button>
        <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
          Календар робіт на культуру {cart?.nameCart}
        </Text>

        <CalendarTable sections={sections} />
      </Box>
    </Box>
  );
}
export default observer(CalendarPage);
