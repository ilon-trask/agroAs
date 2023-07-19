import React, { useState } from "react";
import MyHeading from "src/ui/MyHeading";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import MainFinancingBusinessPlanTable from "./MainFinancingBusinessPlanTable";

function MainFinancingBusTable({
  myBusiness,
  id,
  end,
  start,
}: {
  myBusiness: resBusinessPlan | undefined;
  id: number;
  start: number;
  end: number;
}) {
  return (
    <>
      <MyHeading>Залучення фінансування</MyHeading>
      <MainFinancingBusinessPlanTable
        financing={myBusiness?.financings}
        busId={id}
        end={end}
        start={start}
      />
    </>
  );
}

export default MainFinancingBusTable;
