import React, { useContext } from "react";
import { Context } from "..";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import style from "./NavBar.module.css";
import { supabase } from "../App";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <Link style={{ color: "white", textDecoration: "none" }} to={MAP_ROUTE}>
          калькулятор
        </Link>
        {user.isAuth ? (
          <div className="ml-auto">
            <button>Адмін панель</button>
            <Link to={MAP_ROUTE}>
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  supabase.auth.signOut();
                  user.setIsAuth(false);
                }}
              >
                Вийти
              </button>
            </Link>
          </div>
        ) : (
          <div className="ml-auto">
            <Link to={LOGIN_ROUTE}>
              <button>Авторизуватись</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});
export default NavBar;
