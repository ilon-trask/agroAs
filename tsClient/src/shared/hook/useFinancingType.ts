const useFinancingType: [
  { id: 1; name: "credit" },
  { id: 2; name: "investment" },
  { id: 3; name: "derj_support" },
  { id: 4; name: "grant" }
] = [
  { id: 1, name: "credit" },
  { id: 2, name: "investment" },
  { id: 3, name: "derj_support" },
  { id: 4, name: "grant" },
];
export type FinancingType = (typeof useFinancingType)[number]["name"];
export default useFinancingType;
