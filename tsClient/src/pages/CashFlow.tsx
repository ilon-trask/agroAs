import {
  Box,
  Button,
  Container,
  Input,
  Link,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CashFlowTable from "../modules/CashFlowTable";
import { INCOME_ROUTER, MAP_ROUTE } from "../utils/consts";

function CashFlow() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const month = (function getMonth() {
    const month = new Date().getUTCMonth();
    if (month < 10) {
      return "0" + month;
    }
    return month;
  })();
  const [time, setTime] = useState({
    from: year + "-" + month,
    to: year + "-" + 12,
  });
  console.log(year + "-" + month);
  function setYear(year: number) {
    setTime({ from: year + "-" + "01", to: year + "-" + 12 });
  }
  //@ts-ignore
  const manyTimes = +time.to.split("-")[0] - +time.from.split("-")[0];
  return (
    <Container maxW="1000px">
      <Text textAlign={"center"} fontSize={"25px"} mt={"15px"}>
        Планування графіку доходів та витрат
      </Text>
      <Box display={"flex"} alignItems={"center"} maxW={"50%"}>
        <Text as={"span"} fontWeight={"bold"}>
          Період:
        </Text>
        <Text as={"span"} ml={2}>
          з
        </Text>
        <Input
          type={"month"}
          ml={1}
          value={time.from}
          onChange={(e) => {
            if (e.target.value < time.to)
              setTime((prev) => ({ ...prev, from: e.target.value }));
          }}
        />
        <Text as={"span"} ml={2}>
          до
        </Text>
        <Input
          type={"month"}
          ml={1}
          value={time.to}
          onChange={(e) => {
            if (e.target.value > time.from)
              setTime((prev) => ({ ...prev, to: e.target.value }));
          }}
        />
      </Box>
      <Box mt={3}>
        <Text as={"span"} fontWeight={"bold"}>
          По роках:
        </Text>
        {(() => {
          const res: JSX.Element[] = [];
          for (let i = year; i < +year + 8; i++) {
            res.push(
              <Link ml={1} color={"blue.400"} onClick={() => setYear(i)}>
                {i}
              </Link>
            );
          }

          return res;
        })()}
      </Box>
      <TableContainer maxW="1000px" mx="auto" mt={"20px"} overflowX={"scroll"}>
        {(() => {
          console.log(manyTimes);
          const res: JSX.Element[] = [];
          const from = time.from.split("-")[0];
          const to = time.to.split("-")[0];
          for (let i = 0; i <= manyTimes; i++) {
            console.log(i);
            res.push(<CashFlowTable year={+from + +i} />);
          }
          return res;
        })()}
      </TableContainer>
      <Box display={"flex"} justifyContent={"space-evenly"} mt={"15px"}>
        <Button onClick={() => navigate(INCOME_ROUTER)}>
          Назад до доходів
        </Button>
        <Button>Добавити в бізнес-план</Button>
        <Button onClick={() => navigate(MAP_ROUTE)}>Назад до витрат</Button>
      </Box>
    </Container>
  );
}

export default CashFlow;
