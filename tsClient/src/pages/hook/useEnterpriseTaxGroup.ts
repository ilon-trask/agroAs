const useEnterpriseTaxGroup: [
  { id: 1; name: "II група" },
  { id: 2; name: "III група з пдв" },
  { id: 3; name: "III група без пдв" },
  { id: 4; name: "IV група" },
  { id: 5; name: "Загальна" }
] = [
  { id: 1, name: "II група" },
  { id: 2, name: "III група з пдв" },
  { id: 3, name: "III група без пдв" },
  { id: 4, name: "IV група" },
  { id: 5, name: "Загальна" },
];
export type EnterpriseTaxGroupType =
  (typeof useEnterpriseTaxGroup)[number]["name"];
export default useEnterpriseTaxGroup;
