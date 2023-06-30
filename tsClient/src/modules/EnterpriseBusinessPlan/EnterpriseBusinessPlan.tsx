import { Table, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React, { RefObject, useMemo } from "react";
import { EnterpriseFormType } from "src/shared/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "src/shared/hook/useEnterpriseTaxGroup";
import Description from "../../ui/Description";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { Iworker } from "../../../../tRPC serv/models/models";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";
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
  myBusiness,
  start,
  aref,
}: {
  name: string;
  form: EnterpriseFormType;
  taxGroup: EnterpriseTaxGroupType;
  cultureSet: Set<string>;
  thisWorkers: Iworker[];
  myBusiness: resBusinessPlan;
  start: number;
  end: number;
  aref: RefObject<HTMLTableElement>;
}) {
  let sum = 0;
  const salaryExpensesData = [];
  const wageAnalysisData = [];
  const groundSectionData = [];
  const areasUsageData = [];
  (() => {
    thisWorkers = thisWorkers.map((el) => {
      if (el.class == "Виробничий")
        return {
          ...el,
          amount: Math.ceil(
            el.amount *
              //@ts-ignore
              myBusiness?.busCuls?.reduce((p, c) => p + c.area, 0)
          ),
        };
      else return el;
    });

    for (let i = start; i < end; i++) {
      let adAmount = 0;
      let adSalary = 0;
      thisWorkers.forEach((e) => {
        if (e.class == "Адміністративний") {
          adAmount += e.amount;
          adSalary += e.salary * e.amount;
        }
      });
      let vAmount = 0;
      let vSalary = 0;
      thisWorkers.forEach((e) => {
        if (e.class == "Виробничий") {
          vAmount += e.amount;
          vSalary += e.salary * e.amount;
        }
      });
      sum +=
        Math.round(adSalary * 12 * 0.235) +
        adSalary * 12 +
        (Math.round(vSalary * 12 * 0.235) + vSalary * 12);
      salaryExpensesData.push(
        { type: i },
        {
          type: "Адмін",
          amount: adAmount,
          averageZP: Math.round(adSalary / adAmount),
          AnnualSalaryFund: adSalary * 12,
          tax: Math.round(adSalary * 12 * 0.235),
          general: Math.round(adSalary * 12 * 0.235) + adSalary * 12,
        },
        {
          type: "Вироб",
          amount: vAmount,
          averageZP: Math.round(vSalary / vAmount),
          AnnualSalaryFund: vSalary * 12,
          tax: Math.round(vSalary * 12 * 0.235),
          general: Math.round(vSalary * 12 * 0.235) + vSalary * 12,
        }
      );
      wageAnalysisData.push({
        year: i,
        amount: Math.round(vSalary * 12 * 0.235) + vSalary * 12,
      });
      groundSectionData.push(
        { paymentType: i },
        { paymentType: "Оренда Землі" },
        { paymentType: "Податок" }
      );
      areasUsageData.push({
        year: i,
        ...[...cultureSet].reduce((acc, el) => {
          //@ts-ignore
          acc[el] = myBusiness?.busCuls.reduce(
            (p, c) => (el == c.culture?.name ? p + c.area : p),
            0
          );
          return acc;
        }, {}),
        area: myBusiness?.busCuls.reduce((p, c) => p + c.area, 0),
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
        header: "ХАРАКТЕРИСТИКА",
        accessorKey: "",
      },
      {
        header: "ЗАПЛАНОВАНІ ЗАХОДИ",
        accessorKey: "",
      },
    ];
  }, []);
  const groundSectionColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        header: "ВИД ОПЛАТИ",
        accessorKey: "paymentType",
      },
      { header: "КАДАСТРОВИЙ НОМЕР" },
      { header: "ПЛОЩА" },
      { header: "СТАВКА" },
      { header: "ПЛАТА ЗА ЗЕМЛЮ" },
      { header: "ВЛАСНІСТЬ" },
    ];
  }, []);
  const areasUsageColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      {
        header: "Вегетація",
        accessorKey: "year",
      },
      {
        id: "Площа під культурою",
        header: () => <Text textAlign={"center"}>Площа під культурою</Text>,
        columns: [...cultureSet].map((el) => ({ header: el, accessorKey: el })),
      },
      { header: "Загальна площа", accessorKey: "area" },
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
            <Td>{}</Td>
          </Tr>
          <Tr>
            <Td>Юридична адреса</Td>
            <Td></Td>
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
            <Td rowSpan={5}>Переваги …… СФГ ФОП з 2 членами сім’ї</Td>
            <Td>
              спрощена система обліку та звітності порівняно із юридичною
              особою;
            </Td>
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
            <Td>Основні види діяльності за КВЕД-2010</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td rowSpan={3}>Податки</Td>
            <Td>
              ФОП, як роботодавець, зобов&#39;язується сплачувати Єдиний
              соціальний внесок на загальнообов&#39;язкове державне соціальне
              страхування (ЄСВ) та військовий збір (ВЗ) за співробітників.
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
            <Td>Наявність земельної ділянки площею ..... призначенням...</Td>
          </Tr>
          <Tr>
            <Td>Реєстрація суб’єкта підприємницької діяльності</Td>
          </Tr>
        </Tbody>
      </Table>
      <Paragraph>
        3.2. Власники, керуючий персонал, працівники підприємства.
      </Paragraph>
      <Description>
        Для функціонування підприємства планується створити сімейне фермерське
        господарство у вигляді ФОП з 2 членами сім’ї та найняти …. працівників,
        з них …. На постійній основі, а …. Сезонно. Детальні розрахунки зведено
        у вигляді таблиці.
      </Description>
      <Description>
        Загальна кількість персоналу, який планується залучити для забезпечення
        роботи підприємства, становить … осіб, з яких… співробітників –
        постійний адміністративний персонал, що працюватиме з … року Проекту, …
        постійних працівників із … року, … співробітників (оператори лінії)
        працюватимуть на постійній основі із …-го року і … сезонних робітників,
        що працюватимуть з квітня по серпень. Загальний прогнозний фонд оплати
        праці, при повноцінній роботі підприємства, на місяць за проектом складе
        $... .
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
        {`Проект буде здійснюватися на земельній ділянці загальною площею 
    ${myBusiness?.busCuls.reduce((p, c) => p + c.area, 0)}га, з правом
    використання на весь період реалізації.`}
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
        Використання площ під культурою описано у табличному вигляді.
      </Description>
      <TableComponent data={areasUsageData} columns={areasUsageColumns} />
    </>
  );
}

export default EnterpriseBusinessPlan;
