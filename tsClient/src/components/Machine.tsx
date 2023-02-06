import React, { useContext } from "react";
import { Context } from "../index.js";
import Input from "../ui/Input/Input.js";

function CreateAgriculturalMachine({ res, setRes }) {
  const { map } = useContext(Context);
  return (
    <>
      <h4>Внесіть данні для СГ машини</h4>
      <div className=" gap-3">
        <div>
          <p>Назва СГ машини</p>
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <Input
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
          <select
            value={res.gradeId}
            onChange={(e) => {
              setRes({ ...res, gradeId: +e.target.value });
            }}
          >
            <option selected disabled hidden value="">
              Виберіть тип роботи
            </option>
            {map.grade.map((el) => (
              <option value={el.id}>{el.indicator}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default CreateAgriculturalMachine;
