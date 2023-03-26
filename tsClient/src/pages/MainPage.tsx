import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import MainTableItem from "../components/MainTableItem";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import SkeletonCart from "../components/SkeletonCart";

function MainPage() {
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
          <Box textAlign={"center"} fontWeight={"bold"} fontSize={24}>
            <Text color={"#20401e"}>AgroDiBi</Text>
            <Text fontSize={"20px"}>
              Онлайн - сервіс для планування,
              <br /> обліку та аналізу витрат фермерського господарства
            </Text>
          </Box>
        </Box>
        {/* @ts-ignore */}
        <Box p={"15px"} overflowX={windW < 770 && "scroll"} maxW={"100vw"}>
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
          </TabPanel>
          {map.cultural.map((el) => (
            <TabPanel>
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
            </TabPanel>
          ))}
        </TabPanels>
      </Box>
    </Tabs>
  );
}

export default observer(MainPage);
