import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ENTERPRISE_FORM_ROUTER } from "src/utils/consts";
import { resBusinessPlan } from "../../../../../tRPC serv/controllers/BusinessService";
const IMGuRL =
  "https://bicofnobkczquxvztyzl.supabase.co/storage/v1/object/public/business-imgs/SHP";
type props = { e: resBusinessPlan };
function WorkerTableItem({ e }: props) {
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
        <Box
          minH={"180px"}
          m={3}
          cursor={"pointer"}
          onClick={() =>
            navigate(
              ENTERPRISE_FORM_ROUTER + "/" + e.enterprise?.form + "/" + e.id
            )
          }
        >
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
            <Box>{e?.updatedAt?.toLocaleString().slice(0, 9) || "0"}</Box>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup spacing="2">
          <Button
            onClick={() =>
              navigate(
                ENTERPRISE_FORM_ROUTER + "/" + e.enterprise?.form + "/" + e.id
              )
            }
          >
            Розпис
          </Button>
          {/* <Tooltip
        label="Рекомендації в розробці"
        bgColor={"grey.100"}
        color={"black"}
        fontSize={17}
      >
        <Button variant="ghost" colorScheme="blue">
          Рекомендації
        </Button>
      </Tooltip> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default WorkerTableItem;
