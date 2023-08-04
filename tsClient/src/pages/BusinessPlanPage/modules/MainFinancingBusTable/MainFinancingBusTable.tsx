import { AccordionItem, AccordionPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import BusHeading from "src/ui/BusHeading";
import MyAccordionButton from "src/ui/MyAccordionButton";
import MyTableContainer from "src/ui/MyTableContainer";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import MainFinancingBusinessPlanTable from "./MainFinancingBusinessPlanTable";

function MainFinancingBusTable({
  myBusiness,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  start: number;
  end: number;
}) {
  return (
    <AccordionItem>
      <MyAccordionButton>
        <BusHeading>Залучення фінансування</BusHeading>
      </MyAccordionButton>
      <AccordionPanel>
        <MyTableContainer>
          <MainFinancingBusinessPlanTable
            financing={myBusiness?.financings}
            busId={myBusiness?.id!}
            end={end}
            start={start}
          />
        </MyTableContainer>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default React.memo(MainFinancingBusTable);
