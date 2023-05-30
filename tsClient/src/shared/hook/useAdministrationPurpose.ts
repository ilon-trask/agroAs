const useAdministrationPurpose: [
  { id: 1; name: "Оплата праці" },
  { id: 2; name: "Спрала податків" },
  { id: 3; name: "Оплата послуг" }
] = [
  { id: 1, name: "Оплата праці" },
  { id: 2, name: "Спрала податків" },
  { id: 3, name: "Оплата послуг" },
];

export type AdministrationPurposeType =
  (typeof useAdministrationPurpose)[number]["name"];

export default useAdministrationPurpose;
