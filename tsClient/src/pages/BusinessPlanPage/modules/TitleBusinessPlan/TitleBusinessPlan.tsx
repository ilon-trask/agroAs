import { Box, Text } from "@chakra-ui/react";
import React, { RefObject } from "react";

function TitleBusinessPlan({
  topic,
  name,
  aref,
}: {
  topic: string;
  name: string;
  aref: RefObject<HTMLTableElement>;
}) {
  return (
    <Box ref={aref}>
      <Box
        mx={"auto"}
        w={"fit-content"}
        mt={20}
        fontSize={"60px"}
        lineHeight={10}
        color={"#20401E"}
      >
        <Text width={"min-content"} textAlign={"right"}>
          {topic}
        </Text>
      </Box>
      <Text mt={40} fontSize={"32px"} fontWeight={"bold"} textAlign={"center"}>
        Бізнес-план
      </Text>
      <Text textAlign={"center"} mt={3}>
        {name}
      </Text>
      <Box mt={200} maxW={"80%"} mx={"auto"}>
        <Box mt={5}>
          <Text>Мета проекту</Text>
        </Box>
        <Box mt={5}>
          <Text>Розробник</Text>
        </Box>
        <Box mt={5}>
          <Text>Відповідальна особа</Text>
        </Box>
        <Text mt={50} textAlign={"center"} fontSize={"10px"}>
          Інформація, наведена у проекті, є конфіденційною та надається за
          умови, що не буде передана третім особам без попереднього погодження з
          розробником проекту
        </Text>
      </Box>
      <Box mt={20} textAlign={"center"}>
        <Text>Івано-франківськ</Text>
        <Text>2023</Text>
      </Box>
    </Box>
  );
}

export default React.memo(TitleBusinessPlan);
