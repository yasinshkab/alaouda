import React, { useState, useRef } from "react";

const ShinyTextArea = ({
  className = "",
  icon,
  placeholder,
  name,
  rows = 4,
  required,
  borderHoverAnimation = "1px solid var(--primary-color)",
  focus = "focus:border-[var(--primary-color)]",
}) => {
  const divRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  // No framer-motion for browser, fallback to simple textarea
  return (
    <div className={"relative z-40 " + className}>
      <textarea
        onFocus={() => setOpacity(1)}
        onBlur={() => setOpacity(0)}
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        rows={rows}
        required={required}
        className={
          "w-full cursor-pointer h-36 rounded-md border border-[var(--glass-color)] bg-[var(--glass-color)] p-3.5 text-[var(--black-color)] dark:text-[var(--white-color)] transition-colors duration-500 placeholder:select-none placeholder:text-[var(--placeholder-color)] " +
          focus +
          " focus:outline-none resize-none"
        }
      />
      {icon}
    </div>
  );
};

export default ShinyTextArea;
