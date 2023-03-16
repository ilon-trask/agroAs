import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";
import MainPage from "./MainPage";
import MapJornal from "./MapJornal";

function StartPage() {
  const { user } = useContext(Context);
  const role = user.role;

  return <div>{user.role == "" ? <MainPage /> : <MapJornal />}</div>;
}

export default observer(StartPage);
