import React, { useState } from "react";
import { Button, FileInput } from "@blueprintjs/core";
import { parseStatement } from "../../utils/parseStatement";
import { useDispatch } from "react-redux";
import { saveStatement, saveStatementToDB } from "../statement/statementSlice";

export function Upload() {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const [inputText, setInputText] = useState("Please upload your file");

  const readFile = async (e) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const statementJSON = parseStatement(e.target.result);
      dispatch(saveStatement(statementJSON));
    };

    fileReader.readAsText(e.target.files[0]);
  };

  function handleChange(event) {
    setFile(event);
    setHasFile(!!event.target.files[0]?.name);
    setInputText(event.target.files[0]?.name);
  }

  return (
    <div>
      <form>
        <h1>Upload Bank Statement</h1>
        <FileInput
          text={inputText}
          buttonText={"Browse"}
          onChange={handleChange}
          hasSelection={hasFile}
          large={true}
        />
        <Button
          intent="success"
          text="Upload"
          onClick={() => readFile(file)}
          large={true}
          rightIcon={"upload"}
          disabled={!hasFile}
        />
      </form>
    </div>
  );
}
