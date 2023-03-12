import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  Box,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { TEHMAP_ROUTER } from "../utils/consts";
type props = { e: Itech_cart | undefined };
function MainTable({ e }: props) {
  const navigate = useNavigate();
  return (
    <Card maxW="sm">
      <CardBody>
        <Stack mt="2" spacing="3">
          <Heading size="md">Культура {e?.nameCart || ""}</Heading>
          <Text>Автор:</Text>
        </Stack>
        <Image src={"../../" + e?.nameCart + ".jpg"} alt={e?.nameCart} />
        <Stack mt="6" spacing="1">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Площа</Box>
            <Box>{e?.area || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Загальна вартість </Box>
            <Box>1000000</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Собівартість 1 га</Box>
            <Box>{e?.totalCost || "0"}</Box>
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              navigate(TEHMAP_ROUTER + "/" + e?.id);
              console.log(TEHMAP_ROUTER + "/" + e?.id);
            }}
          >
            До карти
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Технологія
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default observer(MainTable);
