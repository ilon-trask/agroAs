import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Context } from "../main";
import { createCart, updateMap } from "../http/requests";
import { CartProps, cartProps } from "../modules/CreateCart";
import style from "./Input.module.css";
import { func } from "./Dialog";
import { useParams } from "react-router-dom";
import { Itech_cart } from "../../../tRPC serv/models/models";
import {
  Box,
  Heading,
  Select,
  ModalBody,
  Button,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { resTechCartsWithOpers } from "../../../tRPC serv/controllers/TechCartService";
import useVegetationYears from "../pages/hook/useVegetationYears";
const createCartFunc: func<cartProps> = (
  id,
  map,
  update,
  res,
  setIsErr,
  setOpen,
  setRes,
  a,
  b,
  c,
  d,
  setUpdate,
  complex,
  setComplex
) => {
  if (
    res.nameCart == "" ||
    res.area == "" ||
    res.salary == "" ||
    res.priceDiesel == "" ||
    (complex && !res.sectionId)
  ) {
    setIsErr(true);
  } else {
    setIsErr(false);
    setOpen(false);
    res.area = +res.area;
    res.salary = +res.salary;
    res.priceDiesel = +res.priceDiesel;
    res.cultureId = res.cultureId ? +res.cultureId : undefined;
    res.cultivationTechnologyId = res.cultivationTechnologyId
      ? +res.cultivationTechnologyId
      : undefined;
    if (setUpdate) setUpdate(false);
    setRes(CartProps);
    if (setComplex) setComplex(false);
    if (update) {
      updateMap(map, res as resTechCartsWithOpers);
    } else {
      createCart(map, {
        area: res.area,
        nameCart: res.nameCart,
        priceDiesel: res.priceDiesel,
        salary: res.salary,
        isPublic: res.isPublic,
        isComplex: complex ? complex : undefined,
        sectionId: res.sectionId ? res.sectionId : undefined,
        cultureId: res.cultureId,
        cultivationTechnologyId: res.cultivationTechnologyId,
        year: res.year ? res.year : undefined,
      });
    }
  }
};

type props = {
  res: cartProps;
  setRes: Dispatch<SetStateAction<cartProps>>;
  setIsErr: (isErr: boolean) => void;
  setOpen: (open: boolean) => void;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  noBtn?: boolean;
  complex?: boolean;
  setComplex?: Dispatch<SetStateAction<boolean>>;
  isCul?: boolean;
};
const Name = ({
  res,
  setRes,
}: {
  res: cartProps;
  setRes: Dispatch<SetStateAction<cartProps>>;
}) => (
  <>
    <Heading as={"h4"} size="sm" minW={"max-content"}>
      Назва карти
    </Heading>
    <Input
      placeholder="Вкажіть назву"
      type="text"
      value={res?.nameCart}
      onChange={(e) => {
        setRes({ ...res, nameCart: e.target.value });
      }}
    />
  </>
);
export default function MapInputs({
  res,
  setRes,
  setIsErr,
  setOpen,
  update,
  setUpdate,
  noBtn,
  complex,
  setComplex,
  isCul,
}: props) {
  const { map } = useContext(Context);
  const { id } = useParams();

  return (
    <ModalBody>
      <Heading as={"h4"} size="md" textAlign={"center"}>
        Загальні показники для розрахунку
      </Heading>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        mt={"15px"}
      >
        <Box>
          <Name res={res} setRes={setRes} />
        </Box>

        {!!complex ? (
          <Box>
            <Heading as={"h4"} size="sm" minW={"max-content"}>
              Виберіть розділ
            </Heading>
            <Select
              value={res.sectionId}
              onChange={(e) => setRes({ ...res, sectionId: +e.target.value })}
            >
              <option disabled hidden value="">
                Виберіть розділ
              </option>
              {map.section.map((el) => (
                <option value={el.id}>{el.name}</option>
              ))}
            </Select>
          </Box>
        ) : (
          !!isCul && (
            <>
              <Box>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Виберіть культуру
                </Heading>
                <Select
                  value={res?.cultureId}
                  onChange={(e) =>
                    setRes({ ...res, cultureId: e.target.value as any })
                  }
                >
                  <option value="" hidden defaultChecked>
                    Виберіть опцію
                  </option>
                  {map.culture.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Heading as={"h4"} size="sm" minW={"max-content"}>
                  Виберіть технології
                </Heading>
                <Select
                  value={res.cultivationTechnologyId}
                  onChange={(e) =>
                    setRes({ ...res, cultivationTechnologyId: +e.target.value })
                  }
                >
                  <option hidden defaultChecked value="">
                    Виберіть технології
                  </option>
                  {map.cultivationTechnologies.map((el) => (
                    <option value={el.id}>{el.name}</option>
                  ))}
                </Select>
              </Box>
            </>
          )
        )}
      </Box>
      <Box display={"flex"} mt={"15px"} gap={3}>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Площа,
            <br /> гектари
          </Heading>
          <Input
            mt={"auto"}
            placeholder="Вкажіть площу"
            type="number"
            onChange={(e) => {
              setRes({ ...res, area: e.target.value });
            }}
            value={res?.area}
          />
        </div>
        <div>
          <Heading as={"h4"} size="sm">
            Розрахункова <br /> ЗП, грн/міс
          </Heading>
          <Input
            placeholder="Вкажіть ЗП"
            type="number"
            onChange={(e) => {
              setRes({ ...res, salary: e.target.value });
            }}
            value={res?.salary}
          />
        </div>
        <div>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            Ціна ДП, <br />
            грн/л
          </Heading>
          <Input
            placeholder="Вкажіть ціну ДП"
            type="number"
            onChange={(e) => {
              setRes({ ...res, priceDiesel: e.target.value });
            }}
            value={res?.priceDiesel}
          />
        </div>
      </Box>
      {isCul && (
        <Box>
          <Heading as={"h4"} size="sm" minW={"max-content"}>
            рік
          </Heading>
          <Select
            value={res.year}
            onChange={(e) =>
              setRes((prev) => ({ ...prev, year: e.target.value as any }))
            }
          >
            <option value="" hidden defaultChecked>
              Оберіть опцію
            </option>
            {useVegetationYears.map((el) => (
              <option value={el.name}>{el.name}</option>
            ))}
          </Select>
        </Box>
      )}
      <ModalFooter p={"15px 5px"}>
        {!noBtn && (
          <Button
            onClick={() =>
              createCartFunc(
                +id!,
                map,
                update,
                res,
                setIsErr,
                setOpen,
                setRes,
                undefined,
                undefined,
                undefined,
                undefined,
                setUpdate,
                complex,
                setComplex
              )
            }
          >
            Зберегти
          </Button>
        )}
      </ModalFooter>
    </ModalBody>
  );
}
