import React, { useState, useEffect } from "react";
import "../waves/robot.scss";
import Robot from "../robot";

const FormComponent = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [minMonth, setMinMonth] = useState("");
  const [maxMonth, setMaxMonth] = useState("");
  const [resData, setResData] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [ani, setAni] = useState(false);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("");

  useEffect(() => {
    const today = new Date();
    // Get the current month in YYYY-MM format
    const currentMonth = today.toISOString().slice(0, 7);
    // Calculate the month two years from now in YYYY-MM format
    const futureDate = new Date(today.setFullYear(today.getFullYear() + 2));
    const futureMonth = futureDate.toISOString().slice(0, 7);
    setMinMonth(currentMonth);
    setMaxMonth(futureMonth);
  }, []);

  const handleInputChange = (e) => {
    setMonth(e.target.value);
    setAni(false);
    setIsAnimating(false); // Reset animation state on input change
  };

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
    setAni(false);
    setIsAnimating(false); // Reset animation state on select change
  };

  const handleModelchange = (e) => {
    setModel(e.target.value);
  };

  const sendQuery = async () => {
    setLoading(true);
    setIsAnimating(true);
    if (!month) {
      alert("Please select a month for prediction.");
      animatonFuntion()
      return;
    }
    if (!category) {
      alert("Please select a category for prediction.");
      animatonFuntion()
      return;
    }
    if (!model) {
      alert("Please select a Model for prediction.");
      animatonFuntion()
      return;
    }
    if (model === "Scikit") {
      handleScikit();
    } else {
      handleOpenAi();
    }
  };

  const handleOpenAi = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          month: month.split("-")[1],
          year: month.split("-")[0],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        const data1 = toLowerCaseKeys(data);
        setLoading(false);
        if (data1) {
          setResData(data1);
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleScikit = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SCIKIT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: category,
            month: month.split("-")[1],
            year: month.split("-")[0],
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        const data1 = toLowerCaseKeys(data);
        setLoading(false);
        if (data1) {
          setResData(data1);
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  // Function to convert object keys to lowercase
  const toLowerCaseKeys = (obj) => {
    if (typeof obj === "string") {
      return obj.toLowerCase();
    } else if (Array.isArray(obj)) {
      return obj.map(toLowerCaseKeys);
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = toLowerCaseKeys(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  };

  const startAnimation = () => {
    setResData("");
    setIsAnimating(true);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    if (category || month) {
      setIsAnimating(true);
      if (category && month && model) {
        setAni(true);
      } else setAni(false);
    }
  });


  const animatonFuntion=()=>{
    setIsAnimating(false);
    setLoading(false);
  }

  const resetAll = async () => {
    setIsAnimating(false);
    setMinMonth("");
    setResData("");
    setMonth("");
    setCategory("");
    setAni(false);
    setLoading(false);
  };

  return (
    <div className="query-div">
      <div className="chat-box">
        <div className="data-box">
          <div>
            {resData && (
              <div>
                {" "}
                <span>
                  You entered:
                  <br />
                  {category} as category.
                  <br />
                  {month} as your Future Date for prediction.
                </span>
                <br />
                <br />
                {resData && model !== "Scikit" && (
                  <span className="head1">So your expense prediction for </span>
                )}
              </div>
            )}
            {resData ? (
              <span className="head1">{resData?.generated_text}</span>
            ) : (
              <Robot
                isAnimating={isAnimating}
                model={model}
                loading={loading}
                category={category}
                month={month}
                ani={ani}
              />
            )}
          </div>
        </div>
        <form className="form-box" onBlur={stopAnimation}>
          <span>
            Select future date, category and Model before proceeding*{" "}
          </span>
          <input
            type="month"
            name="month"
            value={month}
            min={minMonth}
            max={maxMonth}
            placeholder="Select the month for prediction"
            onChange={handleInputChange}
            onClick={startAnimation}
          />
          <div className="select-wrapper">
            <div className="select-options">
              <p>Select Model</p>
              <select
                name="model"
                value={model}
                onBlur={stopAnimation}
                onFocus={startAnimation}
                onChange={handleModelchange}
              >
                <option value={""} disabled>
                  --Select a Model--
                </option>
                <option value="openAi">OpenAi</option>
                <option value="Scikit">Scikit</option>
              </select>
            </div>
            <div className="select-options">
              <p>Select Category*</p>
              <select
                name="category"
                value={category}
                onBlur={stopAnimation}
                onFocus={startAnimation}
                onChange={handleSelectChange}
              >
                <option value={""} disabled>
                  --Select Category--
                </option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Payroll">Payroll</option>
                <option value="Inventory">Inventory</option>
                <option value="Marketing">Marketing</option>
                {model === "openAi" && <option value="All">All</option>}
              </select>
            </div>
          </div>
          <div className="btn-holder">
            <button type="button" className="reset" onClick={resetAll}>
              Reset
            </button>
            <button type="button" className="go" onClick={sendQuery}>
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
