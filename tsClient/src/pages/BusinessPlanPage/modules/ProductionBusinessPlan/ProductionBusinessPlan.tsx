import { Table, Tbody, Td, Th, Thead, Tr, Text, Box } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import React, { RefObject, useContext, useMemo } from "react";
import TableContent from "src/components/TableComponent/TableContent";
import { Context } from "src/main";
import { getMonthAmountFromBusinessPlan } from "src/pages/BusinessPlanPage/BusinessPlanPage";
import TEJustificationContent from "src/pages/TEJustification/TEJustificationContent";
import getYearFromString from "src/shared/funcs/getYearFromString";
import useVegetationYears from "src/shared/hook/useVegetationYears";
import Description from "src/ui/Description";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";
import Paragraph from "src/ui/Paragraph";
import SectionTitle from "src/ui/SectionTitle";
import TableName from "src/ui/TableName";
import TableNumber from "src/ui/TableNumber";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import { CartsTableHeadRow } from "src/modules/CartsTable";
import { PlanIncomeProductionTableHeadRow } from "../../../../modules/PlanIncomeProductionTable/PlanIncomeProductionTable";
import { SaleTableHeadRows } from "../../../../modules/SaleTable/SaleTable";
import getMonthsFromBusiness from "src/shared/funcs/getMonthsFromBusiness";
import getMonthFromString from "src/shared/funcs/getMonthFromString";

const characteristicsCulture = {
  "Ягода суниці": (
    <Box mt={2}>
      <Text fontWeight={"bold"}>Характеристики ягід суниці садової:</Text>
      <br />
      Сорти: Існує багато різних сортів садової суниці з різними кольорами
      (червоні, рожеві, білі тощо), розмірами та смаковими властивостями.
      <br /> Смак і аромат: Садова суниця зазвичай має солодкий смак з легкою
      кислинкою, що робить її дуже апетитною. Її аромат може бути інтенсивним та
      приємним.
      <br />
      Використання: Садова суниця використовується як свіжа закуска, а також для
      приготування десертів, випічки, джемів, соусів, морозива, йогуртів та
      інших страв.
      <br /> Поживність: Як і в інших видів суниці, садова суниця містить
      вітаміни, антиоксиданти та дієтичні волокна, які корисні для здоров'я.
      <br /> Сезон та збір: В садової суниці також є сезон дозрівання, який
      зазвичай припадає на весну та літо, залежно від сорту та кліматичних умов.
      Ягоди краще збирати, коли вони повністю дозріли і мають яскравий колір.{" "}
      <br />
      Садіння і догляд: Вирощування садової суниці вимагає плодючої грунту,
      правильного поливу та догляду за рослинами, включаючи обрізку, підживлення
      та боротьбу з шкідниками.
      <br />
      Багаторічність: Садова суниця є багаторічною рослиною, тобто вона
      повертається кожен рік з новим врожаєм, якщо дотримуватися відповідного
      догляду.
      <br /> Садова суниця - це важлива культурна рослина, яка приносить
      задоволення в садах та на городах завдяки своїм смачним та корисним
      плодам. Її різноманітність сортів дозволяє обирати ті, що найбільше
      відповідають смаковим уподобанням та вимогам садівництва
    </Box>
  ),
  "Ягода малини": (
    <Box mt={2}>
      <Text fontWeight={"bold"}>Xарактеристики ягід малини:</Text>
      <br />
      Сорти: Ягоди малини представлені різноманітними сортами з різними
      відтінками червоного, чорного, жовтого та фіолетового кольору, кожен з
      яких має свої унікальні характеристики.
      <br /> Смак і аромат: Малина має солодко-кислий смак, із характерною
      приємною кислинкою, що робить її особливо смачною. Аромат малини зазвичай
      насичений і легкий.
      <br />
      Використання: Ягоди малини можна споживати в свіжому вигляді, додавати до
      салатів, виготовляти джеми, консервувати, випікати випічку, готувати соуси
      та десерти. Також малину використовують для приготування соків, чаїв та
      інших напоїв.
      <br /> Поживність: Малина багата на вітаміни (особливо вітамін C),
      мінерали та антиоксиданти. Вона також містить дієтичні волокна, корисні
      для підтримання печінки та шлунково-кишкового тракту.
      <br /> Сезон та збір: Малина дозріває влітку, зазвичай з червня по
      серпень, в залежності від сорту та регіону. Ягоди краще збирати, коли вони
      легко відділяються від стебла та мають яскравий колір.
      <br />
      Садіння і догляд: Вирощування малини вимагає сонячного місця, гарного
      дренажу грунту, регулярного поливу та догляду за рослинами. Обрізка
      пагонів та підв'язування допомагають підтримувати здорові та плодоносні
      кущі.
      <br />
      Багаторічність: Малина також є багаторічною рослиною, яка може приносити
      врожай протягом декількох років при належному догляді.
      <br /> Малина є популярною ягодою завдяки своєму смаку, аромату та
      корисним властивостям. Різноманітність сортів дозволяє знаходити
      оптимальний варіант для кожного використання, будь то споживання у свіжому
      вигляді або виготовлення страв та напоїв.
    </Box>
  ),
  "Ягода лохини": (
    <Box mt={2}>
      <Text fontWeight={"bold"}>Характеристики ягід лохини:</Text>
      <br />
      Сорти: Лохина відома різноманітністю сортів, які можуть мати відтінки від
      червоного до чорного кольору, в залежності від сорту. Кожен сорт має свої
      унікальні характеристики та смакові особливості.
      <br /> Смак і аромат: Ягоди лохини мають солодко-кислий смак, що робить їх
      популярними для використання в стравах та десертах. Аромат лохини може
      бути легким та приємним.
      <br />
      Використання: Лохину можна споживати як свіжу закуску, використовувати для
      приготування джемів, желе, випічки, соусів, сирників та інших страв. З неї
      також роблять вино та наливки.
      <br />
      Поживність: Лохина багата на вітаміни (особливо вітамін C та вітаміни
      групи B), мінерали та антиоксиданти. Ці ягоди також містять дієтичні
      волокна, які корисні для травлення та здоров'я шлунково-кишкового тракту.
      <br />
      Сезон та збір: Лохина дозріває зазвичай влітку, з липня по серпень. Ягоди
      краще збирати, коли вони легко відділяються від куща та мають насичений
      колір.
      <br />
      Садіння і догляд: Вирощування лохини потребує сонячного місця, доброго
      дренажу грунту та регулярного поливу. Підтримання форми куща через обрізку
      допомагає забезпечити більший врожай та легший доступ до ягід.
      <br />
      Багаторічність: Лохина також є багаторічною рослиною, яка може радувати
      вас врожаєм протягом декількох років при належному догляді.
      <br /> Лохина - це чудова ягода з солодко-кислим смаком та багатим
      харчовим профілем. Вона підходить як для споживання у свіжому вигляді, так
      і для використання у кулінарії та приготуванні напоїв. Різноманітність
      сортів лохини дає можливість вибирати оптимальний варіант для різних
      гастрономічних потреб.
    </Box>
  ),
};

function ProductionBusinessPlan({
  start,
  end,
  myBusiness,
  aref,
}: {
  start: number;
  end: number;
  myBusiness: resBusinessPlan;
  aref: RefObject<HTMLTableElement>;
}) {
  const { income, map, TEJ } = useContext(Context);
  let costHand = 0;
  let costMech = 0;
  let costMechTot = 0;

  // const laborСostsData = (() => {
  //   const res: {
  //     workType: string;
  //     operation: string;
  //     amount: number | string;
  //     averagePrice: number | string;
  //     sum: number | string;
  //     bold?: boolean;
  //   }[] = [
  //     {
  //       workType: "Муханізовані роботи",
  //       operation: "",
  //       amount: "Люд/год",
  //       averagePrice: "Грн/год",
  //       sum: "",
  //       bold: true,
  //     },
  //   ];

  //   thisMaps.map((e) => {
  //     let myJustification = TEJ.justification?.find((el) => {
  //       return el.techCartId! == +e.id!;
  //     });

  //     return map.opers
  //       .filter((el) => el.techCartId == e.id)
  //       .map((el) => {
  //         const totalCost = el.costMachineWork! * myJustification?.area!;

  //         const peopleHour =
  //           Math.round(
  //             (totalCost /
  //               ((e?.salary! / 176) *
  //                 map.grade.find(
  //                   (e) => e?.id! == el?.aggregate?.tractor.gradeId
  //                 )?.coefficient!)) *
  //               100
  //           ) / 100;

  //         const costMech = Math.round(((totalCost / peopleHour) * 100) / 100);
  //         if (el.cell == "costMechanical")
  //           res.push({
  //             workType: "",
  //             operation: el.nameOperation,
  //             amount: peopleHour,
  //             averagePrice: costMech,
  //             sum: totalCost,
  //             bold: true,
  //           });
  //       });
  //   });
  //   res.push({
  //     workType: "Ручні роботи",
  //     operation: "",
  //     amount: "Люд/год",
  //     averagePrice: "Грн/год",
  //     sum: "",
  //     bold: true,
  //   });
  //   thisMaps.map((e) => {
  //     let myJustification: resTechnologicalEconomicJustification | undefined =
  //       TEJ.justification?.find((el) => {
  //         return el.techCartId! == +e.id!;
  //       });
  //     return map.opers
  //       .filter((el) => el.techCartId == e.id)
  //       .map((el) => {
  //         const totalCost = el.costHandWork! * myJustification?.area!;
  //         const peopleHour =
  //           Math.round(
  //             (totalCost /
  //               ((e?.salary! / 176) *
  //                 map.grade.find(
  //                   (e) =>
  //                     e.id! == el.cost_hand_work?.gradeId! ||
  //                     el.aggregate?.agricultural_machine.gradeId
  //                 )?.coefficient!)) *
  //               100
  //           ) / 100;
  //         const costHand = Math.round(((totalCost / peopleHour) * 100) / 100);
  //         if (
  //           el.cell == "costHandWork" ||
  //           (el.cell == "costMechanical" && el.costHandWork)
  //         )
  //           res.push({
  //             workType: "",
  //             operation: el.nameOperation,
  //             amount: peopleHour,
  //             averagePrice: costHand,
  //             sum: totalCost,
  //           });
  //       });
  //   });
  //   res.push({
  //     workType: "Всього по оплаті праці",
  //     amount: "",
  //     averagePrice: "",
  //     operation: "",
  //     sum: 0,
  //     bold: true,
  //   });
  //   return res;
  // })();
  const plannedStructureData = [];
  const generalData = [];
  for (let i = start; i <= end; i++) {
    const busProds = myBusiness?.busProds?.filter((el) => el.year == i - start);
    const lands = myBusiness?.lands?.filter((el) => el.year == i - start);

    generalData.push(
      ...busProds.map((el) => ({
        year: i,
        culture: el.product?.culture?.name,
        name,
        technology: el.cultivationTechnology?.name,
        area: el.area,
      }))
    );
    const area = busProds.reduce((p, c) => p + c.area, 0);
    const totalArea = lands.reduce((p, c) => p + c.area, 0);
    generalData.push({
      year: i,
      bold: true,
      culture: "Разом:",
      area: area,
      totalArea: totalArea,
      coefficient: totalArea ? (area / totalArea).toFixed(2) : 0,
    });
    plannedStructureData.push(
      ...busProds.map((el) => {
        const vegetationYear = el.vegetationYear;
        return {
          year: i,
          culture: el.product?.culture?.name,
          product: el.product?.name,
          density: vegetationYear?.numberPlantsPerHectare,
          yieldHectare: (
            (vegetationYear?.potentialYieldPerHectare || 0) *
            (vegetationYear?.allCoeff || 0)
          ).toFixed(2),
          yield: (
            (vegetationYear?.potentialYieldPerHectare || 0) *
            (vegetationYear?.allCoeff || 0) *
            el.area
          ).toFixed(2),
        };
      })
    );
    // plannedStructureData.push({
    //   year: i,

    //   ...myBusiness?.busProds.reduce((p, el) => {
    //     const vegetationYear = income.vegetationYear?.find(
    //       (e) => e.techCartId == el.techCartId
    //     );
    //     //@ts-ignore
    //     // p[el.culture?.name! + el.cultivationTechnology.name! + "coef"] =
    //     //   vegetation?.allCoeff || 0;
    //     // //@ts-ignore
    //     // p[el.culture?.name! + el.cultivationTechnology.name! + "yield"] =
    //     //   Math.round(
    //     //     myYield?.yieldPerHectare! * (vegetation?.allCoeff || 0) * 100
    //     //   ) / 100;
    //     return p;
    //   }, {}),
    // });
  }
  const generalColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "КУЛЬТУРИ", accessorKey: "culture" },
      { header: "ТЕХНОЛОГІЇ", accessorKey: "technology" },
      { header: "Площа під культурами", accessorKey: "area" },
      { header: "Загальна площа", accessorKey: "totalArea" },
      { header: "Коефіцієнт", accessorKey: "coefficient" },
    ];
  }, []);
  const plannedStructureColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Рік", accessorKey: "year" },
      { header: "Культура", accessorKey: "culture" },
      { header: "Продукт", accessorKey: "product" },
      { header: "Густота", accessorKey: "density" },
      { header: "Уражйність (1 га)", accessorKey: "yieldHectare" },
      { header: "Планова урожайність", accessorKey: "yield" },
    ];
  }, []);
  const laborСostsColumns = useMemo<ColumnDef<any>[]>(() => {
    return [
      { header: "Види робіт", accessorKey: "workType" },
      { header: "Операція", accessorKey: "operation" },
      { header: "Кількість", accessorKey: "amount" },
      { header: "Середня ціна", accessorKey: "averagePrice" },
      { header: "Сума", accessorKey: "sum" },
    ];
  }, []);
  return (
    <>
      <SectionTitle aref={aref}>Виробництво</SectionTitle>
      <Paragraph>
        4.1. Загальна інформація про виробництво та технології.
      </Paragraph>
      <Description>
        Вирощування суниці в закритому ґрунті на субстраті (наприклад, у
        теплицях або тунелях) є популярним методом, який дозволяє забезпечити
        оптимальні умови для росту та врожайності рослин.
        <br />
        Використовуються спеціальні субстрати для садіння суниці в контейнерах
        або грядках. Це може бути суміш деревного волокна, кокосового волокна,
        торфу та інших компонентів, які забезпечують водопровідність,
        повітропроникність та хорошу структуру ґрунту.
        <br />
        Вирощування суниці на субстраті в закритому ґрунті вимагає деяких
        особливостей догляду порівняно з вирощуванням на відкритому ґрунті, але
        це може дозволити отримати ранній та стабільний врожай навіть у
        некорисні періоди.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Загальні дані про культури та технології</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent data={generalData} columns={generalColumns} />
      </Table>
      <Description>
        Урожайність розрахована з врахуванням якості посадкового матеріалу та
        запланованої технології.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={1 + myBusiness?.busProds.length! * 2}>
              <TableName>Планова структура урожайності</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={1 + myBusiness?.busProds.length! * 2}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
        </Thead>
        <TableContent
          data={plannedStructureData}
          columns={plannedStructureColumns}
        />
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={2}>
              <TableName>Ключові особливості технології</TableName>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Строки створення насаджень</Td>
            <Td>
              Кращими строками закладки саду є: осінь (жовтень – листопад) весна
              (квітень-травень)
            </Td>
          </Tr>
          {/* <Tr>
            <Td>Підготовка ділянки</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Зрошення</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Висаджування саджанців</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Підживлення</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Догляд за саджанцями</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Моніторинг</Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Боротьба з хворобами і шкідниками</Td>
            <Td></Td>
          </Tr> */}
          <Tr>
            <Td>Збір</Td>
            <Td>Ручний</Td>
          </Tr>
          <Tr>
            <Td>Зберігання</Td>
            <Td>
              На території саду необхідно облаштувати складське та виробниче
              приміщення, де буде відбуватися охолодження, зберігання,
              сортування та пакування продукції.
            </Td>
          </Tr>
          <Tr>
            <Td>Персонал</Td>
            <Td>
              Пердбачено кімнату персоналу, що буде доглядати за садом та
              охоронців.
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={5}>
              <TableName>Технологічні карти</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={5}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <CartsTableHeadRow role={"authenticated"} isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const busProds = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                ...busProds.map((el) => (
                  <Tr>
                    <Td>{i}</Td>
                    <Td>{el.tech_cart?.nameCart}</Td>
                    <Td>{el.area}</Td>
                    <Td>
                      {+((el.tech_cart?.costHectare || 0) * el.area).toFixed(2)}
                    </Td>
                    <Td>{el.tech_cart?.costHectare}</Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr fontWeight={"bold"} key={i}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{busProds.reduce((p, c) => p + c.area, 0)}</Td>
                  <Td>
                    {busProds.reduce(
                      (p, c) =>
                        p +
                        +((c.tech_cart?.costHectare || 0) * c.area).toFixed(2),
                      0
                    )}
                  </Td>
                  <Td>
                    {busProds.reduce(
                      (p, c) => p + (c.tech_cart?.costHectare || 0),
                      0
                    )}
                  </Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td></Td>
                <Td>
                  {myBusiness.busProds.reduce(
                    (p, c) =>
                      p +
                      +((c.tech_cart?.costHectare || 0) * c.area).toFixed(2),
                    0
                  )}
                </Td>
                <Td></Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Paragraph>4.2.Основні засоби, ресурси та біологічні активи</Paragraph>
      <Description>
        Основні засоби, що використовуються під час операційної діяльності
        підприємства втрачають свою вартість через фізичний знос і моральне
        старіння. Знос (або амортизація) є однією зі складових собівартості
        товарів, але не є причиною відтоку реальних грошей. Найбільшого
        поширення набув механізм лінійної амортизації, коли річна норма
        амортизації встановлюється виходячи з терміну служби обладнання.
        Первісна вартість основних засобів - це вартість, за якою засіб було
        придбано чи оприбутковано на баланс підприємства. Балансова вартість або
        залишкова вартість = Первісна вартість - нарахований знос. Амортизаційні
        відрахування в розрахунках прийняті відповідно нормативним значенням. В
        основу розрахунку покладена вартість комплексу технічних приміщень та
        огорожі.В якості базового методу розрахунку амортизації було обрано
        лінійний метод. При розрахунку амортизації були використані положення
        Податкового кодексу України.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Техніка та обладнання</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва основного засобу</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const machines = myBusiness?.buying_machines?.filter(
                (el) => el.year == i - start
              );
              if (machines) {
                res.push(
                  machines.map((el) => (
                    <Tr key={el.id!}>
                      <Td>{i}</Td>
                      <Td>{el.name}</Td>
                      <Td>{el.amount}</Td>
                      <Td>{el.amount * el.price}</Td>
                      <Td>{el.amortization?.depreciationPerMonth}</Td>
                      <Td>{el.amortization?.introductionDate}</Td>
                    </Tr>
                  ))
                );
              }
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{machines.reduce((p, c) => p + c.amount, 0)}</Td>
                  <Td>
                    {machines.reduce((p, c) => p + c.amount * c.price, 0)}
                  </Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>
                  {myBusiness.buying_machines.reduce((p, c) => p + c.amount, 0)}
                </Td>
                <Td>
                  {myBusiness.buying_machines.reduce(
                    (p, c) => p + c.amount * c.price,
                    0
                  )}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Description>
        В якості базового методу розрахунку амортизації основиних засобів було
        обрано лінійний метод. При розрахунку амортизації були використані
        положення Податкового кодексу України.
      </Description>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Будівлі та споруди</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва біологічного активу</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const buildings = myBusiness?.buildings?.filter(
                (el) => el.year == i - start
              );
              res.push(
                buildings.map((el) => (
                  <Tr key={el.id!}>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>1</Td>
                    <Td>{el.startPrice}</Td>
                    <Td>{el.amortization?.depreciationPerMonth}</Td>
                    <Td>{el.amortization?.introductionDate}</Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{buildings.length}</Td>
                  <Td>{buildings.reduce((p, c) => p + +c.startPrice, 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>{myBusiness?.buildings?.length}</Td>
                <Td>
                  {myBusiness?.buildings?.reduce(
                    (p, c) => p + +c.startPrice,
                    0
                  )}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <TableName>Малоцінні і швидко зношувальні предмети</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва МШП</Th>
            <Th>Кількість</Th>
            <Th>Первісна вартість</Th>
            <Th>Амортизація (місяць)</Th>
            <Th>Початок амортизації</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const MSHP = myBusiness?.MSHP?.filter(
                (el) => el.year == i - start
              );

              res.push(
                MSHP.map((el) => (
                  <Tr key={el.id!}>
                    <Td>{i}</Td>
                    <Td>{el.name}</Td>
                    <Td>{el.amount}</Td>
                    <Td>{el.amount * el.price}</Td>
                    <Td>{el.amortization?.depreciationPerMonth}</Td>
                    <Td>{el.amortization?.introductionDate}</Td>
                  </Tr>
                ))
              );

              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td>{MSHP.reduce((p, c) => p + c.amount, 0)}</Td>
                  <Td>{MSHP.reduce((p, c) => p + c.amount * c.price, 0)}</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1} fontWeight={"bold"}>
                <Td></Td>
                <Td>ВСЕ РАЗОМ:</Td>
                <Td>{myBusiness?.MSHP?.reduce((p, c) => p + c.amount, 0)}</Td>
                <Td>
                  {myBusiness?.MSHP?.reduce(
                    (p, c) => p + c.amount * c.price,
                    0
                  )}
                </Td>
              </Tr>
            );
            return res;
          })()}
        </Tbody>
      </Table>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th
              colSpan={
                (myBusiness?.realizationTime! <= 7
                  ? myBusiness?.realizationTime!
                  : 6) + 2
              }
            >
              <TableName>{`План амортизації проекту`}</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th
              colSpan={
                (myBusiness?.realizationTime! <= 7
                  ? myBusiness?.realizationTime!
                  : 6) + 2
              }
            >
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Техніка і обладнання</Th>
            <Th>Будівлі і споруди</Th>
            <Th>МШП</Th>
            <Th>Біо активи</Th>
            <Th>
              Сума <br />
              амортизації
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            let businessSum = 0;
            let buyingSum = 0;
            let MSHPSum = 0;
            for (let i = start; i <= end; i++) {
              const buildingValue = +myBusiness.buildings
                .filter(
                  (el) =>
                    (getYearFromString(
                      el.amortization?.introductionDate || ""
                    ) || 0) <= i &&
                    (getYearFromString(
                      el.amortization?.introductionDate || ""
                    ) || 0) +
                      (el.amortization?.depreciationPeriod || 0) >=
                      i
                )
                .reduce(
                  (p, c) =>
                    p +
                    (c.amortization?.depreciationPerMonth || 0) *
                      (i == getYearFromString(c.amortization?.introductionDate!)
                        ? 13 -
                          getMonthFromString(c.amortization?.introductionDate!)
                        : 12),
                  0
                )
                .toFixed(2);
              const buyingValue = +myBusiness.buying_machines
                .filter(
                  (el) =>
                    (getYearFromString(
                      el.amortization?.introductionDate || ""
                    ) || 0) <= i &&
                    (getYearFromString(
                      el.amortization?.introductionDate || ""
                    ) || 0) +
                      (el.amortization?.depreciationPeriod || 0) >=
                      i
                )
                .reduce(
                  (p, c) =>
                    p +
                    (c.amortization?.depreciationPerMonth || 0) *
                      (i == getYearFromString(c.amortization?.introductionDate!)
                        ? 13 -
                          getMonthFromString(c.amortization?.introductionDate!)
                        : 12),
                  0
                )
                .toFixed(2);
              const MSHPValue = +myBusiness.MSHP.filter(
                (el) =>
                  (getYearFromString(el.amortization?.introductionDate || "") ||
                    0) <= i &&
                  (getYearFromString(el.amortization?.introductionDate || "") ||
                    0) +
                    (el.amortization?.depreciationPeriod || 0) >=
                    i
              )
                .reduce(
                  (p, c) =>
                    p +
                    (c.amortization?.depreciationPerMonth || 0) *
                      (i == getYearFromString(c.amortization?.introductionDate!)
                        ? 13 -
                          getMonthFromString(c.amortization?.introductionDate!)
                        : i ==
                          getYearFromString(c.amortization?.introductionDate!) +
                            (c.amortization?.depreciationPeriod || 0)
                        ? getMonthFromString(
                            c.amortization?.introductionDate!
                          ) - 1
                        : 12),
                  0
                )
                .toFixed(2);
              businessSum += buildingValue;
              buyingSum += buyingValue;
              MSHPSum += MSHPValue;
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>{buyingValue}</Td>
                  <Td>{buildingValue}</Td>
                  <Td>{MSHPValue}</Td>
                  <Td>0</Td>
                  <Td>{buyingValue + buildingValue + MSHPValue}</Td>
                </Tr>
              );
            }
            res.push(
              <Tr key={end + 1}>
                <Td>Разом</Td>
                <Td>{buyingSum.toFixed(2)}</Td>
                <Td>{businessSum.toFixed(2)}</Td>
                <Td>{MSHPSum.toFixed(2)}</Td>
                <Td>{0}</Td>
                <Td>
                  {(
                    +buyingSum.toFixed(2) +
                    +businessSum.toFixed(2) +
                    +MSHPSum.toFixed(2)
                  ).toFixed(2)}
                </Td>
              </Tr>
            );
            return res;
          })()}

          <Tr>
            <Td>Залишкова вартість</Td>
          </Tr>
        </Tbody>
      </Table>
      <Description>
        Для планування необхідних ресурсів використано нормативний метод, дані
        про потребу основних ресурсів розраховується згідно з потребами
        технлогічних карт, записуються у табличному вигляді.
      </Description>
      {/* <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={7}>
              <TableName>Основні ресурси</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва ресурсу</Th>
            <Th>Одиниця виміру</Th>
            <Th>Кількість</Th>
            <Th>Ціна</Th>
            <Th>Сума</Th>
            <Th>Під культуру</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              res.push(
                myBusiness.busProds
                  .filter((el) => el.year == i - start)
                  .map((el) => (
                    <Tr key={el.id}>
                      <Td>{i}</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td>{el.product?.culture?.name}</Td>
                    </Tr>
                  ))
              );
              // res.push(<Tr></Tr>)
            }

            return res;
          })()}
        </Tbody>
      </Table> */}
      <Table size={"sm"}>
        <Thead>
          <Th>
            <TableName>Потреби в ресурсах для бізнес-плану</TableName>
          </Th>
        </Thead>
      </Table>
      {(() => {
        const res = [];
        for (let i = start; i <= end; i++) {
          res.push(
            <Text
              key={i}
              fontWeight={"bold"}
              fontSize={"16px"}
              textAlign={"center"}
            >
              {i}
            </Text>
          );
          res.push(
            myBusiness.busProds
              .filter((el) => el.year == i - start)
              .map((el) => (
                <TEJustificationContent
                  key={el.id}
                  isPlan={true}
                  myCart={el.tech_cart!}
                  myJustification={{ area: el.area }}
                />
              ))
          );
        }
        return res;
      })()}
      {/* <Paragraph>4.3. Опис продукту</Paragraph>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={4}>
              <Description>
                {(() => {
                  const set = new Set(
                    myBusiness.busProds.map((el) => el.product?.name)
                  );
                  //@ts-ignore
                  return [...set].map((el) => characteristicsCulture[el]);
                })()}
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={4}>
              <TableName>Продукти</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={4}>
              <TableNumber />
            </Th>
          </Tr>
          <Tr>
            <Th>Рік</Th>
            <Th>Назва продукту</Th>
            <Th>Упаковка</Th>
            <Th>Кількість</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const busProd = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                busProd.map((el) => (
                  <Tr key={el.id}>
                    <Td>{i}</Td>
                    <Td>{el.product?.name}</Td>
                    <Td>{}</Td>
                    <Td>{}</Td>
                  </Tr>
                ))
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table> */}
      <Table size="sm">
        <Thead>
          <Tr>
            <Th colSpan={6}>
              <Description>
                Виробництво продукції планується з врахуванням урожайності
                скоригованої по роках експлуатації насаджень.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableName>План виробництва продукції</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={6}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <PlanIncomeProductionTableHeadRow isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              let sum = 0;
              const busProds = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );
              res.push(
                ...busProds.map((el) => {
                  const vegetationYear = el.vegetationYear;
                  const amount =
                    +(
                      (vegetationYear?.potentialYieldPerHectare || 0) *
                      (vegetationYear?.allCoeff || 0)
                    ) || 0;
                  const gather = (amount * el.area).toFixed(2);
                  sum += +((el.price || 0) * +gather).toFixed(2);
                  return (
                    <Tr key={el.id}>
                      <Td>{el.product?.name}</Td>
                      <Td>{amount.toFixed(2)}</Td>
                      <Td>{el.area}</Td>
                      <Td>{gather}</Td>
                      <Td>{el.price}</Td>
                      <Td>{((el.price || 0) * +gather).toFixed(2)}</Td>
                    </Tr>
                  );
                })
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                  <Td>Разом:</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>{sum}</Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      {/* <Heading textAlign={"center"} size={"sm"} mt={5}>
      Продаж продукції
    </Heading> */}
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th colSpan={7}>
              <Description>
                Реалізація продукції панується з охолодженням ягід згідно
                графіку.
              </Description>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={7}>
              <TableName>Графік збору продукції</TableName>
            </Th>
          </Tr>
          <Tr>
            <Th colSpan={7}>
              <TableNumber></TableNumber>
            </Th>
          </Tr>
          <SaleTableHeadRows isPlan={true} />
        </Thead>
        <Tbody>
          {(() => {
            const res = [];
            for (let i = start; i <= end; i++) {
              const busProds = myBusiness.busProds.filter(
                (el) => el.year == i - start
              );

              res.push(
                ...busProds?.map((el) => {
                  const vegetationYear = el.vegetationYear;
                  const sum =
                    +(
                      el.area *
                      vegetationYear?.potentialYieldPerHectare! *
                      (vegetationYear?.allCoeff || 1)
                    ).toFixed(2) || 0;
                  return (
                    <Tr key={el.id}>
                      <Td>{el.product?.culture?.name}</Td>
                      <Td>{el.product?.name}</Td>
                      <Td>{el.product?.culture?.collectPeriod}</Td>
                      <Td>{sum}</Td>
                      <Td>{el.price}</Td>
                      <Td>{(sum * el.price!).toFixed(2)}</Td>
                    </Tr>
                  );
                })
              );
              res.push(
                <Tr key={i} fontWeight={"bold"}>
                  <Td>{i}</Td>
                </Tr>
              );
            }
            return res;
          })()}
        </Tbody>
      </Table>
      <Description>
        У структурі собівартості продукції виділено три групи витрат: Прямі –
        розрахунок на основі технологічної карти Загально-виробничі – розрахунок
        на основі вимог забезпечення виробництва і збуту продукції Постійні –
        розрахунок на основі вимог щодо адміністративного управління
        підприємством
      </Description>
      <MyTableContainer mt={"50px"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th colSpan={9}>
                <TableName>Собівартість продукції</TableName>
              </Th>
            </Tr>
            <Tr>
              <Th colSpan={9}>
                <TableNumber></TableNumber>
              </Th>
            </Tr>
            {/* <CostProdTableHeadRows /> */}
          </Thead>
          <Tbody>
            {(() => {
              const data: {
                name: string;
                permanent: number;
                general: number;
                direct: number;
                outcome: number;
                amount?: number;
                cost?: number;
                bold?: boolean;
              }[] = [];
              for (let i = start; i <= end; i++) {
                const busProd = myBusiness.busProds.filter(
                  (el) => el.year == i - start
                );
                const permanent = myBusiness.outcomes.filter(
                  (el) => el.year == i - start && el.group == "Постійні"
                );
                const general = myBusiness.outcomes.filter(
                  (el) =>
                    el.year == i - start && el.group == "Загально виробничі"
                );
                const monthAmount = getMonthAmountFromBusinessPlan(
                  myBusiness.dateStart,
                  i,
                  start
                );
                data.push(
                  ...busProd.map((el) => {
                    const vegetationYear = el.vegetationYear;
                    const amount =
                      +(
                        el.area *
                        vegetationYear?.potentialYieldPerHectare! *
                        (vegetationYear?.allCoeff || 1)
                      ).toFixed(2) || 0;
                    return {
                      // year: i,
                      name: el.product?.name!,
                      direct: +(
                        (el.tech_cart?.costHectare || 0) * el.area +
                        (el.tech_cart?.tech_operations?.reduce(
                          (p, c) =>
                            p +
                            (c.costHandWork || 0) +
                            (c.costMachineWork || 0),
                          0
                        ) || 0) *
                          0.235
                      ).toFixed(2),
                      permanent: 0,
                      general: 0,
                      outcome: +(
                        (el.tech_cart?.costHectare || 0) * el.area
                      ).toFixed(2),
                      amount: amount,
                    };
                  })
                );
                const directValue = busProd.reduce(
                  (p, c) =>
                    p +
                    (c.tech_cart?.costHectare || 0) * c.area +
                    (c.tech_cart?.tech_operations?.reduce(
                      (p, c) =>
                        p + (c.costHandWork || 0) + (c.costMachineWork || 0),
                      0
                    ) || 0) *
                      0.235,
                  0
                );
                const permanentValue = permanent.reduce(
                  (p, c) => p + (c.costYear || 0),
                  0
                );
                const generalValue = general.reduce(
                  (p, c) => p + (c.costYear || 0),
                  0
                );
                data.push({
                  // year: i,
                  name: i + " Разом:",
                  bold: true,
                  direct: +directValue.toFixed(2),
                  permanent: +permanentValue.toFixed(2),
                  general: +generalValue.toFixed(2),
                  outcome: +(
                    generalValue +
                    permanentValue +
                    directValue
                  ).toFixed(2),
                });
              }
              const columns: ColumnDef<{
                name: string;
                permanent: number;
                general: number;
                direct: number;
                outcome: number;
                amount: number;
                cost: number;
              }>[] = [
                { header: "Назва", accessorKey: "name" },
                { header: "Постійні", accessorKey: "permanent" },
                { header: "Заг.Виг.", accessorKey: "general" },
                { header: "Прямі", accessorKey: "direct" },
                { header: "Витрати", accessorKey: "outcome" },
                { header: "К-ть", accessorKey: "amount" },
                { header: "Собівартість", accessorKey: "cost" },
              ];
              return <TableContent data={data} columns={columns} />;
              const res = [];
              for (let i = start; i < end; i++) {
                res.push(
                  <Tr key={i}>
                    <Td>{i}</Td>
                  </Tr>
                );
              }
              return res;
            })()}
          </Tbody>
        </Table>
      </MyTableContainer>
    </>
  );
}

export default observer(ProductionBusinessPlan);
