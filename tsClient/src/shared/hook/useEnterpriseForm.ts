const useEnterpriseForm: [
  { id: 1; name: "ФОП"; prop: "isFOP" },
  { id: 2; name: "ФОП + 1"; prop: "isFOPWith" },
  { id: 3; name: "ФОП + 2"; prop: "isFOPWith" },
  { id: 4; name: "ФОП + 3"; prop: "isFOPWith" },
  { id: 5; name: "ФОП + 4"; prop: "isFOPWith" },
  { id: 6; name: "Юридична особа ФГ"; prop: "isQO" }
] = [
  { id: 1, name: "ФОП", prop: "isFOP" },
  { id: 2, name: "ФОП + 1", prop: "isFOPWith" },
  { id: 3, name: "ФОП + 2", prop: "isFOPWith" },
  { id: 4, name: "ФОП + 3", prop: "isFOPWith" },
  { id: 5, name: "ФОП + 4", prop: "isFOPWith" },
  { id: 6, name: "Юридична особа ФГ", prop: "isQO" },
];
export type EnterpriseFormType = (typeof useEnterpriseForm)[number]["name"];
export default useEnterpriseForm;
