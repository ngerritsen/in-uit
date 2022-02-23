import React from "react";
import Sheet from "./Sheet";
import { Responsible } from "../constants";
import Logout from "./Logout";

const MainView = () => (
  <div>
    <Sheet responsible={Responsible.Man} title="Niels" />
    <Sheet responsible={Responsible.Woman} title="Peggy" />
    <Sheet responsible={Responsible.Shared} title="Gezamelijk" />
    <Logout />
  </div>
);

export default MainView;
