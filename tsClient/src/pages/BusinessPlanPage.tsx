import React from "react";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  Heading,
} from "@chakra-ui/react";
const windW = 1000;
function BiznesPlanPage() {
  return (
    <Box>
      <Tabs
        orientation={windW < 770 ? "horizontal" : "vertical"}
        w={"100vw"}
        variant="soft-rounded"
      >
        <TabList gap={2} minW={"max-content"}>
          <Heading mt={3} textAlign={"center"} fontSize={"25"}>
            Бізнес-план
          </Heading>
          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Титульний аркуш
          </Tab>
          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Резуме
          </Tab>
          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Підприємство
          </Tab>

          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Проект
          </Tab>

          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Фінансування
          </Tab>

          <Tab
            display={"block"}
            textAlign={"left"}
            _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
          >
            Додатки
          </Tab>
        </TabList>
        <TabPanels>
          {/* <TabPanel></TabPanel> */}
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Титульний аркуш
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Резюме
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Стан підприємства
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Власники
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Поточна діяльність
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Фінансовий стан
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Кредити
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Загальна інформація
                </Tab>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Інвестиційний план
                </Tab>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Аналіз ринку
                </Tab>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Опис виробництва
                </Tab>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Фінансовий план
                </Tab>
                <Tab
                  fontSize={"15"}
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Екологічна оцінка
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Графік фінансування
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Застава
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Інвестиції
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  SWOT-аналіз
                </Tab>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Ризики
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <Tabs w={"100vw"} variant="soft-rounded">
              <TabList gap={2} minW={"max-content"}>
                <Tab
                  display={"block"}
                  _selected={{ bg: "rgba( 93, 160, 93, 0.55 )" }}
                >
                  Додаток 1
                </Tab>
              </TabList>
            </Tabs>
          </TabPanel>
          <Box border={"2px"} minH={"100%"}></Box>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default BiznesPlanPage;
