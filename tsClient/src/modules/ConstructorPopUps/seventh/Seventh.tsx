import { Box, Heading, Input, Text, useConst } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../main";
import GeneralDataTable from "../../GeneralDataTable";

function Seventh() {
  const { id } = useParams();
  const { map } = useContext(Context);
  let e = map.maps.find((el) => el.id == id);
  return (
    <Box h={"300px"}>
      <Heading as={"h4"} size={"md"} textAlign={"center"} mt={3}>
        Отриманий результат
      </Heading>
      <Heading as={"h3"} size={"sm"} textAlign={"center"} mt={3}>
        Вітаємо!
      </Heading>
      <Heading as={"h3"} size={"sm"} textAlign={"center"} mt={1}>
        Ви створили технологічну карту з наступними показниками
      </Heading>

      <Box maxW={"300px"} mx={"auto"} mt={4}>
        <Box>
          <Heading textAlign={"center"} size={"md"}>
            {e?.nameCart}
          </Heading>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Площа</Box>
            <Box>{e?.area || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Загальна вартість </Box>
            <Box>{e?.area! * e?.costHectare! || "0"}</Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box fontWeight={"bold"}>Собівартість 1 га</Box>
            <Box>{e?.costHectare || "0"}</Box>
          </Box>
        </Box>
      </Box>
      <Heading as={"h3"} size={"sm"} textAlign={"center"} mt={3}>
        Для отримання даних(pdf) вкажіть email
      </Heading>
      <Box display={"flex"} justifyContent={"center"}>
        <Input mt={2} w={"50%"} autoFocus border={"2px"} />
      </Box>
    </Box>
  );
}

export default observer(Seventh);
