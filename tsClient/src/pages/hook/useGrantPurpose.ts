const res: [{ id: 1; name: "Державні" }, { id: 2; name: "Комерційні" }] = [
  { id: 1, name: "Державні" },
  { id: 2, name: "Комерційні" },
];
export type GrantPurposeType = (typeof res)[number]["name"];
export default res;
