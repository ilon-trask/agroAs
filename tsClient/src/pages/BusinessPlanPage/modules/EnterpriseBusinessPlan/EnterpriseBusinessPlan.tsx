import { Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React, { RefObject, useMemo } from "react";
import { EnterpriseFormType } from "src/shared/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "src/shared/hook/useEnterpriseTaxGroup";
import Description from "../../../../ui/Description";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { Iworker } from "../../../../../../tRPC serv/models/models";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { ColumnDef } from "@tanstack/react-table";
import TableComponent from "src/components/TableComponent";
import TableContent from "src/components/TableComponent/TableContent";

function EnterpriseBusinessPlan({
  name,
  form,
  taxGroup,
  cultureSet,
  thisWorkers,
  end,
  start,
  myBusiness,
  aref,
}: {
  name: string;
  form: EnterpriseFormType;
  taxGroup: EnterpriseTaxGroupType;
  cultureSet: Set<string>;
  thisWorkers: Iworker[] | undefined;
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
  aref: RefObject<HTMLTableElement>;
}) {
  let sum = 0;
  const salaryExpensesData = [];
  const wageAnalysisData = [];
  const groundSectionData: {
    paymentType: string;
    cadastreNumber: number | null;
    area: number;
    rate: number;
    ownership: string;
  }[] = [];
  const areasUsageData = [];

  (() => {
    for (let i = start; i <= end; i++) {
      const workers = thisWorkers?.filter((el) => el.year == i - start);

      let adAmount = 0;
      let adSalary = 0;
      let adSalaryYear = 0;
      workers?.forEach((e) => {
        if (e.class == "Адміністративний") {
          adAmount += e.amount;
          adSalary += e.salary * e.amount;
          adSalaryYear +=
            e.salary *
            e.amount *
            (+e.dateTo?.split("-")[1] - +e.dateFrom?.split("-")[1] + 1 || 12);
        }
      });
      let vAmount = 0;
      let vSalary = 0;
      let vSalaryYear = 0;
      workers?.forEach((e) => {
        if (e.class == "Виробничий") {
          vAmount += e.amount;
          vSalary += e.salary * e.amount;
          vSalaryYear +=
            e.salary *
            e.amount *
            (+e.dateTo?.split("-")[1] - +e.dateFrom?.split("-")[1] + 1 || 12);
        }
      });
      let iAmount = 0;
      let iSalary = 0;
      let iSalaryYear = 0;
      workers?.forEach((e) => {
        if (e.class == "Інженерно технічний") {
          iAmount += e.amount;
          iSalary += e.salary * e.amount;
          iSalaryYear +=
            e.salary *
            e.amount *
            (+e.dateTo?.split("-")[1] - +e.dateFrom?.split("-")[1] + 1 || 12);
        }
      });
      sum +=
        Math.round(adSalaryYear * 0.235) +
        adSalaryYear +
        Math.round(vSalaryYear * 0.235) +
        vSalaryYear;
      +(Math.round(iSalaryYear * 0.235) + iSalaryYear);
      salaryExpensesData.push(
        {
          type: "Адміністративний",
          amount: adAmount,
          averageZP: Math.round(adSalary / adAmount),
          AnnualSalaryFund: adSalaryYear,
          tax: Math.round(adSalaryYear * 0.235),
          general: Math.round(adSalaryYear * 0.235) + adSalaryYear,
        },
        {
          type: "ІТП",
          amount: iAmount,
          averageZP: Math.round(iSalary / iAmount),
          AnnualSalaryFund: iSalaryYear,
          tax: Math.round(iSalaryYear * 0.235),
          general: Math.round(iSalaryYear * 0.235) + iSalaryYear,
        },
        {
          type: "Виробничий",
          amount: vAmount,
          averageZP: Math.round(vSalary / vAmount),
          AnnualSalaryFund: vSalaryYear,
          tax: Math.round(vSalaryYear * 0.235),
          general: Math.round(vSalaryYear * 0.235) + vSalaryYear,
        },
        { type: i }
      );
      // wageAnalysisData.push({
      //   year: "Адміністративний",
      //   amount: Math.round(adSalaryYear * 0.235) + adSalaryYear,
      // });
      // wageAnalysisData.push({
      //   year: "ІТР",
      //   amount: Math.round(iSalaryYear * 0.235) + iSalaryYear,
      // });
      wageAnalysisData.push({
        year: "Виробничий",
        amount: Math.round(vSalaryYear * 0.235) + vSalaryYear,
      });
      wageAnalysisData.push({
        bold: true,
        year: i,
        amount:
          // Math.round(adSalaryYear * 0.235) +
          // adSalaryYear +
          // Math.round(iSalaryYear * 0.235) +
          // iSalaryYear +
          Math.round(vSalaryYear * 0.235) + vSalaryYear,
      });
      const rentLand = myBusiness.lands.filter(
        (el) => +el.date.split("-")[0] == i && el.rightOfUse == "Оренда"
      );
      const ownLand = myBusiness.lands.filter(
        (el) => +el.date.split("-")[0] == i && el.rightOfUse == "Власна"
      );
      groundSectionData.push(
        ...rentLand.map((el) => ({
          paymentType: "Оренда землі",
          cadastreNumber: el.cadastreNumber,
          area: el.area,
          rate: el.rate,
          ownership: el.ownership,
        })),
        ...ownLand.map((el) => ({
          paymentType: "Земельний податок",
          cadastreNumber: el.cadastreNumber,
          area: el.area,
          rate: el.rate,
          ownership: el.ownership,
        })), //@ts-ignore
        { paymentType: i + "" }
      );
      areasUsageData.push({
        year: i,
        ...[...cultureSet].reduce((acc, el) => {
          //@ts-ignore
          acc[el] = myBusiness?.busProds
            .filter((el) => el.year == i - start)
            .reduce(
              (p, c) => (el == c.product?.culture?.name ? p + c.area : p),
              0
            );
          return acc;
        }, {}),
        area: myBusiness?.busProds
          .filter((el) => el.year == i - start)
          .reduce((p, c) => p + c.area, 0),
      });
    }
  })();

  const salaryExpensesColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "ПЕРСОНАЛ", accessorKey: "type" },
      { header: "КІЛЬКІСТЬ ПЕРСОНАЛУ", accessorKey: "amount" },
      { header: "СЕРЕДНЬО-МІСЯЧНА ЗАРОБІТНА ПЛАТА", accessorKey: "averageZP" },
      { header: "Річний фонд оплати праці", accessorKey: "AnnualSalaryFund" },
      { header: "ЄСВ 22% ВІЙСЬКОВИЙ ЗБІР 1,5%", accessorKey: "tax" },
      { header: "Загальні витрати по оплаті праці", accessorKey: "general" },
    ];
  }, []);
  const wageAnalysisColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        header: "РІК",
        accessorKey: "year",
      },
      {
        header: "РІЧНИЙ ФОНД ОПЛАТИ ПРАЦІ ВИРОБНИЧОГО ПЕРСОНАЛУ",
        columns: [
          {
            header: "ЗГІДНО ШТАТНОГО РОЗПИСУ",
            accessorKey: "amount",
          },
          {
            header: "ЗГІДНО ПОТРЕБ ТЕХНОЛОГІЇ",
          },
        ],
      },
      {
        header: "Відхилення",
        accessorKey: "",
      },
      {
        header: "ЗАПЛАНОВАНІ ЗАХОДИ",
        accessorKey: "",
      },
    ];
  }, []);
  const groundSectionColumns = useMemo<
    ColumnDef<{
      paymentType: string;
      cadastreNumber: number | null;
      area: number;
      rate: number;
      ownership: string;
    }>[]
  >(() => {
    return [
      {
        header: "ВИД ОПЛАТИ",
        accessorKey: "paymentType",
      },
      { header: "КАДАСТРОВИЙ НОМЕР", accessorKey: "cadastreNumber" },
      { header: "ПЛОЩА", accessorKey: "area" },
      { header: "СТАВКА", accessorKey: "rate" },
      {
        header: "ПЛАТА ЗА ЗЕМЛЮ",
        accessorFn: (row) => row.area * row.rate || "",
      },
      { header: "ВЛАСНІСТЬ", accessorKey: "ownership" },
    ];
  }, []);
  const areasUsageColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        header: "Рік",
        accessorKey: "year",
      },
      {
        id: "Площа під культурою",
        header: () => <Text textAlign={"center"}>Площа під культурою</Text>,
        columns: [...cultureSet].map((el) => ({ header: el, accessorKey: el })),
      },
      { header: "Загальна площа під культурами", accessorKey: "area" },
    ];
  }, []);
  return (
    <>
      <Table size={"sm"} ref={aref}>
        <Thead>
          <Tr>
            <Th colSpan={2}>
              <SectionTitle>Підприємство</SectionTitle>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={2}>
              <Paragraph>
                3.1. Підприємство і його стан на момент створення бізнес-плану.
              </Paragraph>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Назва підприємства</Td>
            <Td>{name}</Td>
          </Tr>
          <Tr>
            <Td>Статус (стан)</Td>
            <Td>Новостворене (незареєстроване)</Td>
          </Tr>
          <Tr>
            <Td>Юридична адреса</Td>
            <Td>Україна</Td>
          </Tr>
          <Tr>
            <Td>
              Організаційно-правова
              <br /> форма
            </Td>
            <Td>{form}</Td>
          </Tr>
          <Tr>
            <Td>Група оподаткування</Td>
            <Td>{taxGroup}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th colSpan={2}>
              <TableName>Опис суб'єкта підприємницької діяльності</TableName>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Суб’єкт підприємницької діяльності</Td>
            <Td>{form}</Td>
          </Tr>
          <Tr>
            <Td rowSpan={5}>Переваги зареєстрованого СПД (ФГ)</Td>
            <Td>спрощена система обліку та звітності;</Td>
          </Tr>
          <Tr>
            <Td>державна підтримка</Td>
          </Tr>
          <Tr>
            <Td>відсутність обмежень по видам діяльності;</Td>
          </Tr>
          <Tr>
            <Td>можливість наймати працівників;</Td>
          </Tr>
          <Tr>
            <Td>
              можливість працювати із закордонними замовниками (здійснювати
              зовнішньоекономічну діяльність).
            </Td>
          </Tr>
          <Tr>
            <Td>Мета діяльності</Td>
            <Td>
              одержання прибутку шляхом задоволення суспільних потреб у сфері
              виробництва якісних та корисних ягід
            </Td>
          </Tr>
          <Tr>
            <Td rowSpan={3}>Цілі діяльності:</Td>
            <Td>задоволення потреб споживачів у якісних та корисних ягід</Td>
          </Tr>
          <Tr>
            <Td>забезпечення високоефективної діяльності;</Td>
          </Tr>
          <Tr>
            <Td>подальший розвиток та розширення діяльності.</Td>
          </Tr>
          <Tr>
            <Td>Основні види діяльності за КВЕД</Td>
            <Td>
              01.25 Вирощування ягід, горіхів, інших плодових дерев і чагарників
            </Td>
          </Tr>
          <Tr>
            <Td rowSpan={3}>Податки</Td>
            <Td>
              Роботодавець зобов&#39;язується сплачувати Єдиний соціальний
              внесок на загальнообов&#39;язкове державне соціальне страхування
              (ЄСВ) та військовий збір (ВЗ) за співробітників.
            </Td>
          </Tr>
          <Tr>
            <Td>Ставка ЄСВ становить 22% від заробітної плати</Td>
          </Tr>
          <Tr>
            <Td>Ставка ВЗ становить 1,5% від заробітної плати</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>Необхідні умови для початку діяльності:</Td>
            <Td>
              Наявність земельної ділянки площею{" "}
              {
                +(
                  myBusiness.lands.reduce((p, c) => p + c.area, 0) /
                  (myBusiness.realizationTime + 1)
                ).toFixed(3)
              }{" "}
              га
            </Td>
          </Tr>
          <Tr>
            <Td>Реєстрація суб’єкта підприємницької діяльності</Td>
          </Tr>
        </Tbody>
      </Table>
      <Paragraph>
        3.2. Власники, керуючий персонал, працівники підприємства.
      </Paragraph>
      <Table size="sm" mt={3}>
        <Thead>
          <Tr>
            <Td rowSpan={2}>Засновники</Td>
            <Td>П.І.Б</Td>
            <Td>%</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>Керіник</Td> <Td>П.І.Б</Td>
            <Td>Освіта</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td></Td>
          </Tr>
        </Thead>
      </Table>
      <Description>
        Загальна кількість персоналу, яка залучається для забезпечення роботи
        підприємства, планується у штатному розписі. Загальний прогнозний фонд
        оплати праці, при повноцінній роботі підприємства за проектом складе{" "}
        {myBusiness?.workers.reduce(
          (p, c) =>
            p +
            (c.salary * 0.015 + c.salary * 0.22 + c.salary) *
              (+c.dateTo?.split("-")[1] - +c.dateFrom?.split("-")[1] + 1 ||
                12) *
              c.amount,
          0
        )}{" "}
        грн. Детальні розрахунки зведено у вигляді таблиці.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Витрати на оплату праці</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent
          data={salaryExpensesData}
          columns={salaryExpensesColumns}
        />
        <Tfoot>
          <Tr fontWeight={"bold"} key={0}>
            <Td colSpan={5}>Річний оплати праці з нарахуваннями</Td>
            <Td>{sum}</Td>
          </Tr>
        </Tfoot>
      </Table>
      <Description>
        Оплату праці виробничого персоналу плануємо при розрахунках
        технологічної карти згідно потреб технології і порівнюємо з штатним
        розписом згідно з відпрацьованим робочим часом
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>
                Аналіз фонду оплати праці виробничого персоналу
              </TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={wageAnalysisData} columns={wageAnalysisColumns} />
      </Table>
      <Paragraph>3.3. Земельні ділянки та структура насаджень</Paragraph>
      <Description>
        {`Проект буде здійснюватися на земельній ділянці площею 
    ${+(
      myBusiness.lands.reduce((p, c) => p + c.area, 0) /
      (myBusiness.realizationTime + 1)
    ).toFixed(
      3
    )} га, з правом використання на весь період реалізації. Вартість користування земельними ділянками розраїовуємо в вигляді таблиці.`}
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Земельні ділянки</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={groundSectionData} columns={groundSectionColumns} />
      </Table>
      <Description>
        Використання площ під культурами описано у табличному вигляді.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={[...cultureSet].length + 2}>
              <TableName>Структура насаджень</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={[...cultureSet].length + 2}>
              <TableNumber />
            </Th>
          </Tr>
        </Thead>
        <TableContent data={areasUsageData} columns={areasUsageColumns} />
      </Table>
    </>
  );
}

export default EnterpriseBusinessPlan;
