import React, { useState, useEffect } from "react";
import "./robot.scss";

const Wave = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [minMonth, setMinMonth] = useState("");
  const [maxMonth, setMaxMonth] = useState("");
  const [resData, setResData] = useState("");
  const [month, setMonth] = useState("");
  const [category, setCategory] = useState("");
  const [ani, setAni] = useState(false);

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
  const [loading, setLoading] = useState(false);

  const sendQuery = async () => {
    setLoading(true);
    setIsAnimating(true);
    if (!month) {
      alert("Please select a month for prediction.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/predict_expense/", {
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
      if (category && month) {
        setAni(true);
      } else setAni(false);
    }
  });

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
    <div>
      <div className="query-div">
        <div className="chat-box">
          <div className="data-box">
            {resData ? (
              <span>{resData?.generated_text}</span>
            ) : (
              <div
                className={`robot-container ${
                  isAnimating ? "start-animation" : ""
                }`}
              >
                <div className="universe">
                  {isAnimating && !loading && !ani && (
                    <span className="cooking">Something is cooking...</span>
                  )}
                  {loading && (
                    <span className="cooking1">Building your response...</span>
                  )}
                  {!loading && !isAnimating && !category && !month && (
                    <span className="cooking">
                      Am here to help you happily.
                    </span>
                  )}
                  {((!isAnimating && category) || (!isAnimating && month)) && (
                    <span className="cooking2">
                      Interesting you are adding.
                    </span>
                  )}
                  {ani && !loading && (
                    <span className="cooking3">Waiting you to hit Go</span>
                  )}
                  <div className="tattoine">
                    <div className="bb-8">
                      <div
                        className={`head ${
                          isAnimating ? "head-animation" : ""
                        }`}
                      >
                        <div className="eye"></div>
                      </div>
                      <div
                        className={`ball ${
                          isAnimating ? "ball-animation" : ""
                        }`}
                      >
                        <div className="connect one"></div>
                        <div className="connect two"></div>
                        <div className="connect three"></div>
                        <div className="ball__inner one">
                          <div className="inside"></div>
                        </div>
                        <div className="ball__inner two">
                          <div className="inside"></div>
                        </div>
                        <div className="ball__inner three">
                          <div className="inside"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bb-8--shadow"></div>
                    <div className="bb-8--shadow--2"></div>
                    <div className="land"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <form className="form-box" onBlur={stopAnimation}>
            <span>Select category and future date before proceeding* </span>
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
              <option value="All">All</option>
            </select>
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
      <div className="ocean">
        <div className="wave1"></div>
        <div className="wave1"></div>
      </div>
      <div className="wave2"></div>
      <div className="bubble bubble1"></div>
      <div className="bubble bubble2"></div>
      <div className="bubble bubble3"></div>
      <div className="bubble bubble4"></div>
      <div className="bubble bubble5"></div>
      <div className="bubble bubble5"></div>
    </div>
  );
};

export default Wave;
