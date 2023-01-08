import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import OperSection from "../components/popupsforTechnologicalOper/OperSection";
import Easy from "../components/popupsforTechnologicalOper/Mater";
import Service from "../components/popupsforTechnologicalOper/Service";
import MapInputs from "../components/MapInputs";
import MechanicalWork from "../components/popupsforTechnologicalOper/MechanicalWork";

import { Context } from "../index";
import { deleteOper, getOnlyCart } from "../http/requests";

const DevicePage = observer(() => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [cell, setCell] = useState("");
  const [section, setSection] = useState("");
  const [update, setUpdate] = useState(false);
  const [res, setRes] = useState({
    nameOper: "",
    price: "",
    amount: "",
  });
  const [mapRes, setMapRes] = useState({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });

  const { map } = useContext(Context);
  let { id } = useParams();

  let [operData] = map.opers.filter((el) => el[0]?.techCartId == id);

  let [mapData] = map.maps.filter((el) => el.id == id);

  let th = { fontSize: "18px", padding: "0 10px 0 10px" };
  let sum = 0;
  let akk = 0;
  const [akkum, setAkkum] = useState(0);

  return (
    <Container>
      <div style={{ fontSize: "20px" }}>
        <Link
          to="/"
          onClick={() => {
            getOnlyCart(map);
          }}
        >
          {"<НА ГОЛОВНУ"}
        </Link>
      </div>
      <p style={{ textAlign: "center", fontSize: "25px" }}>
        Технологічна карта
      </p>
      <div>
        <table style={{ marginTop: "15px", marginBottom: "15px" }}>
          <thead>
            <tr>
              <th style={{ ...th }}></th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Назва культури
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Площа
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Розрахункова ЗП
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість ДП
              </th>
              <th style={{ ...th }}></th>
            </tr>
          </thead>
          <tbody>
            {
              <tr key={mapData?.id}>
                <th
                  onClick={() => {
                    setMapOpen(true);
                    setUpdate(true);
                    setMapRes({
                      id: mapData.id,
                      nameCart: mapData.nameCart,
                      area: mapData.area,
                      salary: mapData.salary,
                      priceDiesel: mapData.priceDiesel,
                    });
                  }}
                >
                  ред
                </th>
                <th
                  style={{
                    border: "1px solid",
                    ...th,
                  }}
                >
                  {mapData?.nameCart}
                </th>
                <th
                  style={{
                    border: "1px solid",
                    ...th,
                  }}
                >
                  {mapData?.area}
                </th>
                <th
                  style={{
                    border: "1px solid",
                    ...th,
                  }}
                >
                  {mapData?.salary}
                </th>
                <th
                  style={{
                    border: "1px solid",
                    ...th,
                  }}
                >
                  {mapData?.priceDiesel}
                </th>
                <th></th>
              </tr>
            }
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th style={{ ...th }}>Р</th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Технологічна операція
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Обсяг робіт
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Одиниця виміру
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість Техніки
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість палива
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                ЗП механізована
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                ЗП ручна
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість матеріалів
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість транспорту
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Вартість послуг
              </th>
              <th
                style={{
                  border: "1px solid",
                  ...th,
                }}
              >
                Разом
              </th>
              <th style={{ ...th }}>В</th>
            </tr>
          </thead>
          <tbody>
            {operData?.map((el) => {
              akk += el.costHandWork || el.costMaterials || el.costServices;
              sum +=
                mapData.area * el.costHandWork ||
                mapData.area * el.costMaterials ||
                mapData.area * el.costServices;
              return (
                <tr key={el.id}>
                  <td
                    onClick={() => {
                      setUpdate(true);
                      setSecondOpen(true);
                      const [second] = map[el.cell].filter(
                        (mat) => mat.techOperationId == el.id
                      );
                      setAkkum(
                        akk - second.price * (second.consumptionPerHectare || 1)
                      );
                      setRes({
                        id: el.id,
                        nameOper: el.nameOperation,
                        price: second.price,
                        unitsOfCost: second.unitsOfCost,
                        amount: second.consumptionPerHectare,
                        unitsOfConsumption: second.unitsOfConsumption,
                      });
                      setCell(el.cell);
                    }}
                  >
                    Ред
                  </td>
                  <td>{el.nameOperation}</td>
                  <td>{mapData.area}</td>
                  <td>{"0"}</td>
                  <td>{"0"}</td>
                  <td>{"0"}</td>
                  <td>{"0"}</td>
                  <td>{el.costHandWork * mapData.area || "0"}</td>
                  <td>{el.costMaterials * mapData.area || "0"}</td>
                  <td>{"0"}</td>
                  <td>{el.costServices * mapData.area || "0"}</td>
                  <td>
                    {mapData.area * el.costHandWork ||
                      mapData.area * el.costMaterials ||
                      mapData.area * el.costServices}
                  </td>
                  <td
                    className="delet"
                    onClick={() => {
                      deleteOper(map, el.id, el, id, akk);
                    }}
                  >
                    видалити
                  </td>
                </tr>
              );
            })}

            <tr>
              <td></td>
              <td>Загальні витрати</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{sum}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <button
          style={{ marginTop: "15px", marginLeft: "31px" }}
          onClick={() => {
            setUpdate(false);
            setOpen(true);
          }}
        >
          Додати технологічну операцію
        </button>
      </div>
      <OperSection
        open={open}
        setOpen={setOpen}
        setSecondOpen={setSecondOpen}
        cell={cell}
        setCell={setCell}
        section={section}
        setSection={setSection}
      />

      {cell == "costMaterials" ? (
        <Easy
          open={secondOpen}
          setOpen={setSecondOpen}
          cell={cell}
          setCell={setCell}
          section={section}
          setSection={setSection}
          akk={akk}
          akkum={akkum}
          res={res}
          setRes={setRes}
          update={update}
          setUpdate={setUpdate}
        />
      ) : cell == "costServices" ? (
        <Service
          open={secondOpen}
          setOpen={setSecondOpen}
          cell={cell}
          setCell={setCell}
          section={section}
          setSection={setSection}
          akk={akk}
          akkum={akkum}
          res={res}
          setRes={setRes}
          update={update}
          setUpdate={setUpdate}
        />
      ) : cell == "costMechanical" ? (
        <MechanicalWork
          open={secondOpen}
          setOpen={setSecondOpen}
          cell={cell}
          setCell={setCell}
          section={section}
          setSection={setSection}
          akk={akk}
          akkum={akkum}
          res={res}
          setRes={setRes}
          update={update}
          setUpdate={setUpdate}
        />
      ) : (
        ""
      )}
      <MapInputs
        open={mapOpen}
        setOpen={setMapOpen}
        update={update}
        setUpdate={setUpdate}
        res={mapRes}
        setRes={setMapRes}
      />
    </Container>
  );
});
export default DevicePage;
