const useWorkerClasses: [
  { id: 1; name: "Адміністративний" },
  { id: 2; name: "Виробничий" }
] = [
  { id: 1, name: "Адміністративний" },
  { id: 2, name: "Виробничий" },
];
export type WorkerClassesType = (typeof useWorkerClasses)[number]["name"];
export default useWorkerClasses;
