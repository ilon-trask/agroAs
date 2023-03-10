import React, { useContext } from "react";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import MainTableItem from "../components/MainTableItem";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
function MainPage() {
  const { map } = useContext(Context);
  console.log(map.maps);

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"1fr 3fr"}
      gridColumnGap={"15px"}
      gridGap={"15px"}
      maxW={"1200px"}
      mx={"auto"}
      mt={"15px"}
    >
      <Box borderRadius={"20px"}>
        <Image borderRadius={"20px"} src="../../logo.jpg" alt="логотип" />
      </Box>
      <Box
        borderRadius={"20px"}
        backgroundImage={"../../title_bg.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
      >
        <Box textAlign={"center"} fontWeight={"bold"}>
          ПРО ПРОЕКТ
          <Text fontSize={"20px"}>
            Онлайн - сервіс для планування,
            <br /> обліку та аналізу діяльності фермерського господарства
          </Text>
        </Box>
      </Box>
      <Box p={"15px"} border={"1px"}>
        <Text mt={"10px"} fontWeight={"bold"} fontSize={"20px"}>
          КУЛЬТУРИ
        </Text>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr 1fr"}
        gridColumnGap={"15px"}
      >
        {map.maps.map((e) => (
          <MainTableItem e={e} />
        ))}
      </Box>
    </Box>
  );
}

export default observer(MainPage);
