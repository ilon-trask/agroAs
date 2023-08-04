const usePaymentsFrequencys: [
  { id: 1; name: "Кожний місяць" },
  //   { id: 2; name: "Кожний квартал" },
  //   { id: 3; name: "Кожні 6 місяців" },
  { id: 4; name: "Кожен рік" }
] = [
  { id: 1, name: "Кожний місяць" },
  //   { id: 2, name: "Кожний квартал" },
  //   { id: 3, name: "Кожні 6 місяців" },
  { id: 4, name: "Кожен рік" },
];
export type PaymentsFrequencysType =
  (typeof usePaymentsFrequencys)[number]["name"];
export default usePaymentsFrequencys;
