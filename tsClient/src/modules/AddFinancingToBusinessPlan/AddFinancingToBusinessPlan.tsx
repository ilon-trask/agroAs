import { Button, Heading, ModalFooter } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Dialog from "src/components/Dialog";
import { addFinancingToBusinessPlan } from "src/http/requests";
import { Context } from "src/main";
import MainFinancingBusinessPlanTable from "../MainFinancingBusinessPlanTable";
type props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  businessId: number;
};
const obj = {};
function AddFinancingToBusinessPlan({ open, setOpen, businessId }: props) {
  const [res, setRes] = useState<number[]>([]);
  const { income, business } = useContext(Context);
  const thisCredit = income.credit.filter(
    (el) => el.calculationType == "Базовий"
  );
  const thisInvestment = income.investment.filter(
    (el) => el.calculationType == "Базовий"
  );
  const thisDerj = income.derj.filter((el) => el.calculationType == "Базовий");
  const thisGrand = income.grant.filter(
    (el) => el.calculationType == "Базовий"
  );
  return (
    <Dialog
      res={res}
      setRes={setRes}
      open={open}
      setOpen={setOpen}
      update={true}
      setUpdate={() => {}}
      isErr={false}
      setIsErr={() => {}}
      props={obj}
      size="3xl"
    >
      <Heading size={"md"} textAlign={"center"}>
        Додавання фінансування в бізнес план
      </Heading>
      <MainFinancingBusinessPlanTable
        thisCredit={thisCredit}
        thisDerj={thisDerj}
        thisGrant={thisGrand}
        thisInvestment={thisInvestment}
        res={res}
        setRes={setRes}
      />
      <ModalFooter>
        <Button
          onClick={() => {
            addFinancingToBusinessPlan(income, business, {
              businessId: businessId,
              value: res,
            });
            setOpen(false);
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </Dialog>
  );
}

export default AddFinancingToBusinessPlan;
