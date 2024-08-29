import { useState } from "react";
import "./App.css";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const nextColorClass =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const nextColorTitleCase = kebabCaseToTitleCase(nextColorClass);
  const [isDisable, setIsDisable] = useState(false);
  const checkboxClickHandler = () => {
    setIsDisable(!isDisable);
  };

  return (
    <div>
      <button
        className={isDisable ? "gray" : buttonColor}
        onClick={() => setButtonColor(nextColorClass)}
        disabled={isDisable}
      >
        Change to {nextColorTitleCase}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onClick={checkboxClickHandler}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
