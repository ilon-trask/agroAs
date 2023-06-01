const useCreditCalculationType: [
  { id: 1; name: "Базовий" },
  { id: 2; name: "Індивідуальний" }
] = [
  { id: 1, name: "Базовий" },
  { id: 2, name: "Індивідуальний" },
];

export type CreditCalculationTypeType =
  (typeof useCreditCalculationType)[number]["name"];
export default useCreditCalculationType;
