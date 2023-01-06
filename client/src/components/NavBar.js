import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Context } from "..";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, MAP_ROUTE } from "../utils/consts";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link style={{ color: "white", textDecoration: "none" }} to={MAP_ROUTE}>
          калькулятор
        </Link>
        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button variant={"outline-light"} to="#home">
              Адмін панель
            </Button>
            <Link to={MAP_ROUTE}>
              <Button
                variant={"outline-light"}
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  user.setIsAuth(false);
                }}
                to="#features"
              >
                Вийти
              </Button>
            </Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Link to={LOGIN_ROUTE}>
              <Button
                variant={"outline-light"}
                onClick={() => {
                  user.setIsAuth(true);
                }}
              >
                Авторизуватись
              </Button>
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
export default NavBar;
