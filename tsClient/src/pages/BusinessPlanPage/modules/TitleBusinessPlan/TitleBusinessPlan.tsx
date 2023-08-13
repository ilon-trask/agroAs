import { Box, Image, Table, Td, Text, Th, Tr } from "@chakra-ui/react";
import React, { RefObject } from "react";
const IMGuRL =
  "https://bicofnobkczquxvztyzl.supabase.co/storage/v1/object/public/business-imgs/title";
function TitleBusinessPlan({
  topic,
  name,
  city,
  goal,
  responsiblePerson,
  enterpriseName,
  year,
  id,
  aref,
}: {
  topic: string;
  name: string;
  city: string | null | undefined;
  goal: string | null | undefined;
  responsiblePerson: string | null | undefined;
  enterpriseName: string | null | undefined;
  year: number;
  id: number;
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
        mb={4}
      >
        <Text width={"min-content"} textAlign={"right"}>
          {topic}
        </Text>
      </Box>
      <Box h={"330px"}>
        <Image src={IMGuRL + "/" + id} h={"330px"} mx={"auto"} />
      </Box>
      <Text fontSize={"32px"} fontWeight={"bold"} textAlign={"center"}>
        Бізнес-план
      </Text>
      <Text
        textAlign={"center"}
        mt={3}
        fontSize={"40px"}
        lineHeight={10}
        color={"#20401E"}
      >
        {name}
      </Text>
      <Table size="sm" mt={30} maxW={"80%"} mx={"auto"}>
        <Tr mt={5}>
          <Th fontWeight={"bold"} w="10%">
            Мета проекту
          </Th>
          <Td>{goal}</Td>
        </Tr>
        <Tr mt={5}>
          <Th fontWeight={"bold"} w="10%">
            Розробник
          </Th>
          <Td>{`Господарство: "${enterpriseName}"`}</Td>
        </Tr>
        <Tr mt={5}>
          <Th fontWeight={"bold"} w="10%">
            Відповідальна особа
          </Th>
          <Td>{responsiblePerson}</Td>
        </Tr>
      </Table>
      <Text mt={50} textAlign={"center"} fontSize={"10px"}>
        Інформація, наведена у проекті, є конфіденційною та надається за умови,
        що не буде передана третім особам без попереднього погодження з
        розробником проекту
      </Text>
      <Box mt={"60px"} textAlign={"center"}>
        {/* <Text>{city || "Івано-франківськ"}</Text> */}
        <Text>{city}</Text>
        <Text>{year}</Text>
      </Box>
    </Box>
  );
}

export default React.memo(TitleBusinessPlan);
