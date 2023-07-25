const useFinancingType: [
  { id: 1; name: "credit"; clientName: "Кредит" },
  { id: 2; name: "investment"; clientName: "Інвестиції" },
  { id: 3; name: "derj_support"; clientName: "Держ допомога" },
  { id: 4; name: "grant"; clientName: "Грант" }
] = [
  { id: 1, name: "credit", clientName: "Кредит" },
  { id: 2, name: "investment", clientName: "Інвестиції" },
  { id: 3, name: "derj_support", clientName: "Держ допомога" },
  { id: 4, name: "grant", clientName: "Грант" },
];
export type FinancingType = (typeof useFinancingType)[number]["name"];
export default useFinancingType;
