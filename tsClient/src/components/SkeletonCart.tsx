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
  Skeleton,
} from "@chakra-ui/react";
import { Itech_cart } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { TEHMAP_ROUTER } from "../utils/consts";
function MainTable() {
  const navigate = useNavigate();
  return (
    <Card maxW="sm" mx={"auto"}>
      <CardBody pt={0}>
        <Stack mt="2" spacing="3">
          <Skeleton h={"24px"} w={"235px"} />
          <Skeleton h={"15px"} w={"135px"} />
        </Stack>
        <Skeleton
          mt={"3"}
          h={"176px"}
          w={"176px"}
          borderRadius={"200%"}
          mx={"auto"}
        />
        <Stack mt="6" spacing="1">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Skeleton w={"246px"} h={"24px"} />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Skeleton w={"246px"} h={"24px"} />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Skeleton w={"246px"} h={"24px"} />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Skeleton w={"246px"} h={"24px"} />
          </Box>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Skeleton w={"102px"} h={"40px"} />
          {/* <Button variant="ghost" colorScheme="blue">
            Технологія
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default observer(MainTable);
