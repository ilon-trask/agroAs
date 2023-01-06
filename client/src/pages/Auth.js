import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
export default function Auth() {
  const location = useLocation().pathname;
  const isLogin = location === LOGIN_ROUTE;
  console.log(isLogin);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="ml-auto">{isLogin ? "Авторизація" : "Регістрація"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введіть email"
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="Введіть пароль"
            type="password"
          ></Form.Control>
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div style={{ width: "fit-content" }}>
                Немаєте акаунту?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь</NavLink>
              </div>
            ) : (
              <div style={{ width: "fit-content" }}>
                Маєте акаунт? <NavLink to={LOGIN_ROUTE}>Увійдіть</NavLink>
              </div>
            )}
            <Button
              style={{ width: "fit-content" }}
              variant={"outline-success"}
              className=" align-self-end"
            >
              {isLogin ? "Увійти" : "Зареєструватись"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
