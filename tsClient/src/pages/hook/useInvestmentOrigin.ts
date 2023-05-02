const res: [{ id: 1; name: "Власні" }, { id: 2; name: "Залучені" }] = [
  { id: 1, name: "Власні" },
  { id: 2, name: "Залучені" },
];
export type InvestmentOriginType = (typeof res)[number]["name"];
export default res;
