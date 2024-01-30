import { useState } from "react";
import "./styles.css";
import { formatDateFromString } from "./utils/dateValidationsAndConversions.util";

export default function App() {
  const dateFormatList = [
    "DD.MM.YYYY",
    "DD/MM/YYYY",
    "DD-MM-YYYY",
    "YYYY.MM.DD",
    "YYYY/MM/DD",
    "YYYY-MM-DD",
  ];
  const [dateInput, setDateInput] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("DD.MM.YYYY");
  const [formattedDate, setFormattedDate] = useState("");
  const [error, setError] = useState("");

  const hundleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      const formattedDate = formatDateFromString(dateInput, selectedFormat);
      setFormattedDate(formattedDate);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Convert dates</h1>
      <h3>Convert a date string in any valid format to any selected format.</h3>

      <form className="form" onSubmit={hundleSubmit}>
        <label>
          Enter date: &nbsp;
          <input
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            required
          />
        </label>
        <label>
          Convert to: &nbsp;
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
          >
            {dateFormatList.map(function (item, index) {
              return (
                <>
                  <option key={index} value={item}>
                    {item}
                  </option>
                </>
              );
            })}
          </select>
        </label>
        <button style={{ width: "5rem" }} type="submit">
          Convert
        </button>

        {formattedDate && <label>Output: &nbsp; {formattedDate}</label>}
      </form>

      {error && (
        <label style={{ fontSize: "small", color: "red", marginTop: "3rem" }}>
          {error}
        </label>
      )}
    </div>
  );
}
