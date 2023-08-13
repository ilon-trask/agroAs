import { Container, Table, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import MyHeading from "src/ui/MyHeading";
import MyTableContainer from "src/ui/MyTableContainer";

function VideoPage() {
  return (
    <Container maxW={"container.xl"}>
      <MyHeading>Відео</MyHeading>
      <MyTableContainer>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Тема</Th>
              <Th>Назва</Th>
              <Th>Тривалість</Th>
              <Th>Автор</Th>
              <Th>Вид</Th>
              <Th>Посилання</Th>
              <Th>Публікація</Th>
            </Tr>
          </Thead>
        </Table>
      </MyTableContainer>
    </Container>
  );
}

export default VideoPage;
