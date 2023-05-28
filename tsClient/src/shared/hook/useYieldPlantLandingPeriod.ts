const useYieldPlantLandingPeriod: [
  { id: 1; name: "Весна" },
  { id: 2; name: "Осінь" }
] = [
  { id: 1, name: "Весна" },
  { id: 2, name: "Осінь" },
];
export type YieldPlantLandingPeriodType =
  (typeof useYieldPlantLandingPeriod)[number]["name"];
export default useYieldPlantLandingPeriod;
