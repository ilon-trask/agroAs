import React, { useContext } from "react";
import { Context } from "../main";
import { Link } from "react-router-dom";
import {
  BUSINESS_ROUTER,
  DATA_BASE_ROUTER,
  ENTERPRISE_JOURNAL_ROUTER,
  LOGIN_ROUTE,
  MAP_ROUTE,
  VIDEO_ROUTER,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { supabase } from "../http/requests";
import { Button, Box, Image } from "@chakra-ui/react";
import verticalLogo from "/verticalLogo.svg";

const NavBar = observer(() => {
  const { map, user } = useContext(Context);

  return (
    <Box bgColor={"rgba( 93, 160, 93, 0.55 )"} py={"10px"}>
      <Box
        px={"40px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link
          style={{ color: "#20401e", textDecoration: "none" }}
          to={MAP_ROUTE}
        >
          <Image src={verticalLogo} h={"50px"} w={"111px"} />
        </Link>
        {user.role == "service_role" && (
          <Box as={"nav"} gap={4} display={"flex"}>
            <Link
              style={{ color: "#20401e", textDecoration: "none" }}
              to={ENTERPRISE_JOURNAL_ROUTER}
            >
              Підприємство
            </Link>
            <Link
              style={{ color: "#20401e", textDecoration: "none" }}
              to={MAP_ROUTE}
            >
              Технологічні карти
            </Link>

            <Link
              style={{ color: "#20401e", textDecoration: "none" }}
              to={BUSINESS_ROUTER}
            >
              Бізнес-плани
            </Link>
            <Link
              style={{ color: "#20401e", textDecoration: "none" }}
              to={DATA_BASE_ROUTER}
            >
              База данних
            </Link>
            <Link
              style={{ color: "#20401e", textDecoration: "none" }}
              to={VIDEO_ROUTER}
            >
              Відео
            </Link>
          </Box>
        )}
        {user.isAuth ? (
          <Box>
            <Link to={BUSINESS_ROUTER}>
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
          </Box>
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
