import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { setPatchBusinessPlan } from "src/modules/BusinessTable";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import QuizBusinessPopUp from "./QuizBusinessPopUp";

function QuizButton({
  myBusiness,
}: {
  myBusiness: resBusinessPlan | undefined;
}) {
  const [openQuiz, setOpenQuiz] = useState(false);
  const [update, setUpdate] = useState(false);
  const [quizRes, setQuizRes] = useState({});
  return (
    <>
      <Button
        onClick={() => {
          setOpenQuiz(true);
          setQuizRes({
            cultureIds: myBusiness ? setPatchBusinessPlan(myBusiness) : null,
            dateStart: myBusiness?.dateStart,
            enterpriseId: myBusiness?.enterpriseId!,
            initialAmount: myBusiness?.initialAmount,
            name: myBusiness?.name,
            realizationTime: myBusiness?.realizationTime,
            planId: myBusiness?.id,
          });
        }}
      >
        Конструктор
      </Button>
      <QuizBusinessPopUp
        open={openQuiz}
        setOpen={setOpenQuiz}
        update={update}
        setUpdate={setUpdate}
        res={quizRes}
        setRes={setQuizRes}
        enterpriseId={myBusiness?.enterpriseId!}
        //@ts-ignore
        cultures={myBusiness?.busCuls?.map((el) => el.culture)}
        myBusiness={myBusiness!}
      />
    </>
  );
}

export default QuizButton;
