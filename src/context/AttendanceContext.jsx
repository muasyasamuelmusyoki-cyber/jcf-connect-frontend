import { createContext, useState, useEffect } from "react";

export const AttendanceContext = createContext();

function AttendanceProvider({ children }) {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  const addAttendance = (record) => {
    setAttendance([
      ...attendance,
      {
        id: Date.now(),
        ...record,
      },
    ]);
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        addAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceProvider;