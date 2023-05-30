import { IIsObservableObject } from "mobx/dist/internal";
import { Itech_operation } from "../../../tRPC serv/models/models";
import MapStore from "./MapStore";
export type sectionsOpers = {
  arr: Itech_operation[];
  title: string;
}[];
export default function getSections(map: MapStore, id: number): sectionsOpers {
  const operData = map.opers.filter((el) => {
    return el?.techCartId == id;
  });

  operData.sort((a, b) => a.id! - b.id!);
  const soilPreparation = operData.filter((el) => el.sectionId == 1);
  const landing = operData.filter((el) => el.sectionId == 2);
  const care = operData.filter((el) => el.sectionId == 3);
  const feeding = operData.filter((el) => el.sectionId == 4);
  const monitoring = operData.filter((el) => el.sectionId == 5);
  const protection = operData.filter((el) => el.sectionId == 6);
  const gathering = operData.filter((el) => el.sectionId == 7);
  const storage = operData.filter((el) => el.sectionId == 8);
  const sections = [
    { arr: soilPreparation, title: "Підготовка ґрунту" },
    { arr: landing, title: "Посадка" },
    { arr: care, title: "Догляд" },
    { arr: feeding, title: "Живлення" },
    { arr: monitoring, title: "Моніторинг" },
    { arr: protection, title: "Захист" },
    { arr: gathering, title: "Збір" },
    { arr: storage, title: "Зберігання" },
  ];
  return sections;
}
