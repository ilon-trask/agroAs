import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../main";

function Enterprise() {
  const { id } = useParams();
  const { enterpriseStore } = useContext(Context);
  const myEnterprise = enterpriseStore.enterprise.find((el) => el.id == id);
  return (
    <Container maxW={"container.lg"}>
      <Box mx={"auto"}>
        <Heading size={"md"} textAlign={"center"} mt={5}>
          Загальні данні
          <br /> підприємства: {myEnterprise?.name}
        </Heading>
      </Box>
    </Container>
  );
}

export default Enterprise;
