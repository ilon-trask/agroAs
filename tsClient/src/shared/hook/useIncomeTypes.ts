export type IncomeTypesType = [
  { id: 1; name: "Основне виробництво" },
  { id: 2; name: "Допоміжне виробництво" },
  { id: 3; name: "Кредит" },
  { id: 4; name: "Інвестиції" },
  { id: 5; name: "Державна підтримка" },
  { id: 6; name: "Грант" },
  { id: 7; name: "Не визначино" }
];
export type IncomeType =
  | "Основне виробництво"
  | "Допоміжне виробництво"
  | "Кредит"
  | "Інвестиції"
  | "Державна підтримка"
  | "Грант"
  | "Не визначино";
const useIncomeTypes: IncomeTypesType = [
  { id: 1, name: "Основне виробництво" },
  { id: 2, name: "Допоміжне виробництво" },
  { id: 3, name: "Кредит" },
  { id: 4, name: "Інвестиції" },
  { id: 5, name: "Державна підтримка" },
  { id: 6, name: "Грант" },
  { id: 7, name: "Не визначино" },
];

export default useIncomeTypes;
