import TechnologicalMap, { createOperProps } from "./TechnologicalMap";
export default TechnologicalMap;
export type { createOperProps };
export const CartNamesData: {
  name: string;
  label: string;
  bgColor: string;
  borderColor: string;
}[] = [
  {
    name: "Вартість техніки",
    label: "totalCostCars",
    bgColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
  },
  {
    name: "Вартість палива",
    label: "totalCostFuel",
    bgColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
  },
  {
    name: "Оплата праці механізована",
    label: "totalCostMachineWork",
    bgColor: "rgba(255, 206, 86, 0.2)",
    borderColor: "rgba(255, 206, 86, 1)",
  },
  {
    name: "Оплата праці ручна",
    label: "totalCostHandWork",
    bgColor: "rgba(75, 192, 192, 0.2)",
    borderColor: "rgba(75, 192, 192, 1)",
  },
  {
    name: "Вартість матеріалів",
    label: "totalCostMaterials",
    bgColor: "rgba(153, 102, 255, 0.2)",
    borderColor: "rgba(153, 102, 255, 1)",
  },
  {
    name: "Вартість транспорту",
    label: "totalCostTransport",
    bgColor: "rgba(255, 159, 64, 0.2)",
    borderColor: "rgba(255, 159, 64, 1)",
  },
  {
    name: "Вартість послуг",
    label: "totalCostServices",
    bgColor: "rgba(29, 88, 207, 0.2)",
    borderColor: "rgba(29, 88, 207, 1)",
  },
];
