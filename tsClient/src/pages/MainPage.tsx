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
import MyHeading from "src/ui/MyHeading";
import YouTube from "react-youtube";
import BusinessCatalogItem from "src/components/BusinessCatalogItem";
import { getPublicBusiness } from "src/http/requests";
import useBusinessDirection from "src/shared/hook/useBusinessDirection";

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
function VidSection() {
  return (
    <>
      <Box></Box>
      <Box>
        <Box mx={"auto"} maxW={"min-content"}>
          <YouTube
            videoId="Dc7LAgqy1_E"
            opts={{
              playerVars: {
                fs: 1,
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
function MapScreen() {
  const { map } = useContext(Context);

  const [windW, setWindW] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindW(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
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
        width={"80%"}
        mx={"auto"}
        mt={"15px"}
      >
        <Box
          p={"15px"}
          overflowX={windW < 770 ? "scroll" : undefined}
          maxW={"100vw"}
        >
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
                  key={el.id}
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
            <TabPanel key={el.id}>
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

// const ObserverBusinessScreen = observer(BusinessScreen);
const ObserverMapScreen = observer(MapScreen);
function MainPage() {
  const { map, business } = useContext(Context);
  useEffect(() => getPublicBusiness(map, business), []);

  const [windW, setWindW] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindW(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);
  return (
    <Box>
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
          width={"80%"}
          mx={"auto"}
          mt={"15px"}
        >
          <HeroSection />
          <VidSection />
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
                Напрямки
              </Tab>
              {useBusinessDirection.map((el) => (
                <Tab
                  key={el.id}
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
                    : business.publicBusinessPlan.map((e) => (
                        <BusinessCatalogItem e={e} key={e.id} />
                      )) || <Text>Немає жодного бізнес-плану</Text>}
                </Box>
              </Box>
            </TabPanel>
            {/* {TEJ.technologies.map((el) => (
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
            ))} */}
          </TabPanels>
        </Box>
      </Tabs>
      <ObserverMapScreen />
    </Box>
  );
}

export default observer(MainPage);
