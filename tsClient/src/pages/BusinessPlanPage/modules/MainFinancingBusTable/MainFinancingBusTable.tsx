import React, { useState } from "react";
import MyHeading from "src/ui/MyHeading";
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
    <>
      <MyHeading>Залучення фінансування</MyHeading>
      <MainFinancingBusinessPlanTable
        financing={myBusiness?.financings}
        busId={myBusiness?.id!}
        end={end}
        start={start}
      />
    </>
  );
}

export default MainFinancingBusTable;
