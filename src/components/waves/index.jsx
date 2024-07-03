import React from "react";
import "./robot.scss";
import FormComponent from "../form";

const Wave = () => {

  return (
    <div>
      <FormComponent/>
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
