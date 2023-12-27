import React from "react";
import { FaRegEye } from "react-icons/fa";
import "./avatar.css";
import { useNavigate } from "react-router-dom";
function Avatar({ icon, onClick }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/profile")}
      className="image-container relative inline-block duration-300 h-10 w-10">
      <img
        onClick={onClick}
        src={icon}
        className="avatar h-10 w-10 rounded-full cursor-pointer"
      />
      <div className="hover-icon" onClick={onClick}>
        <FaRegEye className="text-xl" />
      </div>
    </div>
  );
}
export default Avatar;
