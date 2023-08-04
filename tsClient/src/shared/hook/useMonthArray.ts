const useMonthArray: [
  { id: 1; name: "Січень" },
  { id: 2; name: "Лютий" },
  { id: 3; name: "Березень" },
  { id: 4; name: "Квітень" },
  { id: 5; name: "Травень" },
  { id: 6; name: "Червень" },
  { id: 7; name: "Липень" },
  { id: 8; name: "Серпень" },
  { id: 9; name: "Вересень" },
  { id: 10; name: "Жовтень" },
  { id: 11; name: "Листопад" },
  { id: 12; name: "Грудень" }
] = [
  { id: 1, name: "Січень" },
  { id: 2, name: "Лютий" },
  { id: 3, name: "Березень" },
  { id: 4, name: "Квітень" },
  { id: 5, name: "Травень" },
  { id: 6, name: "Червень" },
  { id: 7, name: "Липень" },
  { id: 8, name: "Серпень" },
  { id: 9, name: "Вересень" },
  { id: 10, name: "Жовтень" },
  { id: 11, name: "Листопад" },
  { id: 12, name: "Грудень" },
];
export type MonthType = (typeof useMonthArray)[number]["name"];
export default useMonthArray;
