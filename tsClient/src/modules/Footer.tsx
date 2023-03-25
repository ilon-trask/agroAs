import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { getCarts, supabase } from "../http/requests";
import { Button, Box, Text, Image } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import horizontalLogo from "/horizontalLogo.svg";
import FeedBackForm from "./FeedbackForm/FeedBackForm";
const NavBar = observer(() => {
  const { map, user } = useContext(Context);
  const [open, setOpen] = useState(false);
  return (
    <Box
      // bgColor={"#20401e"}
      style={{
        background: "rgba( 93, 160, 93, 0.55 )",
        // boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        // backdropFilter: "blur( 4px )",
      }}
      py={"10px"}
      mt={"auto"}
    >
      <FeedBackForm open={open} setOpen={setOpen} />
      <Box
        px={"40px"}
        display={["block", "block", "flex"]}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems={"center"} gap={"30px"}>
          <Image h={"70px"} w={"92px"} src={horizontalLogo}></Image>

          <Text
            style={{
              color: "#20401e",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Сервіс працює в тестовому режимі.
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
          <Text
            style={{
              color: "#20401e",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Зауваження і пропозиції надсилайте ----{">"}
          </Text>
          <Button onClick={() => setOpen(true)}>
            <EditIcon
              // color={"blue.400"}
              w={"20px"}
              h={"auto"}
              cursor={"pointer"}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
});
export default NavBar;
