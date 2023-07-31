import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Box, Button, TableContainer } from "@chakra-ui/react";
import BusinessConceptTable from "../../modules/TEJConceptTable";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import {
  getBuyingMachine,
  getGrades,
  getFinancing,
  getJob,
  getTEJ,
  getVegetationYear,
  getWorker,
  // getYieldPlants,
  getPublicBusiness,
} from "../../http/requests";
import useBusiness from "../../shared/hook/useBusiness";
import useEnterprise from "../../shared/hook/useEnterprise";
export type iName = "resume" | "titlePage" | "";
export type iChild =
  | "aboutProject"
  | "investment"
  | "finIndicators"
  | "deduction"
  | "title"
  | "";
import TitleBusinessPlan from "src/pages/BusinessPlanPage/modules/TitleBusinessPlan";
import ResumeBusinessPlan from "src/pages/BusinessPlanPage/modules/ResumeBusinessPlan";
import EnterpriseBusinessPlan from "src/modules/EnterpriseBusinessPlan";
import ProductionBusinessPlan from "src/modules/ProductionBusinessPlan/ProductionBusinessPlan";
import FinancingBusinessPlan from "src/modules/FinancingBusinessPlan";
import PlanedIndicatorsBusinessPlan from "src/modules/PlanedIndicatorsBusinessPlan";
import AdditionBusinessPlan from "src/modules/AdditionBusinessPlan";
import EnterpriseBusTable from "src/pages/BusinessPlanPage/modules/EnterpriseBusTable";
import SpecializationBusTable from "src/pages/BusinessPlanPage/modules/SpecializationBusTable";
import GeneralBusTable from "src/pages/BusinessPlanPage/modules/GeneralBusTable";
import MainFinancingBusTable from "src/pages/BusinessPlanPage/modules/MainFinancingBusTable";
import BuyingMachineBusTable from "./modules/BuyingMachineBusTable";
import BuildingBusTable from "./modules/BuildingBusTable";
import MyHeading from "src/ui/MyHeading";
import OutcomeBusTable from "./modules/OutcomeBusTable";
import QuizButton from "./modules/QuizButton";
import MSHPBusTable from "./modules/MSHPBusTable/MSHPBusTable";
import SaleBusTable from "./modules/SaleBusTable";
import getStartAndEndBusinessPlan from "src/shared/hook/getStartAndEndBusinessPlan";
import LandBusTable from "./modules/LandBusTable";
import PlanYieldBusTable from "./modules/PlanYieldBusTable";
export function getMonthAmountFromBusinessPlan(
  dateStart: string,
  i: number,
  start: number
) {
  return i == start ? 13 - +dateStart.split("-")[1] : 12;
}
function BiznesPlanPage() {
  console.time("all");
  const { map, enterpriseStore, business, income, TEJ, user } =
    useContext(Context);
  const { id } = useParams();
  useBusiness(business, map);
  useEnterprise();
  useEffect(() => {
    // getOnePlan(business, +id!);
    getVegetationYear(income);
    getWorker(enterpriseStore);
    getJob(enterpriseStore);
    getBuyingMachine(map);
    getFinancing(income);
    getGrades(map);
    getTEJ(TEJ);
    getPublicBusiness(map, business);
  }, []);
  const myBusiness =
    business.businessPlan.find((el) => el.id == id) ||
    business.publicBusinessPlan.find((el) => el.id == id);
  console.log("myBusiness");
  console.log(myBusiness);
  console.log(enterpriseStore.job);

  const [ready, setReady] = useState(false);
  const titleRef = useRef<HTMLTableElement>(null);
  const resumeRef = useRef<HTMLTableElement>(null);
  const enterpriseRef = useRef<HTMLTableElement>(null);
  const productionRef = useRef<HTMLTableElement>(null);
  const financingRef = useRef<HTMLTableElement>(null);
  const indicatorRef = useRef<HTMLTableElement>(null);
  const additionRef = useRef<HTMLTableElement>(null);
  const buttonsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (myBusiness) setReady(true);
  }, [myBusiness]);
  myBusiness?.busProds.forEach((el) => {
    if (el.tech_cart) el.tech_cart.area = el.area;
  });
  const navigate = useNavigate();
  if (!ready || !myBusiness) return <Box></Box>;
  const productSet = new Set(
    myBusiness?.busProds?.map((el) => el.product?.culture?.product!)
  );
  const { start, end } = getStartAndEndBusinessPlan(myBusiness);
  const cultureSet = new Set(
    myBusiness?.busProds?.map((el) => el?.product?.culture?.name!)
  );
  let thisWorkers = myBusiness?.workers?.filter(
    (e) => e.form == myBusiness?.enterprise?.form
  );
  const thisCredit = myBusiness?.financings.filter((el) => el.type == "credit");
  const thisInvestment = myBusiness?.financings.filter(
    (el) => el.type == "investment"
  );
  const thisDerj = myBusiness?.financings.filter(
    ({ type }) => type == "derj_support"
  );
  const thisGrand = myBusiness?.financings.filter((el) => el.type == "grant");
  console.timeEnd("all");

  return (
    <Box overflowX={"auto"} maxW={"1100px"} mx={"auto"}>
      <Button onClick={() => navigate("/")} mt={"15px"}>
        Повернутиcя
      </Button>
      <MyHeading>
        Бізнес-план: <br />
        {myBusiness.name}
      </MyHeading>
      {user.role != "" ? (
        <Accordion allowMultiple={true} allowToggle={true} width={"1100px"}>
          <GeneralBusTable myBusiness={myBusiness} />
          <EnterpriseBusTable myBusiness={myBusiness} />
          <LandBusTable myBusiness={myBusiness} start={start} end={end} />
          <SpecializationBusTable
            myBusiness={myBusiness}
            end={end}
            start={start}
          />
          <MainFinancingBusTable
            myBusiness={myBusiness}
            end={end}
            start={start}
          />
          <BuyingMachineBusTable
            myBusiness={myBusiness}
            end={end}
            start={start}
          />
          <BuildingBusTable myBusiness={myBusiness} end={end} start={start} />
          <MSHPBusTable myBusiness={myBusiness} end={end} start={start} />
          <OutcomeBusTable myBusiness={myBusiness} end={end} start={start} />
          <PlanYieldBusTable myBusiness={myBusiness} end={end} start={start} />
          <SaleBusTable myBusiness={myBusiness} end={end} start={start} />
        </Accordion>
      ) : null}
      <Box display={"flex"} justifyContent={"center"}>
        <Button>Сформувати</Button>
      </Box>
      {user.role != "" ? (
        <Box display={"flex"} justifyContent={"space-between"} ref={buttonsRef}>
          <Button>Отримати PDF</Button>
          <QuizButton myBusiness={myBusiness} />
        </Box>
      ) : null}
      <Box
        maxW={"1000px"}
        mx="auto"
        display={["block", "block", "block", "flex"]}
        gap={"30px"}
      >
        <TableContainer
          maxW="min-content"
          mt={"20px"}
          overflowX={"auto"}
          gridColumnStart={1}
          gridColumnEnd={2}
        >
          <BusinessConceptTable
            setOpenResume={() => {}}
            setOpenTitle={() => {}}
            getData={() => {}}
            indicatorRef={indicatorRef}
            additionRef={additionRef}
            enterpriseRef={enterpriseRef}
            financingRef={financingRef}
            productionRef={productionRef}
            resumeRef={resumeRef}
            titleRef={titleRef}
            buttonsRef={buttonsRef}
          />
        </TableContainer>
        <Box
          mt={4}
          w={"720px"}
          h={`${720 * 1.4}px`}
          border={"black 2px solid"}
          p={"30px"}
          px={"30px"}
          overflowY={"auto"}
        >
          <TitleBusinessPlan
            topic={myBusiness?.topic!}
            name={myBusiness?.name!}
            aref={titleRef}
          />
          <ResumeBusinessPlan
            area={myBusiness?.busProds?.reduce((p, c) => p + c.area, 0) || 0}
            dateStart={myBusiness?.dateStart!}
            productSet={productSet}
            aref={resumeRef}
            myBusiness={myBusiness}
          />
          <EnterpriseBusinessPlan
            cultureSet={cultureSet}
            end={end}
            start={start}
            form={myBusiness?.enterprise?.form!}
            myBusiness={myBusiness!}
            name={myBusiness?.enterprise?.name!}
            taxGroup={myBusiness?.enterprise?.taxGroup!}
            thisWorkers={thisWorkers}
            aref={enterpriseRef}
          />
          <ProductionBusinessPlan
            end={end}
            start={start}
            myBusiness={myBusiness!}
            aref={productionRef}
          />
          <FinancingBusinessPlan
            start={start}
            end={end}
            myBusiness={myBusiness!}
            thisCredit={thisCredit}
            thisDerj={thisDerj}
            thisGrand={thisGrand}
            thisInvestment={thisInvestment}
            aref={financingRef}
          />
          <PlanedIndicatorsBusinessPlan
            aref={indicatorRef}
            start={start}
            end={end}
            myBusiness={myBusiness!}
            thisWorkers={thisWorkers!}
          />
          <AdditionBusinessPlan
            start={start}
            end={end}
            form={myBusiness?.enterprise?.form!}
            myBusiness={myBusiness!}
            thisWorkers={thisWorkers!}
            cultureSet={cultureSet}
            thisCredit={thisCredit}
            thisDerj={thisDerj}
            thisGrand={thisGrand}
            thisInvestment={thisInvestment}
            aref={additionRef}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default observer(BiznesPlanPage);
