import React, { useContext, useMemo } from "react";
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
import { Itech_cart } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { TEHMAP_ROUTER } from "../utils/consts";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TechnologicalMapPdf from "../pages/pdf/TechnologicalMapPdf";
import { downloaded, getCarts } from "../http/requests";
import getSectionsOpers from "../store/GetSectionsOpers";
import { Context } from "../main";
const IMGuRL =
  "https://bicofnobkczquxvztyzl.supabase.co/storage/v1/object/public/images/unUsed";
type props = { e: Itech_cart | undefined };

function MainTable({ e }: props) {
  const navigate = useNavigate();
  const { map } = useContext(Context);
  const sections = useMemo(() => {
    let a = getSectionsOpers(map, e?.id!);
    console.log(a);

    return a;
  }, [map.opers]);
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
            {e?.nameCart || ""}
          </Heading>
          <Text>
            <b>Автор:</b> {e?.authorName}
          </Text>
          <Text maxW="250px" minH={"48px"}>
            {e?.description}
          </Text>
        </Stack>
        <Box minH={"180px"}>
          <Image
            src={IMGuRL + "/" + e?.id}
            h={"auto"}
            w={"220px"}
            mx={"auto"}
            alt={e?.nameCart}
          />
        </Box>
        <Stack mt="6" spacing="1" mb={0}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Площа</Box>
            <Box>{e?.area || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Загальна вартість </Box>
            <Box>{e?.area! * e?.costHectare! || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Собівартість 1 га</Box>
            <Box>{e?.costHectare || "0"}</Box>
          </Box>
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
              navigate(TEHMAP_ROUTER + "/" + e?.id);
              console.log(TEHMAP_ROUTER + "/" + e?.id);
            }}
          >
            До карти
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
