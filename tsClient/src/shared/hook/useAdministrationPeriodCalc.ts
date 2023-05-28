const useAdministrationPeriodCalc: [
  { id: 1; name: "Помісячно" },
  { id: 2; name: "Поквартально" },
  { id: 3; name: "За рік" }
] = [
  { id: 1, name: "Помісячно" },
  { id: 2, name: "Поквартально" },
  { id: 3, name: "За рік" },
];

export type AdministrationPeriodCalcType =
  (typeof useAdministrationPeriodCalc)[number]["name"];

export default useAdministrationPeriodCalc;
