import React, { useState, useRef } from "react";

const ShinyInput = ({
  className = "",
  icon,
  placeholder,
  type,
  name,
  required,
  borderHoverAnimation = "1px solid var(--primary-color)",
  focus = "focus:border-[var(--primary-color)]",
}) => {
  const divRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  // No framer-motion for browser, fallback to simple input
  return (
    <div className={"relative z-40 " + className}>
      <input
        onFocus={() => setOpacity(1)}
        onBlur={() => setOpacity(0)}
        autoComplete="off"
        placeholder={placeholder}
        type={type}
        name={name}
        required={required}
        className={
          "h-12 w-full cursor-pointer rounded-md border border-[var(--glass-color)] bg-[var(--glass-color)] p-3.5 text-[var(--black-color)] dark:text-[var(--white-color)] transition-colors duration-500 placeholder:select-none placeholder:text-[var(--placeholder-color)] " +
          focus +
          " focus:outline-none"
        }
      />
      {icon}
    </div>
  );
};

export default ShinyInput;
