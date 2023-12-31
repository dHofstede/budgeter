const findHeaderIndex = (csv) => {
  for (let index = 0; index < csv.length; index++) {
    // Some statements start with descriptions and non csv data. Right now I'm filtering by looking for a lack of a comma.
    // Not great, find a better way to filter out non csv data from the statement.
    if (csv[index].indexOf(",") > -1) {
      return index;
    }
  }
};

const parseDate = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return { year, month, day };
};

export const parseStatement = (csv) => {
  const lines = csv.split("\n");

  const result = {};
  let previousTransaction = {};

  const headerIndex = findHeaderIndex(lines);
  const headers = lines[headerIndex]
    .split(",")
    .map((header) => header.trim().replaceAll(" ", "_"));

  let uniqueId = 0;

  for (let i = headerIndex + 1; i < lines.length; i++) {
    if (lines[i].length > 0) {
      const obj = {};
      const currentline = lines[i].split(",");
      let date = {};

      for (let j = 0; j < headers.length; j++) {
        if (headers[j] === "Date_Posted") {
          date = parseDate(currentline[j]);
        }

        obj[headers[j]] = currentline[j].trim();
      }

      if (previousTransaction.Date_Posted === obj.Date_Posted) {
        uniqueId++;
      } else {
        uniqueId = 0;
      }

      previousTransaction = obj;

      if (!result[date.year]) {
        result[date.year] = {};
      }

      if (!result[date.year][date.month]) {
        result[date.year][date.month] = {};
      }

      obj.Order_of_Purchase = `${obj.Date_Posted}-${uniqueId}`;

      result[date.year][date.month][obj.Order_of_Purchase] = obj;
    }
  }

  return result;
};
