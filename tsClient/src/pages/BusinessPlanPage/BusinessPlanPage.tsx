import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, TableContainer } from "@chakra-ui/react";
import BusinessConceptTable from "../../modules/TEJConceptTable";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import {
  getBuyingMachine,
  getGrades,
  getFinancing,
  getJob,
  getManyCartWithOpers,
  getTEJ,
  getVegetationYear,
  getWorker,
  getYieldPlants,
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
  | "title";
import getSectionsOpers from "../../store/GetSectionsOpers";
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
import { Ioutcome } from "../../../../tRPC serv/models/models";
import getYearFromString from "src/shared/funcs/getYearFromString";
import LandBusTable from "./modules/LandBusTable";
import PlanYieldBusTable from "./modules/PlanYieldBusTable";
export function getMonthAmountFromBusinessPlan(
  dateStart: string,
  i: number,
  start: number
) {
  return i == start ? 13 - +dateStart.split("-")[1] : 12;
}
console.time("all");
function BiznesPlanPage() {
  const { map, enterpriseStore, business, income, TEJ } = useContext(Context);
  useBusiness(business, map);
  useEnterprise();
  useEffect(() => {
    getYieldPlants(income);
    getVegetationYear(income);
    getWorker(enterpriseStore);
    getJob(enterpriseStore);
    getBuyingMachine(map);
    getFinancing(income);
    getGrades(map);
    getTEJ(TEJ);
    getPublicBusiness(map, business);
  }, []);
  const { id } = useParams();
  const myBusiness =
    business.businessPlan.find((el) => el.id == id) ||
    business.publicBusinessPlan.find((el) => el.id == id);
  console.log("myBusiness");
  console.log(myBusiness);
  myBusiness?.busProds.forEach((el) => {
    if (el.tech_cart) el.tech_cart.area = el.area;
  });

  if (myBusiness && !myBusiness.financings.find((el) => el.id == 0))
    myBusiness.financings = [
      {
        date: myBusiness?.dateStart!,
        calculationMethod: "На бізнес-план",
        calculationType: "Індивідуальний",
        cost: myBusiness?.initialAmount!,
        isUseCost: false,
        name: "Початкові інвестиції",
        purpose: "Власні",
        type: "investment",
        id: 0,
      },
      ...(myBusiness?.financings || []),
    ];

  const [ready, setReady] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [operReady, setOperReady] = useState(false);
  const { start, end } = getStartAndEndBusinessPlan(myBusiness!);
  const titleRef = useRef<HTMLTableElement>(null);
  const resumeRef = useRef<HTMLTableElement>(null);
  const enterpriseRef = useRef<HTMLTableElement>(null);
  const productionRef = useRef<HTMLTableElement>(null);
  const financingRef = useRef<HTMLTableElement>(null);
  const indicatorRef = useRef<HTMLTableElement>(null);
  const additionRef = useRef<HTMLTableElement>(null);
  const buttonsRef = useRef<HTMLParagraphElement>(null);
  const cultureSet = new Set(
    myBusiness?.busProds?.map((el) => el?.product?.culture?.name!)
  );

  useEffect(() => {
    if (myBusiness)
      myBusiness.outcomes = (() => {
        const outcomes: Ioutcome[] = [];
        for (let i = start; i <= end; i++) {
          myBusiness.outcomes
            .filter((el) => getYearFromString(el.date) == i)
            .forEach((el) => {
              outcomes.push({
                ...el,
                costYear:
                  el.costMonth *
                  getMonthAmountFromBusinessPlan(
                    myBusiness.dateStart,
                    i,
                    start
                  ),
              });
            });

          outcomes.push({
            name: "Оплата праці АП",
            group: "Постійні",
            date: i + "-01-01",
            costYear: myBusiness.workers
              .filter(
                (el) => el.year == i - start && el.class == "Адміністративний"
              )
              .reduce((p, c) => {
                const yearSalary =
                  c.salary *
                  (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                    12) *
                  c.amount;
                return p + yearSalary;
              }, 0),
          });
          outcomes.push({
            name: "Нарахування (ЄСВ+ВЗ)",
            group: "Постійні",
            date: i + "-01-01",
            costYear: myBusiness.workers
              .filter(
                (el) => el.year == i - start && el.class == "Адміністративний"
              )
              .reduce((p, c) => {
                const yearSalary =
                  c.salary *
                  (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                    12) *
                  c.amount;
                return p + (yearSalary * 0.015 + yearSalary * 0.22);
              }, 0),
          });
          outcomes.push({
            name: "Оплата праці ІТР",
            group: "Загально виробничі",
            date: i + "-01-01",
            costYear: myBusiness.workers
              .filter(
                (el) =>
                  el.year == i - start && el.class == "Інженерно технічний"
              )
              .reduce((p, c) => {
                const yearSalary =
                  c.salary *
                  (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                    12) *
                  c.amount;
                return p + yearSalary;
              }, 0),
          });
          outcomes.push({
            name: "Нарахування (ЄСВ+ВЗ)",
            group: "Загально виробничі",
            date: i + "-01-01",
            costYear: myBusiness.workers
              .filter(
                (el) =>
                  el.year == i - start && el.class == "Інженерно технічний"
              )
              .reduce((p, c) => {
                const yearSalary =
                  c.salary *
                  (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                    12) *
                  c.amount;
                return p + (yearSalary * 0.015 + yearSalary * 0.22);
              }, 0),
          });
        }
        return outcomes;
      })();
  }, [myBusiness]);

  const productSet = new Set(
    myBusiness?.busProds?.map((el) => el.product?.culture?.product!)
  );
  let thisWorkers = myBusiness?.workers?.filter(
    (e) => e.form == myBusiness?.enterprise?.form
  );
  const thisMaps =
    myBusiness?.busProds
      .map((e) =>
        map.businessCarts
          .filter(
            (el) =>
              el.isBasic &&
              el.cultureId == e?.product?.cultureId &&
              el.cultivationTechnologyId == e?.cultivationTechnologyId
          )
          .map((m) => ({
            ...m,
            area: e?.area!,
          }))
      )
      .flat() || [];
  useEffect(() => {
    if (myBusiness) setReady(true);
  }, [myBusiness]);
  useEffect(() => {
    if (thisMaps[0]) setCartReady(true);
  }, [thisMaps[0]]);
  useEffect(() => {
    if (map.opers[0]) setOperReady(true);
  }, [map.opers[0]?.nameOperation]);
  useEffect(() => {
    if (cartReady) {
      getManyCartWithOpers(
        map,
        thisMaps.map((el) => el.id!)
      );
    }
  }, [cartReady]);
  let sections = useMemo(() => {
    if (operReady) {
      return thisMaps.map((el) => ({
        data: getSectionsOpers(map, el.id!, []),
        year: el.year,
      }));
    }
  }, [map.opers, cartReady, operReady]);
  if (myBusiness)
    myBusiness.financings = myBusiness?.financings.map((el) => ({
      ...el,
      typeName:
        el.type == "credit"
          ? "Кредит"
          : el.type == "derj_support"
          ? "Державна підтримка"
          : el.type == "grant"
          ? "Грант"
          : el.type == "investment"
          ? "Інвестиції"
          : null,
    }));
  const thisCredit = myBusiness?.financings.filter((el) => el.type == "credit");
  const thisInvestment = myBusiness?.financings.filter(
    (el) => el.type == "investment"
  );
  const thisDerj = myBusiness?.financings.filter(
    ({ type }) => type == "derj_support"
  );
  const thisGrand = myBusiness?.financings.filter((el) => el.type == "grant");

  return !ready && !cartReady && !myBusiness ? (
    <Box></Box>
  ) : (
    <Box overflowX={"auto"} maxW={"1100px"} mx={"auto"}>
      <MyHeading>Бізнес-план {myBusiness?.name}</MyHeading>
      <GeneralBusTable myBusiness={myBusiness} />
      <EnterpriseBusTable myBusiness={myBusiness} />
      <LandBusTable myBusiness={myBusiness} start={start} end={end} />
      <SpecializationBusTable myBusiness={myBusiness} end={end} start={start} />
      <MainFinancingBusTable myBusiness={myBusiness} end={end} start={start} />
      <BuyingMachineBusTable myBusiness={myBusiness} end={end} start={start} />
      <BuildingBusTable myBusiness={myBusiness} end={end} start={start} />
      <MSHPBusTable myBusiness={myBusiness} end={end} start={start} />
      <OutcomeBusTable myBusiness={myBusiness} end={end} start={start} />
      <PlanYieldBusTable myBusiness={myBusiness} end={end} start={start} />
      <SaleBusTable myBusiness={myBusiness} end={end} start={start} />
      <Box display={"flex"} justifyContent={"space-between"} ref={buttonsRef}>
        <Button>Отримати PDF</Button>
        <QuizButton myBusiness={myBusiness} />
      </Box>
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
            thisMaps={thisMaps}
            productSet={productSet}
            area={myBusiness?.busProds?.reduce((p, c) => p + c.area, 0) || 0}
            aref={productionRef}
          />
          <FinancingBusinessPlan
            start={start}
            end={end}
            myBusiness={myBusiness}
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
            thisWorkers={thisWorkers}
            thisMaps={thisMaps}
          />
          <AdditionBusinessPlan
            start={start}
            end={end}
            form={myBusiness?.enterprise?.form!}
            myBusiness={myBusiness!}
            thisMaps={thisMaps}
            thisWorkers={thisWorkers}
            cultureSet={cultureSet}
            sections={sections!}
            operReady={operReady}
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

console.timeEnd("all");
export default observer(BiznesPlanPage);
