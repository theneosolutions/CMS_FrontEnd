import React from "react";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        {children}
      </span>
      {showTooltip && (
        <div className="bg-black text-white text-xs rounded p-2 absolute bottom-full left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
