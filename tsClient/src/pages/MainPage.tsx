import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import MainTableItem from "../components/MainTableItem";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import SkeletonCart from "../components/SkeletonCart";
import { useNavigate } from "react-router-dom";
import { HOW_ROUTER } from "../utils/consts";
import MainTableItemJustification from "../components/MainTableItemJustification";
import MyHeading from "src/ui/MyHeading";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <Box borderRadius={"20px"}>
        <Image borderRadius={"20px"} src="../../logo.jpg" alt="логотип" />
      </Box>
      <Box
        borderRadius={"20px"}
        backgroundImage={"../../title_bg.jpg"}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
      >
        <Box textAlign={"center"} fontWeight={"bold"} fontSize={24}>
          <Text color={"#20401e"}>AgroDataBase</Text>
          <Text fontSize={"20px"}>
            Онлайн - сервіс для планування,
            <br /> обліку та аналізу витрат фермерського господарства
          </Text>
          <Button
            bg={"rgba( 93, 160, 93, 0.55 )"}
            borderRadius={100}
            size={"lg"}
            fontSize={"20px"}
            h={"min-content"}
            py={2}
            onClick={() => navigate(HOW_ROUTER)}
          >
            Як це працює?
          </Button>
        </Box>
      </Box>
    </>
  );
}
function MapScreen() {
  const { map } = useContext(Context);

  const windW = window.innerWidth;
  return (
    <Tabs
      orientation={windW < 770 ? "horizontal" : "vertical"}
      w={"100vw"}
      variant="soft-rounded"
    >
      <Box
        display={"grid"}
        gridTemplateColumns={["1fr", "1fr", "1fr 3fr"]}
        gridColumnGap={"15px"}
        gridGap={"15px"}
        maxW={"1300px"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box
          p={"15px"}
          overflowX={windW < 770 ? "scroll" : undefined}
          maxW={"100vw"}
        >
          {/* <Text mt={"10px"} fontWeight={"bold"} fontSize={"20px"}>
        КУЛЬТУРИ
         </Text> */}
          <Box>
            <TabList gap={2}>
              <Tab
                display={"block"}
                textAlign={"left"}
                _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
              >
                КУЛЬТУРИ
              </Tab>
              {map.cultural.map((el) => (
                <Tab
                  display={"block"}
                  textAlign={"left"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  {el.nameCulture}
                </Tab>
              ))}
            </TabList>
          </Box>
        </Box>

        <TabPanels>
          <TabPanel>
            <Box>
              <MyHeading mb={4}>Розрахунок прямих витрат</MyHeading>
              <Box
                display={"grid"}
                gridTemplateColumns={[
                  "1fr",
                  "1fr",
                  "1fr 1fr",
                  "1fr 1fr",
                  "1fr 1fr 1fr",
                ]}
                gridColumnGap={"15px"}
                rowGap={"20px"}
                mx={"auto"}
              >
                {map.isLoading
                  ? [<SkeletonCart />, <SkeletonCart />, <SkeletonCart />]
                  : map.agreeCarts.map((e) => (
                      <MainTableItem e={e} key={e.id} />
                    )) || <Text>Немає жодної карти</Text>}
              </Box>
            </Box>
          </TabPanel>
          {map.cultural.map((el) => (
            <TabPanel>
              <Box>
                <MyHeading mb={4}>Розрахунок прямих витрат</MyHeading>
                <Box
                  display={"grid"}
                  gridTemplateColumns={[
                    "1fr",
                    "1fr",
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  gridColumnGap={"15px"}
                >
                  {map.isLoading
                    ? [<SkeletonCart />, <SkeletonCart />, <SkeletonCart />]
                    : map.agreeCarts.map((e) => {
                        if (el.id == e.culturesTypeId)
                          return <MainTableItem e={e} key={e.id} />;
                      }) || <Text>Немає жодної карти</Text>}
                </Box>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Box>
    </Tabs>
  );
}
function BusinessScreen() {
  const { map, TEJ } = useContext(Context);
  const navigate = useNavigate();
  const windW = window.innerWidth;
  return (
    <>
      <Tabs
        orientation={windW < 770 ? "horizontal" : "vertical"}
        w={"100vw"}
        variant="soft-rounded"
      >
        <Box
          display={"grid"}
          gridTemplateColumns={["1fr", "1fr", "1fr 3fr"]}
          gridColumnGap={"15px"}
          gridGap={"15px"}
          maxW={"1200px"}
          mx={"auto"}
          mt={"15px"}
        >
          <HeroSection />
          <Box
            p={"15px"}
            overflowX={windW < 770 ? "scroll" : undefined}
            maxW={"100vw"}
          >
            <TabList gap={2}>
              <Tab
                display={"block"}
                textAlign={"left"}
                _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
              >
                ТЕХНОЛОГІЇ
              </Tab>
              {TEJ.technologies.map((el) => (
                <Tab
                  display={"block"}
                  textAlign={"left"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  {el.name}
                </Tab>
              ))}
            </TabList>
          </Box>
          <TabPanels>
            <TabPanel p={0}>
              <Box>
                <MyHeading mb={4}>Бізнес-плани</MyHeading>
                <Box
                  display={"grid"}
                  gridTemplateColumns={[
                    "1fr",
                    "1fr",
                    "1fr 1fr",
                    "1fr 1fr",
                    "1fr 1fr 1fr",
                  ]}
                  gridColumnGap={"15px"}
                  rowGap={"20px"}
                  mx={"auto"}
                >
                  {map.isLoading
                    ? [<SkeletonCart />, <SkeletonCart />, <SkeletonCart />]
                    : TEJ.agreeJustification.map((e) => {
                        return <MainTableItemJustification e={e} key={e.id} />;
                      }) || <Text>Немає жодної карти</Text>}
                </Box>
              </Box>
            </TabPanel>
            {TEJ.technologies.map((el) => (
              <TabPanel>
                {" "}
                <Box>
                  <MyHeading mb={4}>Бізнес-плани</MyHeading>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={[
                      "1fr",
                      "1fr",
                      "1fr 1fr",
                      "1fr 1fr",
                      "1fr 1fr 1fr",
                    ]}
                    gridColumnGap={"15px"}
                  >
                    {map.isLoading
                      ? [<SkeletonCart />, <SkeletonCart />, <SkeletonCart />]
                      : TEJ.agreeJustification.map((e) => {
                          if (el.id == e.cultivationTechnologyId)
                            return (
                              <MainTableItemJustification e={e} key={e.id} />
                            );
                        }) || <Text>Немає жодної карти</Text>}
                  </Box>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Box>
      </Tabs>
    </>
  );
}
function MainPage() {
  const { map, TEJ } = useContext(Context);
  const navigate = useNavigate();
  const windW = window.innerWidth;

  return (
    <Box>
      <BusinessScreen />
      <MapScreen />
    </Box>
  );
}

export default observer(MainPage);
