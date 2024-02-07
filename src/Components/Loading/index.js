import React from "react";
import "./WaveAnimation.css"; // Assuming the CSS is saved in WaveAnimation.css

const WaveAnimation = ({ show }) => {
  // Create an array with 10 elements for 10 waves
  const waves = Array.from({ length: 10 });

  return (
    <>
      {show ? (
        <div className="center">
          {waves.map((_, index) => (
            <div
              key={index}
              className="wave"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default WaveAnimation;
