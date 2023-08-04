import { Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React, { RefObject } from "react";
import { resBusinessPlan } from "../../../../../../tRPC serv/controllers/BusinessService";
import Paragraph from "../../../../ui/Paragraph";
import SectionTitle from "../../../../ui/SectionTitle";

function ResumeBusinessPlan({
  productSet,
  aref,
  myBusiness,
}: {
  productSet: Set<String>;
  aref: RefObject<HTMLTableElement>;
  myBusiness: resBusinessPlan;
}) {
  return (
    <>
      <SectionTitle aref={aref} mt={5}>
        Резюме
      </SectionTitle>
      <Paragraph>2.1 Про проект</Paragraph>
      <Table size={"sm"}>
        <Tbody>
          <Tr>
            <Td colSpan={3}></Td>
          </Tr>
          <Tr>
            <Td>Опис проекту</Td>
            <Td colSpan={2}>
              Проект створення ягідної плантації середньою загальною площею{" "}
              {
                +(
                  myBusiness.lands.reduce((p, c) => p + c.area, 0) /
                  (myBusiness.realizationTime + 1)
                ).toFixed(3)
              }{" "}
              га, середньою корисною площею{" "}
              {
                +(
                  myBusiness.busProds.reduce((p, c) => p + c.area, 0) /
                  (myBusiness.realizationTime + 1)
                ).toFixed(3)
              }{" "}
              га
            </Td>
          </Tr>

          <Tr>
            <Td>Місце розташування</Td>
            <Td colSpan={2}>
              Ягідник буде розташовуватися на території України.
            </Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Td>Актуальність</Td>
            <Td colSpan={2}>
              Сприятливими передумовами відкриття бізнесу в даному напрямку є
              високі позиції України по виробництву ягід в світі. Країна має
              відмінні географічні та кліматичні, що відбивається на поступове
              підвищення валового збору і врожайності продукту.
            </Td>
          </Tr>
          <Tr>
            <Td rowSpan={3}>
              Високий попит і висока товарність ягід в Україні обумовлені:
            </Td>
            <Td colSpan={2}>Винятковою їх цінністю як продуктів харчування;</Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>
              Заморожуванням продукції, яку можна зберігати і реалізовувати
              протягом року і більше;
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>Розташуванням України близько до ринку Європи</Td>
          </Tr>
          <Tr></Tr>
          <Tr>
            <Td rowSpan={3}>Термін реалізації проекту</Td>
            <Td>Проектний період</Td>
            <Td>
              {(() => {
                const monthAmount = 13 - +myBusiness.dateStart?.split("-")[1];
                if (monthAmount == 12) {
                  return <Text>Років:-{myBusiness.realizationTime + 1}</Text>;
                } else {
                  return (
                    <Text>
                      Років:-{myBusiness.realizationTime}, місяців:-
                      {monthAmount}
                    </Text>
                  );
                }
                return null;
              })()}
            </Td>
          </Tr>
          <Tr>
            <Td>Початок реалізації</Td>
            <Td minW={"max-content"}>{myBusiness.dateStart}</Td>
          </Tr>
          <Tr>
            <Td>Початок продажів</Td>
          </Tr>
          {(() => {
            return [...productSet].map((el, ind) =>
              ind == 0 ? (
                <React.Fragment key={el as string}>
                  <Tr>
                    <Td rowSpan={productSet.size}>
                      Основні продукти підприємства
                    </Td>
                    <Td>{el}, охолоджена для реалізації (т)</Td>
                    <Td>
                      {myBusiness.busProds.reduce((p, c) => {
                        if (c.product?.name == el)
                          return +(
                            p +
                            (c.vegetationYear?.potentialYieldPerHectare || 0) *
                              (c.vegetationYear?.allCoeff || 0) *
                              c.area
                          ).toFixed(3);
                        else {
                          return p;
                        }
                      }, 0)}
                    </Td>
                  </Tr>
                </React.Fragment>
              ) : (
                <Tr key={el as string}>
                  <Td>{el}, охолоджені для реалізації (т)</Td>
                </Tr>
              )
            );
          })()}
          <Tr></Tr>
          <Tr>
            <Td rowSpan={7}>Бюджет проекту</Td>
            <Td>Вартість проекту</Td>
          </Tr>
          <Tr>
            <Td>В тому числі:</Td>
          </Tr>
          <Tr>
            <Td>Власні кошти</Td>
          </Tr>
          <Tr>
            <Td>Кредит</Td>
          </Tr>
          <Tr>
            <Td>Інвестиційні кошти</Td>
          </Tr>
          <Tr>
            <Td>Державна підтримка</Td>
          </Tr>
          <Tr>
            <Td>Коофіцієнт автономії</Td>
          </Tr>
          <Tr>
            <Td rowSpan={5}>Показинки проекту</Td>
            <Td>Площа земельної ділянки</Td>
          </Tr>
          <Tr>
            <Td>Валова виручка</Td>
          </Tr>
          <Tr>
            <Td>Чистий прибуток</Td>
          </Tr>
          <Tr>
            <Td>Рентабельність</Td>
          </Tr>
          <Tr>
            <Td>Термін окупності</Td>
          </Tr>
        </Tbody>
      </Table>
      <Paragraph>2.2 Інвестиції</Paragraph>
      <Table size={"sm"}>
        <Tbody>
          <Tr>
            <Td rowSpan={4}>Інвестиційна привабливість проекту</Td>
            <Td>Дисконтний період окупності (DPP), років</Td>
          </Tr>
          <Tr>
            <Td>Чиста поточна варість проекту (NPV)</Td>
          </Tr>
          <Tr>
            <Td>Внутрішня ставка доходу (IRR)</Td>
          </Tr>
          <Tr>
            <Td>Індекс прибутковості вкладень (PI)</Td>
          </Tr>
          <Tr>
            <Td rowSpan={4}>Початкові інвестиції</Td>
            <Td>Створення насаджень культур</Td>
          </Tr>
          <Tr>
            <Td>Купівля обладнання для крапельного зрошення</Td>
          </Tr>
          <Tr>
            <Td>Купівля холодильної камери на 2 т</Td>
          </Tr>
          <Tr>
            <Td>Покриття витрат до виходу в точку беззбитковості.</Td>
          </Tr>
        </Tbody>
      </Table>
      <Paragraph>2.3. Цілі, завдання та мета проекту</Paragraph>
      <Table size={"sm"}>
        <Tbody>
          <Tr>
            <Td rowSpan={4}>Цілі проекту</Td>
            <Td>Отримання прибутку від діяльності</Td>
          </Tr>
          <Tr>
            <Td>
              Часткове задоволення попиту на ягоди на ринку України та Європи
            </Td>
          </Tr>
          <Tr>
            <Td>Створення нових робочих місць під час реалізації проекту;</Td>
          </Tr>
          <Tr>
            <Td>
              Створення нових потоків надходжень до державного та місцевих
              бюджетів.
            </Td>
          </Tr>

          <Tr>
            <Td rowSpan={3}>Завдання проекту</Td>
            <Td colSpan={2}>
              Створити системний та цілісний документ який, обгрунтує створення
              підприємства з вирощування.
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>
              Визначення передбачуваного місцеположення організації на ринку
              (ринкової ніші)
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>
              Опис товару, який організація буде реалізовувати споживачам;
            </Td>
          </Tr>
          <Tr>
            <Td colSpan={2}>
              Аналіз доцільності розширення підприємства з точки зору
              рентабельності і прибутковості;
            </Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td>
              Проведення аналізу ризиків та можливих загроз, що стоять перед
              проектом, як в даний момент часу, так і в майбутньому.
            </Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>Мета проекту</Td>
            <Td>
              Розробка та опис шляхів створення підприємства з організації
              ягідника та подальшого продажу врожаю;
            </Td>
          </Tr>
          <Tr>
            <Td>Створення основи для можливого розвитку бізнесу.</Td>
          </Tr>
          <Tr>
            <Td>Географія збуту</Td>
            <Td>Передбачувана територія збуту продукції – Україна.</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}

export default ResumeBusinessPlan;
