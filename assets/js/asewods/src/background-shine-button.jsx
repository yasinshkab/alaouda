import React from "react";

const BackgroundShineButton = ({ children, ...props }) => (
  <button className="shine-button" {...props}>
    {children}
  </button>
);

export default BackgroundShineButton;
