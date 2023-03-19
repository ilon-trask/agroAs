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
const IMGuRL =
  "https://bicofnobkczquxvztyzl.supabase.co/storage/v1/object/public/images/unUsed";
type props = { e: Itech_cart | undefined };
function MainTable({ e }: props) {
  const navigate = useNavigate();
  return (
    <Card maxW="sm" mx={"auto"}>
      <CardBody pt={0}>
        <Stack mt="2" spacing="3">
          <Heading size="md" textAlign={"center"} textColor={"#20401e"}>
            {e?.nameCart || ""}
          </Heading>
          <Text maxW="250px">{e?.description}</Text>
          <Text>Автор: {e?.authorName}</Text>
        </Stack>
        <Image
          src={IMGuRL + "/" + e?.id}
          h={"auto"}
          w={"220px"}
          mx={"auto"}
          alt={e?.nameCart}
        />
        <Stack mt="6" spacing="1">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Площа</Box>
            <Box>{e?.area || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Загальна вартість </Box>
            <Box>{e?.area! * e?.totalCost! || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Собівартість 1 га</Box>
            <Box>{e?.totalCost || "0"}</Box>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              navigate(TEHMAP_ROUTER + "/" + e?.id);
              console.log(TEHMAP_ROUTER + "/" + e?.id);
            }}
          >
            До карти
          </Button>
          {/* <Button variant="ghost" colorScheme="blue">
            Технологія
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default observer(MainTable);
