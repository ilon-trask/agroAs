const useEnterpriseForm: [
  { id: 1; name: "ФОП без членів" },
  { id: 2; name: "ФОП з членами" },
  { id: 3; name: "Юридична особа ФГ" },
  { id: 4; name: "Не визначено" }
] = [
  { id: 1, name: "ФОП без членів" },
  { id: 2, name: "ФОП з членами" },
  { id: 3, name: "Юридична особа ФГ" },
  { id: 4, name: "Не визначено" },
];
export type EnterpriseFormType = (typeof useEnterpriseForm)[number]["name"];
export default useEnterpriseForm;
