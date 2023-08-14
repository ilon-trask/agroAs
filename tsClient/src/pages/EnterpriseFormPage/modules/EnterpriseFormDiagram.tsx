import {
  Box,
  BoxProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { DoughnutChart } from "src/shared/charts";
import MyHeading from "src/ui/MyHeading";
import { Iworker } from "../../../../../tRPC serv/models/models";
interface props extends BoxProps {
  workers: Iworker[] | undefined;
  chartWidth?: string;
  tableWidth?: string;
}
function EnterpriseFormDiagram(props: props) {
  const { workers, chartWidth, tableWidth } = props;
  const SHPNamesData = [
    {
      name: "Адміністативний",
      bgColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      data: workers
        ?.filter((el) => el.class == "Адміністративний")
        .reduce(
          (p, c) => p + c.salary * (c.amountOfMounths || 12) * c.amount,
          0
        ),
    },
    {
      name: "ІТП",
      bgColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      data: workers
        ?.filter((el) => el.class == "Інженерно технічний")
        .reduce(
          (p, c) => p + c.salary * (c.amountOfMounths || 12) * c.amount,
          0
        ),
    },
    {
      name: "Виробничий",
      bgColor: "rgba(255, 206, 86, 0.2)",
      borderColor: "rgba(255, 206, 86, 1)",
      data: workers
        ?.filter((el) => el.class == "Виробничий")
        .reduce(
          (p, c) => p + c.salary * (c.amountOfMounths || 12) * c.amount,
          0
        ),
    },
    {
      name: "ЄСВ 22%",
      bgColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      data:
        (workers?.reduce(
          (p, c) => p + c.salary * (c.amountOfMounths || 12) * c.amount,
          0
        ) || 0) * 0.22,
    },
    {
      name: "ВЗ 1.5%",
      bgColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      data:
        (workers?.reduce(
          (p, c) => p + c.salary * (c.amountOfMounths || 12) * c.amount,
          0
        ) || 0) * 0.015,
    },
  ];
  const data = {
    labels: SHPNamesData.map((el) => el.name),
    datasets: [
      {
        label: "Сума",
        //@ts-ignore
        data: SHPNamesData.map((el) => el.data),
        backgroundColor: SHPNamesData.map((el) => el.bgColor),
        borderColor: SHPNamesData.map((el) => el.borderColor),
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box display={"flex"} mt={5} {...props}>
      <Box width={chartWidth || "25%"} mx={"auto"} px={"auto"}>
        <DoughnutChart data={data as any} />
      </Box>
      <Box width={tableWidth || "50%"} px={"auto"}>
        <MyHeading>Структура фонду оплати праці</MyHeading>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Колір</Th>
              <Th>Назва</Th>
              <Th>Сума</Th>
              <Th>Частка %</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              ...SHPNamesData,
              {
                name: "Всього",
                bgColor: "rgba(255, 159, 64, 0.2)",
                borderColor: "rgba(255, 159, 64, 1)",
                data:
                  (workers?.reduce(
                    (p, c) =>
                      p + c.salary * (c.amountOfMounths || 12) * c.amount,
                    0
                  ) || 0) * 1.235,
              },
            ].map((el, ind, arr) => (
              <Tr key={el.name}>
                <Td>
                  <Box
                    h={2}
                    bgColor={el.bgColor}
                    borderColor={el.borderColor}
                    borderWidth={2}
                  />
                </Td>
                <Td>{el.name}</Td>
                <Td>{el.data}</Td>
                <Td>
                  {
                    +(
                      //@ts-ignore
                      ((el.data / arr[arr.length - 1].data) * 100).toFixed(1)
                    )
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default EnterpriseFormDiagram;
