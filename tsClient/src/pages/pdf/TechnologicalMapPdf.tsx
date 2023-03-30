import React, { useContext, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { resTechCartsWithOpers } from "../../../../tRPC serv/controllers/TechCartService";
import font from "../../../font/OpenSans-Medium.ttf";
import boldFont from "../../../font/OpenSans-Bold.ttf";
import { Itech_operation } from "../../../../tRPC serv/models/models";
import { sectionsOpers } from "../../store/GetSectionsOpers";
function TechnologicalMapPdf({
  cart,
  sections,
}: {
  cart: resTechCartsWithOpers;
  sections: sectionsOpers;
}) {
  Font.register({
    family: "Open Sans",
    fonts: [{ src: font }, { src: boldFont, fontWeight: "bold" }],
  });

  const style = StyleSheet.create({
    all: {
      fontFamily: "Open Sans",
    },
    page: { paddingHorizontal: "55px", paddingVertical: "55px" },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      borderBottom: "1px solid #EDF2F7",
    },
    tableHeadRow: {
      fontSize: "12px",
    },
    tableHead: {
      paddingHorizontal: "24px",
      paddingVertical: "5px",
    },
    tableItem: {
      paddingHorizontal: "24px",
      paddingVertical: "5px",
    },
    tableItemRow: {
      fontSize: "16px",
    },
    sectionTit: {
      fontWeight: "bold",
      fontSize: "14px",
    },
    operItem: {
      fontSize: "14px",
    },
    amount: {
      textAlign: "right",
    },
  });
  let cun = 0;
  sections.forEach((el) => {
    el.arr.forEach((el) => {
      cun +=
        +cart?.area *
        (el.costMaterials ||
          el.costServices ||
          el.costTransport ||
          +el.costCars! +
            +el.costFuel! +
            +el.costHandWork! +
            +el.costMachineWork! ||
          el.costHandWork!);
    });
  });
  return (
    <Document language="UA" style={style.all}>
      <Page size={"A3"} orientation="landscape" style={style.page}>
        <Text style={{ textAlign: "center" }}>Технологічна карта</Text>
        <View>
          <View style={{ ...style.tableRow, ...style.tableHeadRow }}>
            <Text style={{ width: "170px", ...style.tableHead }}>
              НАЗВА КУЛЬТУРИ
            </Text>
            <Text style={{ width: "85px", ...style.tableHead }}>ПЛОЩА</Text>
            <Text style={{ width: "190px", ...style.tableHead }}>
              РОЗРАХУНКОВА ЗП
            </Text>
            <Text style={{ width: "132px", ...style.tableHead }}>
              ВАРТІСТЬ ДП
            </Text>
          </View>
          <View style={{ ...style.tableRow, ...style.tableItemRow }}>
            <Text style={{ width: "170px", ...style.tableItem }}>
              {cart?.nameCart}
            </Text>
            <Text style={{ width: "85px", ...style.tableItem }}>
              {cart?.area}
            </Text>
            <Text style={{ width: "190px", ...style.tableItem }}>
              {cart?.salary}
            </Text>
            <Text style={{ width: "132px", ...style.tableItem }}>
              {cart?.priceDiesel}
            </Text>
          </View>
        </View>
        <View>
          <View style={{ ...style.tableRow, ...style.tableHeadRow }}>
            <Text style={{ width: "70px", ...style.tableHead }}>
              Дата <br />
              початку
            </Text>
            <Text style={{ width: "265px", ...style.tableHead }}>
              Технологічна <br />
              операція
            </Text>
            <Text style={{ width: "42px", ...style.tableHead }}>
              Обсяг <br />
              робіт
            </Text>
            <Text style={{ width: "80px", ...style.tableHead }}>
              Одиниця <br />
              виміру
            </Text>
            <Text
              style={{ width: "78px", ...style.tableHead, ...style.amount }}
            >
              Разом
            </Text>
            <Text style={{ width: "71px", ...style.tableHead }}>
              Вартість <br />
              Техніки
            </Text>
            <Text style={{ width: "71px", ...style.tableHead }}>
              Вартість <br />
              палива
            </Text>
            <Text style={{ width: "119px", ...style.tableHead }}>
              ЗП
              <br /> механізована
            </Text>
            <Text style={{ width: "52px", ...style.tableHead }}>
              ЗП
              <br /> ручна
            </Text>
            <Text style={{ width: "92px", ...style.tableHead }}>
              Вартість
              <br /> матеріалів
            </Text>
            <Text style={{ width: "98px", ...style.tableHead }}>
              Вартість
              <br /> транспорту
            </Text>
            <Text style={{ width: "71px", ...style.tableHead }}>
              Вартість <br />
              послуг
            </Text>
          </View>
          {sections?.map((el, ind) => {
            const opers = el?.arr?.map((el) => {
              let amount =
                +cart?.area *
                (el.costMaterials ||
                  el.costServices ||
                  el.costTransport ||
                  +el.costCars! +
                    +el.costFuel! +
                    +el.costHandWork! +
                    +el.costMachineWork! ||
                  el.costHandWork!);

              return (
                <View style={style.tableRow} key={el.id}>
                  <Text
                    style={{
                      width: "70px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.date || null}
                  </Text>
                  <Text
                    style={{
                      width: "265px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.nameOperation}
                  </Text>
                  <Text
                    style={{
                      width: "42px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {cart?.area}
                  </Text>
                  <Text
                    style={{
                      width: "80px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {"га"}
                  </Text>
                  <Text
                    style={{
                      width: "78px",
                      ...style.tableItem,
                      ...style.operItem,
                      ...style.sectionTit,
                    }}
                  >
                    {amount}
                  </Text>
                  <Text
                    style={{
                      width: "71px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costCars! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "71px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costFuel! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "119px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costMachineWork! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "52px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costHandWork! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "92px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costMaterials! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "98px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costTransport! * cart?.area || "0"}
                  </Text>
                  <Text
                    style={{
                      width: "71px",
                      ...style.tableItem,
                      ...style.operItem,
                    }}
                  >
                    {el.costServices! * cart?.area || "0"}
                  </Text>
                </View>
              );
            });

            return (
              el?.arr[0] && (
                <>
                  <View style={style.tableRow}>
                    <View style={{ width: "70px" }}></View>
                    <Text
                      style={{
                        width: "265px",
                        paddingHorizontal: "24px",
                        ...style.sectionTit,
                      }}
                    >
                      {el?.title}
                    </Text>
                    {/* <Text>
                    <Divider />
                  </Text>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <View>
                    <Divider />
                  </View>
                  <Text>
                    <Divider />
                  </Text>
                  <View>
                    <Divider />
                  </View> */}
                  </View>
                  {opers}
                </>
              )
            );
          })}
          <View style={style.tableRow}>
            <Text
              style={{
                width: "70px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "265px",
                fontWeight: "bold",
                ...style.tableItem,
                ...style.operItem,
              }}
            >
              Всього витрат
            </Text>
            <Text
              style={{
                width: "42px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "80px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "78px",
                ...style.tableItem,
                ...style.operItem,
                ...style.sectionTit,
              }}
            >
              {cun}
            </Text>
            <Text
              style={{
                width: "71px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "71px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "119px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "52px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "92px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "98px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
            <Text
              style={{
                width: "71px",
                ...style.tableItem,
                ...style.operItem,
              }}
            ></Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default TechnologicalMapPdf;
