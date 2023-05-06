const useBuyingMachinePurpose: [
  { id: 1; name: "Трактор" },
  { id: 2; name: "СГ машина" },
  { id: 3; name: "Технологічне обладнання" }
] = [
  { id: 1, name: "Трактор" },
  { id: 2, name: "СГ машина" },
  { id: 3, name: "Технологічне обладнання" },
];
export type BuyingMachinePurposeType =
  (typeof useBuyingMachinePurpose)[number]["name"];
export default useBuyingMachinePurpose;
