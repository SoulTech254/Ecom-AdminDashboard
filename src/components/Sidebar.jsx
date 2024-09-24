// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/quickmart.png";
import {
  Home,
  Users,
  Box,
  Truck,
  Grid,
  Settings,
  FileText,
} from "lucide-react"; // Import desired icons

const Sidebar = () => {
  return (
    <div className="w-52 h-screen bg-white border br-2 pt-4">
      <img src={logo} alt="Logo" />
      <ul className="mt-2">
        <li className="py-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Home className="mr-2" /> {/* Add icon here */}
            Dashboard
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Users className="mr-2" />
            Users
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Box className="mr-2" />
            Products
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/logistics"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Truck className="mr-2" />
            Logistics
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Grid className="mr-2" />
            Categories
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <Settings className="mr-2" />
            Settings
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center block w-full text-left cursor-pointer text-primary ${
                isActive
                  ? "bg-primary bg-opacity-30 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-30 py-2 px-4`
            }
          >
            <FileText className="mr-2" />
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
