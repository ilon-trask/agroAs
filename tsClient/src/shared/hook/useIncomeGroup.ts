export type IncomeGroupsType = [
  { id: 1; name: "Виручка від основного виробництва"; typeId: 1 },
  { id: 2; name: "Виручка від допоміжного виробництва"; typeId: 2 },
  { id: 3; name: "Кредит оботній"; typeId: 3 },
  { id: 4; name: "Кредит інвестиційний"; typeId: 3 },
  { id: 5; name: "Інвестиції власні"; typeId: 4 },
  { id: 6; name: "Інвестиції інвесторські"; typeId: 4 },
  { id: 7; name: "Інвестиції залучені від інвесторів"; typeId: 4 },
  { id: 8; name: "Субсидії"; typeId: 5 },
  { id: 9; name: "Дотації"; typeId: 5 },
  { id: 10; name: "Поворотня фінансова допомога"; typeId: 5 },
  { id: 11; name: "Грантові кошти"; typeId: 6 },
  { id: 12; name: "Не визначино"; typeId: 7 }
];
export type IncomeGroup =
  | "Виручка від основного виробництва"
  | "Виручка від допоміжного виробництва"
  | "Кредит оботній"
  | "Кредит інвестиційний"
  | "Інвестиції власні"
  | "Інвестиції інвесторські"
  | "Інвестиції залучені від інвесторів"
  | "Субсидії"
  | "Дотації"
  | "Поворотня фінансова допомога"
  | "Грантові кошти"
  | "Не визначино";
const res: IncomeGroupsType = [
  { id: 1, name: "Виручка від основного виробництва", typeId: 1 },
  { id: 2, name: "Виручка від допоміжного виробництва", typeId: 2 },
  { id: 3, name: "Кредит оботній", typeId: 3 },
  { id: 4, name: "Кредит інвестиційний", typeId: 3 },
  { id: 5, name: "Інвестиції власні", typeId: 4 },
  { id: 6, name: "Інвестиції інвесторські", typeId: 4 },
  { id: 7, name: "Інвестиції залучені від інвесторів", typeId: 4 },
  { id: 8, name: "Субсидії", typeId: 5 },
  { id: 9, name: "Дотації", typeId: 5 },
  { id: 10, name: "Поворотня фінансова допомога", typeId: 5 },
  { id: 11, name: "Грантові кошти", typeId: 6 },
  { id: 12, name: "Не визначино", typeId: 7 },
];

export default res;