import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../App";
import style from "./auth.module.css";
import { useContext } from "react";
import { Context } from "..";
export default function AuthPage() {
  const location = useLocation().pathname;
  const isLoginPage = location === LOGIN_ROUTE;
  console.log(isLoginPage);
  const { user } = useContext(Context);
  const navigate = useNavigate();
  supabase.auth.onAuthStateChange(async (e) => {
    if (e == "SIGNED_IN") {
      navigate("/");
      user.setIsAuth(true);
    }
    console.log(e);
  });
  return (
    <div className={style.auth}>
      <div style={{ width: "30%" }}>
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
      </div>
    </div>
    // <Container
    //   className="d-flex justify-content-center align-items-center"
    //   style={{ height: window.innerHeight - 54 }}
    // >
    //   <Card style={{ width: "600px" }} className="p-5">
    //     <h2 className="ml-auto">{isLoginPage ? "Авторизація" : "Регістрація"}</h2>
    //     <Form className="d-flex flex-column">
    //       <Form.Control
    //         className="mt-3"
    //         placeholder="Введіть email"
    //       ></Form.Control>
    //       <Form.Control
    //         className="mt-3"
    //         placeholder="Введіть пароль"
    //         type="password"
    //       ></Form.Control>
    //       <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
    //         {isLoginPage ? (
    //           <div style={{ width: "fit-content" }}>
    //             Немаєте акаунту?{" "}
    //             <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь</NavLink>
    //           </div>
    //         ) : (
    //           <div style={{ width: "fit-content" }}>
    //             Маєте акаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть</NavLink>
    //           </div>
    //         )}
    //         <Button
    //           style={{ width: "fit-content" }}
    //           variant={"outline-success"}
    //           className=" align-self-end"
    //         >
    //           {isLoginPage ? "Увійти" : "Зареєструватись"}
    //         </Button>
    //       </Row>
    //     </Form>
    //   </Card>
    // </Container>
  );
}
