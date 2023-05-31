const useCreditCalculationMethod: [
  { id: 1; name: "На бізнес-план" },
  { id: 2; name: "На гектар" }
] = [
  { id: 1, name: "На бізнес-план" },
  { id: 2, name: "На гектар" },
];

export type CreditCalculationMethodType =
  (typeof useCreditCalculationMethod)[number]["name"];
export default useCreditCalculationMethod;
