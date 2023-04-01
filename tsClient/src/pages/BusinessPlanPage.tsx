import React, { useContext, useState } from "react";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Box,
  Heading,
  Button,
  TableContainer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import CreateResume from "../modules/CreateResume";
import BusinessConceptTable from "../modules/BusinessConceptTable";
import { useParams } from "react-router-dom";
import { Context } from "../main";
import { IbusinessPlan } from "../../../tRPC serv/models/models";
import { observer } from "mobx-react-lite";
import { resBusinessPlan } from "../../../tRPC serv/controllers/BusinessService";
import { names } from "../modules/BusinessConceptTable/index";
import SelectCart from "../modules/BusinessConceptTable/component/SelectCart";
import CartsTableInBusiness from "../modules/CartsTableInBusiness";
import { patchResume, patchTitlePage } from "../http/requests";
import CreateTitlePage from "../modules/CreateTitlePage";
export type iName = "resume" | "titlePage" | "";
export type iChild =
  | "aboutProject"
  | "investment"
  | "finIndicators"
  | "deduction"
  | "title";
function BiznesPlanPage() {
  const [openResume, setOpenResume] = useState<boolean>(false);
  const [openTitle, setOpenTitle] = useState<boolean>(false);
  const [name, setName] = useState<iName>();
  const [child, setChild] = useState<iChild>();
  const [showSelectCart, setShowSelectCart] = useState<boolean>(false);
  const [infCartId, setInfCartId] = useState<number>(0);
  const { map, user, business } = useContext(Context);
  const { id } = useParams();
  const Business: resBusinessPlan[] = JSON.parse(
    JSON.stringify(business.businessPlan)
  );
  const [myBusiness] = Business.filter((el) => el.id == id);
  //@ts-ignore
  let data = name && child ? myBusiness[name][child] : "";
  const [nData, setNData] = useState<string>();
  function getData(name: iName, children: iChild, infCartId: number | null) {
    setInfCartId(infCartId || 0);
    setChild(children);
    setName(name);
  }
  const [isActiveInput, setIsActiveInput] = useState(false);
  return (
    <Box overflowX={"scroll"}>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Бізнес-план
      </Heading>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        {myBusiness?.name}
      </Heading>
      <Box
        maxW={"1000px"}
        mx="auto"
        display={["block", "block", "block", "flex"]}
        gap={"30px"}
      >
        <TableContainer maxW="min-content" mt={"20px"} overflowX={"scroll"}>
          <BusinessConceptTable
            setOpenResume={setOpenResume}
            setOpenTitle={setOpenTitle}
            getData={getData}
          />
        </TableContainer>
        <Box
          mt={4}
          w={"720px"}
          h={`${720 * 1.4}px`}
          border={"black 2px solid"}
          p={"30px"}
          px={"60px"}
        >
          {data && (
            <>
              <Box display={"flex"} alignItems={"center"}>
                <Button
                  onClick={() => {
                    setIsActiveInput(true);
                  }}
                >
                  <EditIcon />
                </Button>
                <Text fontSize={"20px"} fontWeight={"500"}>
                  {names[child!]}
                </Text>
                {isActiveInput && (
                  <Button
                    ml={"auto"}
                    onClick={() => {
                      setIsActiveInput(false);
                      name == "resume"
                        ? patchResume(business, {
                            businessId: +id!,
                            data: { [child!]: nData },
                          })
                        : name == "titlePage"
                        ? patchTitlePage(business, {
                            businessId: +id!,
                            title: nData!,
                          })
                        : null;
                    }}
                  >
                    Завершити редагування
                  </Button>
                )}
              </Box>
              {isActiveInput ? (
                <Textarea
                  // value={data}
                  onChange={(e) => setNData(e.target.value)}
                >
                  {data}
                </Textarea>
              ) : (
                <Text>{data}</Text>
              )}
              <Box>
                {!!infCartId && child == "investment" && (
                  <Box mt={4}>
                    <CartsTableInBusiness cartId={infCartId} />
                  </Box>
                )}
                {child == "investment" && (
                  <Button
                    onClick={() => {
                      setShowSelectCart(true);
                    }}
                  >
                    Добавити таблицю
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <SelectCart
        open={showSelectCart}
        setOpen={setShowSelectCart}
        child={child!}
      />
      <CreateResume open={openResume} setOpen={setOpenResume} />
      <CreateTitlePage open={openTitle} setOpen={setOpenTitle} />
    </Box>
  );
}

export default observer(BiznesPlanPage);
