const res: [
  { id: 1; name: "Субсидія" },
  { id: 2; name: "Дотація" },
  { id: 3; name: "Поворотна допомога" }
] = [
  { id: 1, name: "Субсидія" },
  { id: 2, name: "Дотація" },
  { id: 3, name: "Поворотна допомога" },
];
export type DerjPurposeType = (typeof res)[number]["name"];
export default res;
