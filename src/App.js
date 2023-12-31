import React from "react";
// import { Layout } from "./layout/Layout";
import { Counter } from "./features/counter/Counter";
import { Upload } from "./features/statement/Upload";
import { ViewStatement } from "./features/statement/viewStatement";
import { Budget } from "./features/budget/Budget";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/table/lib/css/table.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Budgeter</Navbar.Heading>
          <Navbar.Divider />
          <Button
            className="bp5-minimal"
            icon="home"
            text="Home"
            onClick={() => navigate(`/`)}
          />
          <Button
            className="bp5-minimal"
            icon="upload"
            text="Upload Statement"
            onClick={() => navigate(`/upload`)}
          />
          <Button
            className="bp5-minimal"
            icon="panel-table"
            text="View Statement"
            onClick={() => navigate(`/viewStatement`)}
          />
          <Button
            className="bp5-minimal"
            icon="chart"
            text="Budget"
            onClick={() => navigate(`/budget`)}
          />
        </Navbar.Group>
      </Navbar>
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Counter />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/viewStatement" element={<ViewStatement />} />
          <Route exact path="/budget" element={<Budget />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
