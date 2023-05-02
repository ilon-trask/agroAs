const res: [
  { id: 1; name: "Поповнення обігових коштів" },
  { id: 2; name: "Закупка основних засобів" }
] = [
  { id: 1, name: "Поповнення обігових коштів" },
  { id: 2, name: "Закупка основних засобів" },
];
export type CreditPurposeType = (typeof res)[number]["name"];
export default res;
