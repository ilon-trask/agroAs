import React from "react";

const CreateTraktor = ({ res, setRes }) => {
  return (
    <>
      <h4>Внесіть данні для трактора</h4>
      <div className=" gap-3">
        <div>
          <p>Назва трактора</p>
          <input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameTractor}
            onChange={(e) => {
              setRes({ ...res, nameTractor: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Марка трактора</p>
          <input
            placeholder="Вкажіть марку"
            type="text"
            value={res?.brand}
            onChange={(e) => {
              setRes({ ...res, brand: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Ціна трактора грн</p>
          <input
            placeholder="Вкажіть ціну"
            type="number"
            value={res?.marketCost}
            onChange={(e) => {
              setRes({ ...res, marketCost: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Термін амортизації в роках</p>
          <input
            placeholder="Вкажіть термін"
            type="number"
            value={res?.depreciationPeriod}
            onChange={(e) => {
              setRes({ ...res, depreciationPeriod: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Потужність двигуна кВт</p>
          <input
            placeholder="Вкажіть потіжність"
            type="number"
            value={res?.enginePower}
            onChange={(e) => {
              setRes({ ...res, enginePower: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Розхід палива на 1 год</p>
          <input
            placeholder="Вкажіть розхід"
            type="number"
            value={res?.fuelConsumption}
            onChange={(e) => {
              setRes({ ...res, fuelConsumption: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Кількість персоналу</p>
          <input
            placeholder="Вкажіть кількість"
            type="number"
            value={res?.numberOfPersonnel}
            onChange={(e) => {
              setRes({ ...res, numberOfPersonnel: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Розряд роботи</p>
          <input
            placeholder="Вкажіть розряд"
            type="number"
            value={res?.typeOfWork}
            onChange={(e) => {
              setRes({ ...res, typeOfWork: +e.target.value });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CreateTraktor;
