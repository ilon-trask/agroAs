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
  Tooltip,
} from "@chakra-ui/react";
import { IbusinessPlan } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { BUSINESSpLAN_ROUTER, TEHMAP_ROUTER } from "../utils/consts";
const IMGuRL =
  "https://bicofnobkczquxvztyzl.supabase.co/storage/v1/object/public/business-imgs";
type props = { e: IbusinessPlan | undefined };
function MainTable({ e }: props) {
  const navigate = useNavigate();
  return (
    <Card maxW="sm" mx={"auto"}>
      <CardBody
        pt={0}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Stack mt="2" spacing="3">
          <Heading size="md" textAlign={"center"} textColor={"#20401e"}>
            {e?.name || ""}
          </Heading>
          {/* <Text>
            <b>Автор:</b> {e?.authorName}
          </Text> */}
          <Text maxW="250px" minH={"48px"}>
            {e?.description}
          </Text>
        </Stack>
        <Box minH={"180px"} m={3}>
          <Image
            src={IMGuRL + "/" + e?.id}
            h={"auto"}
            w={"220px"}
            mx={"auto"}
            alt={e?.name}
          />
        </Box>
        <Stack mt="6" spacing="1" mb={0}>
          {/* <Box display={"flex"} justifyContent={"space-between"}>
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
          </Box> */}
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Оновлено</Box>
            <Box>{e?.updatedAt?.slice(0, 10) || "0"}</Box>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup spacing="2">
          <Button
            onClick={() => {
              navigate(BUSINESSpLAN_ROUTER + `/${e?.id}`);
              console.log(BUSINESSpLAN_ROUTER + "/" + e?.id);
            }}
          >
            Бізнес-план
          </Button>
          <Tooltip
            label="Рекомендації в розробці"
            bgColor={"grey.100"}
            color={"black"}
            fontSize={17}
          >
            <Button variant="ghost" colorScheme="blue">
              Рекомендації
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default observer(MainTable);
