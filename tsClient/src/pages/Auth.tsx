import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { getCarts, supabase } from "../http/requests";
import style from "./auth.module.css";
import { useContext } from "react";
import { Context } from "../main";
export default function AuthPage() {
  const location = useLocation().pathname;
  const isLoginPage = location === LOGIN_ROUTE;
  console.log(isLoginPage);
  const { map, user } = useContext(Context);
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async (e) => {
    if (e == "SIGNED_IN") {
      navigate("/");
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        user.role = data.session.user.role as
          | "ADMIN"
          | "authenticated"
          | ""
          | undefined;
        user.isAuth = true;
        getCarts(map);
      }
      console.log(e);
    }
  });
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <div className={style.auth}>
      <div style={{ maxWidth: "600px" }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Ваш email",
                password_label: "Ваш пароль",
                email_input_placeholder: "Ваш email",
                password_input_placeholder: "Ваш пароль",
                button_label: "Увійти",
                social_provider_text: "Sign in with",
                link_text: "Уже маєте аккаунт? Увійти",
              },
              sign_up: {
                email_label: "Ваш email",
                password_label: "Ваш пароль",
                email_input_placeholder: "Ваш email",
                password_input_placeholder: "Ваш пароль",
                button_label: "Зареєструватись",
                social_provider_text: "Sign in with",
                link_text: "Не маєте аккаунт? Зареєструватись",
              },

              magic_link: {
                email_input_label: "Ваш email",
                email_input_placeholder: "Ваш email",
                button_label: "Відправити email",
                link_text: "Send a magic link email",
              },
              forgotten_password: {
                email_label: "Ваш email",
                password_label: "Ваш пароль",
                email_input_placeholder: "Ваш email",
                button_label: "Надіслати новий пароль",
                link_text: "Забули пароль?",
              },
              update_password: {
                password_label: "Ваш новий пароль",
                password_input_placeholder: "Ваш новий пароль",
                button_label: "Оновити пароль",
              },
            },
          }}
        ></Auth>
        <p
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            textAlign: "center",
            color: "white",
            cursor: "pointer",
            backgroundColor: isHover ? "#4299E1" : "#63B3ED",
          }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => {
            navigate("/");
          }}
        >
          Зайти без реєсрації
        </p>
      </div>
    </div>
  );
}
