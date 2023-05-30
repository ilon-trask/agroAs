const useVegetationYears: [
  { id: 1; name: "0рік весна" },
  { id: 2; name: "0рік осінь" },
  { id: 3; name: "1рік" },
  { id: 4; name: "2рік " },
  { id: 5; name: "3рік" },
  { id: 6; name: "4рік" },
  { id: 7; name: "5рік" },
  { id: 8; name: "6рік" },
  { id: 9; name: "7рік" },
  { id: 10; name: "8рік" },
  { id: 11; name: "Наступні" }
] = [
  { id: 1, name: "0рік весна" },
  { id: 2, name: "0рік осінь" },
  { id: 3, name: "1рік" },
  { id: 4, name: "2рік " },
  { id: 5, name: "3рік" },
  { id: 6, name: "4рік" },
  { id: 7, name: "5рік" },
  { id: 8, name: "6рік" },
  { id: 9, name: "7рік" },
  { id: 10, name: "8рік" },
  { id: 11, name: "Наступні" },
];
export type VegetationYearsType = (typeof useVegetationYears)[number]["name"];
export default useVegetationYears;
