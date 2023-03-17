import React, { useContext } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { getCarts, supabase } from "../http/requests";
import { Button, Box } from "@chakra-ui/react";

const NavBar = observer(() => {
  const { map, user } = useContext(Context);
  return (
    <Box bgColor={"RGBA(0, 0, 0, 0.64)"} py={"10px"}>
      <Box
        px={"40px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link style={{ color: "white", textDecoration: "none" }} to={MAP_ROUTE}>
          Калькулятор витрат
        </Link>
        {user.isAuth ? (
          <div>
            <Link to={MAP_ROUTE}>
              <Button
                onClick={async () => {
                  await supabase.auth.signOut();
                  user.isAuth = false;
                  user.role = "";
                  // getCarts(map);
                }}
              >
                Вийти
              </Button>
            </Link>
          </div>
        ) : (
          <Box>
            <Link to={LOGIN_ROUTE}>
              <Button>Авторизуватись</Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
});
export default NavBar;
