import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import AddFinancingToBusinessPlan from "src/modules/AddFinancingToBusinessPlan";
import MyHeading from "src/ui/MyHeading";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { Ifinancing } from "../../../../../../tRPC serv/models/models";
import MainFinancingBusinessPlanTable from "./MainFinancingBusinessPlanTable";

function MainFinancingBusTable({
  myBusiness,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
  id,
}: {
  myBusiness: resBusinessPlan | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[];
  id: number;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [addData, setAddData] = useState<number[]>([]);
  return (
    <>
      <MyHeading>Залучення фінансування</MyHeading>
      <MainFinancingBusinessPlanTable
        thisCredit={thisCredit!}
        thisInvestment={thisInvestment!}
        thisDerj={thisDerj!}
        thisGrant={thisGrand!}
        isPlan={true}
      />
      <Button
        onClick={() => {
          setAddOpen(true);
          setAddData(myBusiness?.financings.map((el) => el.id!)!);
        }}
      >
        Додати
      </Button>
      <AddFinancingToBusinessPlan
        open={addOpen}
        setOpen={setAddOpen}
        data={addData}
        businessId={id}
      />
    </>
  );
}

export default MainFinancingBusTable;
