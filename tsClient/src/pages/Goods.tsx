import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Container,
  Checkbox,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import { resYieldPlant } from "../../../tRPC serv/controllers/incomeService";
import DeleteAlert, {
  DeleteProps,
  IdeleteHeading,
} from "../components/DeleteAlert";
import NoAuthAlert from "../components/NoAuthAlert";
import { deleteYieldPlant } from "../http/requests";
import { Context } from "../main";
import CostProdTable from "../modules/CostProdTable";
import CreateProduct from "../modules/CreateProduct";
import { CreateProductProps } from "../modules/CreateProduct/CreateProduct";
import CreateProductService from "../modules/CreateProductService";
import { productionProp } from "../modules/CreateProductService/CreateProduction";
import CreateYield, { incProp } from "../modules/CreateYield/CreateYield";
import PlanIncomeProductionTable from "../modules/PlanIncomeProductionTable";
import { YIELD_CALC_ROUTER } from "../utils/consts";

function Goods() {
  const { income, user, map } = useContext(Context);
  const yieldPlants: resYieldPlant[] = JSON.parse(
    JSON.stringify(income.yieldPlant)
  );
  yieldPlants.sort((a, b) => a.id! - b.id!);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState<incProp>({
    cultureId: "",
    cultivationTechnologyId: "",
    landingPeriod: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState<DeleteProps>({
    isOpen: false,
    text: "планування",
    func: () => {},
  });
  const [plantId, setPlantId] = useState(0);
  const [prodOpen, setProdOpen] = useState(false);
  const [prodUpdate, setProdUpdate] = useState(false);
  const [prodRes, setProdRes] = useState<productionProp>({
    productId: "",
    techCartId: "",
    isPrimary: "",
    year: "",
  });
  const [productOpen, setProductOpen] = useState(false);
  const [productRes, setProductRes] = useState<CreateProductProps>({
    cultureId: "",
    name: "",
  });

  return (
    <Container maxW={"container.lg"}>
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Спеціалізація та урожайність
      </Text>
      <MyHeading>Планування урожайності</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Культура</Th>
              <Th>Технологія</Th>
              <Th>
                Густота <br />
                насаджень
              </Th>
              <Th>
                Урожайність
                <br /> з гектару
              </Th>
              <Th>
                Урожайність
                <br /> з рослини
              </Th>
              <Th>
                Строк <br />
                посадки
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {yieldPlants.map((el) => {
              return (
                <Tr key={el.id!}>
                  <Td
                    textAlign={"center"}
                    onClick={() => {
                      setPlantId(el.id!);
                      setUpdate(true);
                      setOpen(true);
                      setRes({
                        cultivationTechnologyId: el.cultivationTechnologyId!,
                        cultureId: el.cultureId!,
                        landingPeriod: el.landingPeriod,
                      });
                    }}
                  >
                    <EditIcon
                      color={"blue.400"}
                      w={"20px"}
                      h={"auto"}
                      cursor={"pointer"}
                    />
                  </Td>
                  <Td>
                    <Link to={YIELD_CALC_ROUTER + "/" + el.productId}>
                      <ViewIcon boxSize={5} /> {el?.culture?.name}
                    </Link>
                  </Td>
                  <Td>
                    {
                      map.cultivationTechnologies.find(
                        (e) => e.id == el.cultivationTechnologyId
                      )?.name
                    }
                  </Td>
                  <Td>{el.plantingDensity}</Td>
                  <Td>{el.yieldPerHectare}</Td>
                  <Td>{el.yieldPerRoll}</Td>
                  <Td>{el.landingPeriod}</Td>
                  <Td
                    textAlign={"center"}
                    cursor={"pointer"}
                    color={"red"}
                    onClick={
                      user.role == ""
                        ? () => setShowAlert(true)
                        : () => {
                            setDeleteOpen(() => ({
                              ...deleteOpen,
                              isOpen: true,
                              id: el.id!,
                              text: "карту",
                              func: () => {
                                deleteYieldPlant(income, {
                                  yieldPlantId: el.id!,
                                });
                                setDeleteOpen({
                                  ...deleteOpen,
                                  isOpen: false,
                                });
                              },
                            }));
                          }
                    }
                  >
                    <DeleteIcon w={"20px"} h={"auto"} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </MyTableContainer>
      <Button mt={"15px"} onClick={() => setOpen(true)}>
        Добавити культуру
      </Button>
      <CreateYield
        open={open}
        setOpen={setOpen}
        res={res}
        setRes={setRes}
        update={update}
        plantId={plantId}
      />
      <NoAuthAlert setShowAlert={setShowAlert} showAlert={showAlert} />
      {!!deleteOpen.isOpen && (
        <DeleteAlert
          isOpen={deleteOpen.isOpen}
          setOpen={setDeleteOpen as any}
          text={deleteOpen.text}
          func={deleteOpen.func}
        />
      )}
      <Text
        textAlign={"center"}
        fontSize={"25px"}
        mt={"15px"}
        textTransform={"uppercase"}
      >
        Виробництво
      </Text>
      <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування виробництва
      </Heading>

      <PlanIncomeProductionTable
        setOpen={setProdOpen}
        setUpdate={setProdUpdate}
        setRes={setProdRes}
        setDeleteOpen={setDeleteOpen}
      />
      <Button onClick={() => setProdOpen(true)}>
        Додати продукт або послугу
      </Button>
      <CreateProductService
        open={prodOpen}
        setOpen={setProdOpen}
        res={prodRes}
        setRes={setProdRes}
        setProductOpen={setProductOpen}
        setUpdate={setProdUpdate}
        update={prodUpdate}
      />
      <CreateProduct
        open={productOpen}
        setOpen={setProductOpen}
        res={productRes}
        setRes={setProductRes}
      />
      <Heading textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування собівартості продукції
      </Heading>
      <TableContainer overflowX={"scroll"}>
        <CostProdTable />
      </TableContainer>
      <Button>Добавити продукт або послугу</Button>
    </Container>
  );
}

export default observer(Goods);
