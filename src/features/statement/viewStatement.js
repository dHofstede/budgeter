import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectStatement } from "../statement/statementSlice";
import { Cell, Column, ColumnHeaderCell, Table2 } from "@blueprintjs/table";
import { HotkeysProvider, Classes, Button } from "@blueprintjs/core";

export function ViewStatement() {
  const statement = useSelector(selectStatement);

  const [transactionData, setTransactionData] = useState({});
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const setInitialDate = (data) => {
    let year, month;
    if (!year) {
      const availableYears = Object.keys(data);
      year = Math.max(...availableYears);
    }

    if (!month) {
      const availableMonths = Object.keys(data[year]);
      month = Math.max(...availableMonths);
    }

    setMonth(month);
    setYear(year);
  };

  useEffect(() => {
    if (!month && !year) {
      setInitialDate(statement);
    }
    if (year && month) {
      setTransactionData(statement[year][month]);
    }
  }, [month, year, statement]);

  const bankCardCellRenderer = (rowIndex) => {
    const key = Object.keys(transactionData)[rowIndex];
    const data = transactionData[key];

    return <Cell>{data.First_Bank_Card}</Cell>;
  };

  const dateCellRenderer = (rowIndex) => {
    const key = Object.keys(transactionData)[rowIndex];
    const data = transactionData[key];

    return <Cell>{data.Date_Posted}</Cell>;
  };

  const descriptionCellRenderer = (rowIndex) => {
    const key = Object.keys(transactionData)[rowIndex];
    const data = transactionData[key];

    return <Cell>{data.Description}</Cell>;
  };

  const transactionTypeCellRenderer = (rowIndex) => {
    const key = Object.keys(transactionData)[rowIndex];
    const data = transactionData[key];

    return <Cell>{data.Transaction_Type}</Cell>;
  };

  const amountCellRenderer = (rowIndex) => {
    const key = Object.keys(transactionData)[rowIndex];
    const data = transactionData[key];

    return <Cell>{data.Transaction_Amount}</Cell>;
  };

  const renderName = (name) => {
    return (
      <div style={{ lineHeight: "24px" }}>
        <div className={Classes.TEXT_LARGE}>
          <strong>{name}</strong>
        </div>
      </div>
    );
  };

  const renderColumnHeader = (index) => {
    const name = ["Bank Card", "Date", "Description", "Type", "Amount"][index];

    return (
      <ColumnHeaderCell name={name} index={index} nameRenderer={renderName} />
    );
  };

  return (
    <>
      <p>
        {month} - {year}
      </p>

      <Button
        intent="success"
        text="Decrease Month"
        onClick={() => setMonth(month - 1)}
        large={true}
        rightIcon={"add"}
      />
      <Button
        intent="success"
        text="Increase Month"
        onClick={() => setMonth(month + 1)}
        large={true}
        rightIcon={"add"}
      />
      <HotkeysProvider>
        <Table2
          numRows={transactionData && Object.keys(transactionData).length}
          // enableGhostCells={true}
          // enableFocusedCell={true}
        >
          <Column
            cellRenderer={bankCardCellRenderer}
            columnHeaderCellRenderer={renderColumnHeader}
          />
          <Column
            cellRenderer={dateCellRenderer}
            columnHeaderCellRenderer={renderColumnHeader}
          />
          <Column
            cellRenderer={descriptionCellRenderer}
            columnHeaderCellRenderer={renderColumnHeader}
          />
          <Column
            cellRenderer={transactionTypeCellRenderer}
            columnHeaderCellRenderer={renderColumnHeader}
          />
          <Column
            cellRenderer={amountCellRenderer}
            columnHeaderCellRenderer={renderColumnHeader}
          />
        </Table2>
      </HotkeysProvider>
    </>
  );
}
