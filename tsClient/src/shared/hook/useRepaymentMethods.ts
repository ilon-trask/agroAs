const useRepaymentMethods: [
  { id: 1; name: "Ануїтет" },
  { id: 2; name: "Класична схема" }
] = [
  { id: 1, name: "Ануїтет" },
  { id: 2, name: "Класична схема" },
];
export type RepaymentsMethodsType =
  (typeof useRepaymentMethods)[number]["name"];
export default useRepaymentMethods;
