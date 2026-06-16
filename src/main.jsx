import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AuthProvider from "./context/AuthContext.jsx";
import MemberProvider from "./context/MemberContext.jsx";
import DashboardProvider from "./context/DashboardContext.jsx";
import AttendanceProvider from "./context/AttendanceContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MemberProvider>
        <AttendanceProvider>
          <DashboardProvider>
            <App />
          </DashboardProvider>
        </AttendanceProvider>
      </MemberProvider>
    </AuthProvider>
  </React.StrictMode>
);