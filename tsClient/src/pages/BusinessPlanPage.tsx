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
function BiznesPlanPage() {
  const [openResume, setOpenResume] = useState(false);
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [cild, setCild] = useState<string>();
  const [showSelectCart, setShowSelectCart] = useState(false);
  const [infCartId, setInfCartId] = useState<number>();
  const { map, user, business } = useContext(Context);
  const { id } = useParams();
  const Business: resBusinessPlan[] = JSON.parse(
    JSON.stringify(business.businessPlan)
  );

  const [myBusiness] = Business.filter((el) => el.id == id);
  function getData(name: string, children: string, infCartId?: number) {
    setInfCartId(infCartId);
    setCild(children);
    //@ts-ignore
    setName(names[children]);
    //@ts-ignore
    setData(myBusiness[name][children]);
  }
  return (
    <Box>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        Бізнес-план
      </Heading>
      <Heading mt={3} textAlign={"center"} fontSize={"25"}>
        {myBusiness?.name}
      </Heading>
      <Box maxW={"1000px"} mx="auto" display={"flex"} gap={"30px"}>
        <TableContainer maxW="min-content" mt={"20px"} overflowX={"scroll"}>
          <BusinessConceptTable
            setOpenResume={setOpenResume}
            getData={getData}
          />
        </TableContainer>
        <Box mt={4}>
          {data && (
            <>
              <Text fontSize={"20px"} fontWeight={"500"}>
                {name}
              </Text>
              {data}
              <Box>
                <Button>
                  <EditIcon></EditIcon>
                </Button>
                {!!infCartId && <CartsTableInBusiness cartId={infCartId} />}
                <Button
                  onClick={() => {
                    setShowSelectCart(true);
                  }}
                >
                  Добавити таблицю
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <SelectCart
        open={showSelectCart}
        setOpen={setShowSelectCart}
        cild={cild!}
      />
      <CreateResume open={openResume} setOpen={setOpenResume} />
    </Box>
  );
}

export default observer(BiznesPlanPage);
