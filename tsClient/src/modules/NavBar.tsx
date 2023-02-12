import React, { useContext } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import style from "./NavBar.module.css";
import { getCarts, supabase } from "../http/requests";
import { Button } from "@chakra-ui/react";

const NavBar = observer(() => {
  const { map, user } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className={style.bg}>
      <div className={style.container}>
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
                  console.log(user.isAuth);
                  getCarts(map);
                }}
              >
                Вийти
              </Button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to={LOGIN_ROUTE}>
              <Button>Авторизуватись</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});
export default NavBar;
