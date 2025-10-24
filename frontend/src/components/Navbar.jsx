import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import CustomButton from "./CustomButton";
const Navbar = () => {
  const router = useLocation();
  const navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="shadow-md px-6 py-4 mb-6 bg-white">
      <div className="max-w-7xl flex justify-between items-center mx-auto">
        <div className="flex items-center gap-4">
          <p
            className="font-bold text-2xl text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Campus360
          </p>
          <span className="text-gray-400">|</span>
          <p className="font-semibold text-xl text-gray-700 flex items-center">
            <span className="mr-2">
              <RxDashboard />
            </span>
            {router.state && router.state.type} Dashboard
          </p>
        </div>
        <CustomButton variant="danger" onClick={logouthandler}>
          Logout
          <span className="ml-2">
            <FiLogOut />
          </span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Navbar;
