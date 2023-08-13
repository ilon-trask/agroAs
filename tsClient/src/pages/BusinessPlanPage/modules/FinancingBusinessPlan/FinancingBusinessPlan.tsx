import { Box, Heading, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { RefObject, useMemo } from "react";
import TableComponent from "src/components/TableComponent";
import TableContent from "src/components/TableComponent/TableContent";
import Description from "src/ui/Description";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { Ifinancing } from "../../../../../../tRPC serv/models/models";
import CashFlowTableForBusiness from "../CashFlowTableForBusiness";

function FinancingBusinessPlan({
  start,
  end,
  thisCredit,
  thisDerj,
  thisGrand,
  thisInvestment,
  myBusiness,
  aref,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  thisCredit: Ifinancing[] | undefined;
  thisInvestment: Ifinancing[] | undefined;
  thisDerj: Ifinancing[] | undefined;
  thisGrand: Ifinancing[] | undefined;
  aref: RefObject<HTMLTableElement>;
}) {
  const fundraisingPlanData: {
    name: string | number;
    year: number;
    investment: number | "";
    credit: number | "";
    DerjSupport: number | "";
    grant: number | "";
    together: number | "";
    bold?: boolean;
  }[] = [];
  const investmentPlan = [];
  const fundraisingPlanColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "Назва", accessorKey: "name" },
      { header: "Інвестиції", accessorKey: "investment" },
      { header: "Кредит", accessorKey: "credit" },
      { header: "Державна підтримка", accessorKey: "DerjSupport" },
      { header: "Грант", accessorKey: "grant" },
      { header: "Разом", accessorKey: "together" },
    ];
  }, []);
  const investmentColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Показники", accessorKey: "indicators" },
      { header: "1 кв.", accessorKey: "first" },
      { header: "2 кв.", accessorKey: "second" },
      { header: "3 кв.", accessorKey: "third" },
      { header: "4 кв.", accessorKey: "fourth" },
      { header: "За рік", accessorKey: "inYear" },
    ];
  }, []);
  let sum = 0;
  const labels = [];
  for (let i = start; i <= end; i++) {
    labels.push(i);
    fundraisingPlanData.push(
      ...(thisCredit
        ?.filter((el) => el.year == i - start)
        .map((el) => ({
          name: el.name,
          year: i,
          credit: el.cost,
          investment: 0,
          DerjSupport: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisInvestment
        ?.filter((el) => el.year == i - start)
        .map((el) => ({
          name: el.name,
          year: i,
          investment: el.cost,
          credit: 0,
          DerjSupport: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisDerj
        ?.filter((el) => el.year == i - start)
        .map((el) => ({
          name: el.name,
          year: i,
          DerjSupport: el.cost,
          investment: 0,
          credit: 0,
          grant: 0,
          together: el.cost,
        })) || []),
      ...(thisGrand
        ?.filter((el) => el.year == i - start)
        .map((el) => ({
          name: el.name,
          year: i,
          grant: el.cost,
          DerjSupport: 0,
          investment: 0,
          credit: 0,
          together: el.cost,
        })) || [])
    );
    const sumInv =
      thisInvestment
        ?.filter((el) => el.year == i - start)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumCred =
      thisCredit
        ?.filter((el) => el.year == i - start)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumDerj =
      thisDerj
        ?.filter((el) => el.year == i - start)
        .reduce((p, c) => p + c.cost, 0) || 0;
    const sumGrand =
      thisGrand
        ?.filter((el) => el.year == i - start)
        .reduce((p, c) => p + c.cost, 0) || 0;
    fundraisingPlanData.push({
      year: i,
      name: "Разом:",
      credit: sumCred,
      DerjSupport: sumDerj,
      grant: sumGrand,
      investment: sumInv,
      together: sumCred + sumDerj + sumGrand + sumInv,
      bold: true,
    });
    // const mshp ;
    const machinesValue = myBusiness.buying_machines
      .filter((el) => el.year == i - start)
      .reduce((p, c) => p + c.price * c.amount, 0);
    const buildingValue = myBusiness.buildings
      .filter((el) => el.year == i - start)
      .reduce((p, c) => p + +c.startPrice, 0);

    const mshpValue = myBusiness.MSHP.filter(
      (el) => el.year == i - start
    ).reduce((p, c) => p + c.price * c.amount, 0);
    const creatingValue = 0;
    const opersValue = 0;
    sum +=
      machinesValue + buildingValue + mshpValue + creatingValue + opersValue;
    investmentPlan.push(
      { indicators: "Прям інвестицій", bold: true },
      {
        indicators: "Техніка та обладнання",
        inYear: machinesValue,
      },
      {
        indicators: "Будівлі та споруди",
        inYear: buildingValue,
      },
      { indicators: "МШП", inYear: mshpValue },
      {
        indicators: "Всього прямих інвестицій",
        bold: true,
        inYear: machinesValue + buildingValue + mshpValue,
      },
      { indicators: "Створення біоактиву", inYear: creatingValue },
      { indicators: "Покриття операційних витрат", inYear: opersValue },
      {
        indicators: "Всього інвестицій " + i,
        extraBold: true,
        inYear:
          machinesValue +
          buildingValue +
          mshpValue +
          creatingValue +
          opersValue,
      }
    );
  }
  investmentPlan.push({
    indicators: "Загальна потреба коштів (вартість проекту)",
    bold: true,
    inYear: sum,
  });
  // fundraisingPlanData.push()

  return (
    <>
      <SectionTitle aref={aref}>Фінансування</SectionTitle>
      <Table size={"sm"}>
        <Tr>
          <Td>
            <Description>
              Фермери мають кілька можливих шляхів отримання коштів для
              підтримки та розвитку свого сільськогосподарського бізнесу.
              <br />
              Продаж сільгосппродукції: <br />
              Основним джерелом доходу для більшості фермерів є продаж
              сільгосппродукції, такої як зерно, овочі, фрукти, молоко, м'ясо та
              інше. Це може бути як оптовий, так і роздрібний продаж на ринках,
              в магазинах або через спеціалізовані посередницькі структури.
              <br />
              Субсидії та дотації: <br /> Український уряд надає субсидії ,
              дотації та гранти сільськогосподарським підприємствам у вигляді
              державної підтримки для розвитку фермерства. Ці кошти можуть
              надаватися для покриття частини витрат на насіння, добрива,
              обладнання, а також для заохочення розвитку екологічного
              сільськогосподарства та інших спеціалізованих напрямків.
              <br />
              Банківські кредити та позики: <br /> Фермери можуть звертатися до
              банків або фінансових установ для отримання кредитів або позик для
              придбання нового обладнання, землі, розвитку інфраструктури тощо.
              Важливо обирати такі умови, що враховують специфіку аграрної
              галузі.
              <br />
              Інвестори та спонсори: <br />
              Фермери можуть залучати інвесторів або спонсорів для розвитку
              бізнесу. Це можуть бути приватні особи, фонди, компанії, які
              зацікавлені в підтримці сільськогосподарської діяльності з метою
              отримання прибутку або відкриття нових ринків.
              <br />
              Програми підтримки розвитку: <br /> Уряди та недержавні
              організації можуть надавати програми підтримки для фермерів, що
              спрямовані на розвиток інновацій, підвищення продуктивності,
              збільшення якості продукції та інші аспекти.
              <br />
              Агротуризм та додаткові послуги: <br /> Відкриття фермерського
              ринку, проведення агротуристичних екскурсій, надання освітніх
              програм або організація курсів може допомогти отримати додаткові
              кошти.
              <br />
              Фондування та гранти: <br /> Фермери можуть брати участь у
              конкурсах на отримання грантів від різних фондів, програм або
              організацій, що підтримують розвиток сільськогосподарського
              сектору.
              <br />
              Необхідно враховувати, що кожен фермерський бізнес є унікальним, і
              оптимальний шлях отримання коштів може варіюватися в залежності
              від специфіки сільськогосподарської діяльності, регіону та
              ринкових умов.
            </Description>
          </Td>
        </Tr>
      </Table>
      <Heading textAlign={"center"} size={"sm"} mt={5}>
        План залучення коштів
      </Heading>
      <Table size={"sm"}>
        <Tr>
          <Th>
            <TableNumber />
          </Th>
        </Tr>
      </Table>
      <TableComponent
        data={fundraisingPlanData}
        columns={fundraisingPlanColumns}
      />
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Td colSpan={6}>
              <Description>
                Перелік можливих інвестиційних витрат для фермера може бути
                різноманітним і залежати від специфіки сільськогосподарського
                бізнесу, його розміру, напрямків та розвиткових планів. Ось
                деякі загальні категорії інвестиційних витрат, які фермер може
                розглядати:
                <br />
                Придбання та модернізація обладнання:
                <br />
                Трактори та сільгосптехніка. Обладнання для обробки ґрунту
                (плуги, граблі, культиватори тощо). Спеціалізоване обладнання
                для покращення продуктивності (автоматичні збиральні, поливальні
                системи тощо). Обладнання для зберігання та обробки врожаю
                (сушарки, млини тощо). Технологічні рішення та програмне
                забезпечення:
                <br />
                Впровадження сучасних технологій у сільськомусподарську практику
                (системи точного землеробства, дрони, IoT-рішення). Посівні та
                обробні програми для покращення управління виробництвом.
                Покращення інфраструктури:
                <br />
                Будівництво та реконструкція фермерських споруд (сараї, амбари,
                приміщення для зберігання). Системи зберігання та обробки врожаю
                (системи кондиціонування, сушіння, зберігання). Придбання
                насіння, добрив та захисту рослин:
                <br />
                Якісне насіння рослин високої врожайності та резистентності.
                Добрива та засоби захисту рослин для підвищення якості та
                кількості врожаю. Розширення площі обробітку землі:
                <br />
                Оренда, придбання чи організація нових ділянок для посіву та
                вирощування продукції. Розвиток агротуризму та додаткових
                послуг:
                <br />
                Створення інфраструктури для прийому туристів на фермі.
                Організація агроекскурсій, майстер-класів, продаж сувенірів.
                Екологічні та сталі практики:
                <br />
                Впровадження екологічно чистих методів обробки ґрунту та
                вирощування продукції. Виробництво органічної продукції та
                відповідна сертифікація. Оптимізація водопостачання:
                <br />
                Встановлення систем поливу та зберігання води. Організація
                дренажних систем для регулювання вологості ґрунту. Розвиток
                тваринництва:
                <br />
                Закупівля та вдосконалення обладнання для тваринництва.
                Збільшення поголів'я тварин та покращення умов утримання.
                Освітні та навчальні заходи:
                <br />
                Організація навчальних семінарів, тренінгів для фермерів та
                співробітників. Залучення консультантів для підвищення
                кваліфікації.
                <br /> Це лише декілька можливих категорій інвестиційних витрат,
                і перелік може змінюватися відповідно до конкретної ситуації та
                стратегії розвитку фермерського бізнесу.
              </Description>
            </Td>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableName>План інвестування коштів</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={investmentPlan} columns={investmentColumns} />
      </Table>
      <CashFlowTableForBusiness
        myBusiness={myBusiness}
        end={end}
        start={start}
      />
    </>
  );
}

export default FinancingBusinessPlan;
