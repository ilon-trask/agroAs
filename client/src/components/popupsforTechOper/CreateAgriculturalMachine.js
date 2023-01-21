import React from "react";

function CreateAgriculturalMachine({ res, setRes }) {
  return (
    <>
      <h4>Внесіть данні для СГ машини</h4>
      <div className=" gap-3">
        <div>
          <p>Назва СГ машини</p>
          <input
            placeholder="Вкажіть назву"
            type="text"
            value={res?.nameMachine}
            onChange={(e) => {
              setRes({ ...res, nameMachine: e.target.value });
            }}
          />
        </div>
        <div>
          <p>Марка СГ машини</p>
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
          <p>Ціна СГ машини грн</p>
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
          <p>Термін амортизації в роках </p>
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
          <p>Ширина захвату</p>
          <input
            placeholder="Вкажіть потіжність"
            type="number"
            step="0.01"
            value={res?.widthOfCapture}
            onChange={(e) => {
              setRes({ ...res, widthOfCapture: +e.target.value });
            }}
          />
        </div>
        <div>
          <p>Робоча швидкість</p>
          <input
            placeholder="Вкажіть потіжність"
            type="number"
            value={res?.workingSpeed}
            onChange={(e) => {
              setRes({ ...res, workingSpeed: +e.target.value });
            }}
          />
        </div>

        <div>
          <p>
            Кількість обслуговуючого
            <br /> персоналу
          </p>
          <input
            placeholder="Вкажіть кількість"
            type="number"
            value={res?.numberOfServicePersonnel}
            onChange={(e) => {
              setRes({ ...res, numberOfServicePersonnel: +e.target.value });
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
}

export default CreateAgriculturalMachine;
