import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { EnterpriseFormType } from "src/shared/hook/useEnterpriseForm";
import { EnterpriseTaxGroupType } from "src/shared/hook/useEnterpriseTaxGroup";
import Description from "../../ui/Description";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { LandPlatTableHead } from "../LandPlotTable/LandPlatTable";
import { Iworker } from "../../../../tRPC serv/models/models";
import { resBusinessPlan } from "../../../../tRPC serv/controllers/BusinessService";

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
          <Tr>
            <Th>Персонал</Th>
            <Th>Кількість персоналу</Th>
            <Th>
              Середньо-місячна
              <br /> заробітна <br /> плата
            </Th>
            <Th>
              Річний фонд <br /> оплати праці
            </Th>
            <Th>
              ЄСВ 22% <br />
              Військовий <br />
              збір 1,5%
            </Th>
            <Th>
              Загальні <br /> витрати по <br /> оплаті праці
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            let sum = 0;
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
              res.push(
                <>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  <Tr>
                    <Td>Адмін</Td>
                    <Td>{adAmount}</Td>
                    <Td>{Math.round(adSalary / adAmount)}</Td>
                    <Td>{adSalary * 12}</Td>
                    <Td>{Math.round(adSalary * 12 * 0.235)}</Td>
                    <Td>{Math.round(adSalary * 12 * 0.235) + adSalary * 12}</Td>
                  </Tr>
                  <Tr>
                    <Td>Вироб</Td>
                    <Td>{vAmount}</Td>
                    <Td>{Math.round(vSalary / vAmount)}</Td>
                    <Td>{vSalary * 12}</Td>
                    <Td>{Math.round(vSalary * 12 * 0.235)}</Td>
                    <Td>{Math.round(vSalary * 12 * 0.235) + vSalary * 12}</Td>
                  </Tr>
                </>
              );
            }
            res.push(
              <Tr fontWeight={"bold"}>
                <Td colSpan={5}>Річний оплати праці з нарахуваннями</Td>
                <Td>{sum}</Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
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
          <Tr>
            <Th rowSpan={2}>Рік</Th>
            <Th colSpan={2}>Річний фонд оплати праці виробничого персоналу</Th>
            <Th rowSpan={2}>Характеристика</Th>
            <Th rowSpan={2}>Заплановані заходи</Th>
          </Tr>
          <Tr>
            <Th>Згідно штатного розпису</Th>
            <Th>Згідно потреб технології</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              let vSalary = 0;
              thisWorkers.forEach((e) => {
                if (e.class == "Виробничий") {
                  vSalary += e.salary * e.amount;
                }
              }, 0);
              res.push(
                <>
                  <Tr>
                    <Td>{i}</Td>
                    <Td>{Math.round(vSalary * 12 * 0.235) + vSalary * 12}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                </>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      <Paragraph>3.3. Земельні ділянки та структура насаджень</Paragraph>
      <Description>
        {`Проект буде здійснюватися на земельній ділянці загальною площею 
    ${" " + myBusiness?.busCuls.reduce((p, c) => p + c.area, 0)}га, з правом
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
          <LandPlatTableHead isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              res.push(
                <>
                  <Tr>
                    <Td>{i}</Td>
                  </Tr>
                  <Tr>
                    <Td>Оренда Землі</Td>
                  </Tr>
                  <Tr>
                    <Td>Податок</Td>
                  </Tr>
                </>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      <Description>
        Використання площ під культурою описано у табличному вигляді.
      </Description>
      <Table size={"sm"}>
        <Thead>
          {(() => {
            const res = [];
            for (let i = start; i < end; i++) {
              res.push(
                <>
                  <Tr>
                    <Td>{i}</Td>
                    {[...cultureSet].map((el) => (
                      <Td>
                        {myBusiness?.busCuls.reduce(
                          (p, c) => (el == c.culture?.name ? p + c.area : p),
                          0
                        )}
                      </Td>
                    ))}
                    <Td>
                      {myBusiness?.busCuls.reduce((p, c) => p + c.area, 0)}
                    </Td>
                  </Tr>
                </>
              );
            }
            return (
              <>
                <Tr>
                  <Th colSpan={cultureSet.size + 2}>
                    <TableName>Планова структура насаджень</TableName>
                  </Th>
                </Tr>
                <Tr>
                  <Th colSpan={cultureSet.size + 2}>
                    <TableNumber></TableNumber>
                  </Th>
                </Tr>
                <Tr>
                  <Th rowSpan={2}>Вегетація</Th>
                  <Th colSpan={cultureSet.size}>
                    <Text textAlign={"center"}>Площа під культурою</Text>
                  </Th>
                  <Th rowSpan={2}>Загальна площа</Th>
                </Tr>
                <Tr>
                  {[...cultureSet].map((el) => (
                    <Th>{el}</Th>
                  ))}
                </Tr>
                {res}
              </>
            );
          })()}
        </Thead>
      </Table>
    </>
  );
}

export default EnterpriseBusinessPlan;
