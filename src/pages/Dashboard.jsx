import {
  createContext,
  useContext,
} from "react";

import { MemberContext } from "./MemberContext";

export const DashboardContext =
  createContext();

function DashboardProvider({
  children,
}) {
  const { members } =
    useContext(MemberContext);

  const visitors = JSON.parse(
    localStorage.getItem("visitors") ||
      "[]"
  );

  const departments =
    JSON.parse(
      localStorage.getItem(
        "departments"
      ) || "[]"
    );

  const attendanceRecords =
    JSON.parse(
      localStorage.getItem(
        "attendanceRecords"
      ) || "[]"
    );

  const financeRecords =
    JSON.parse(
      localStorage.getItem(
        "financeRecords"
      ) || "[]"
    );

  const totalAttendance =
    attendanceRecords.reduce(
      (sum, record) =>
        sum + (record.total || 0),
      0
    );

  const highestAttendance =
    attendanceRecords.length > 0
      ? Math.max(
          ...attendanceRecords.map(
            (r) => r.total || 0
          )
        )
      : 0;

  const averageAttendance =
    attendanceRecords.length > 0
      ? Math.round(
          totalAttendance /
            attendanceRecords.length
        )
      : 0;

  const adultsAttendance =
    attendanceRecords.reduce(
      (sum, r) =>
        sum + (r.adults || 0),
      0
    );

  const teensAttendance =
    attendanceRecords.reduce(
      (sum, r) =>
        sum + (r.teens || 0),
      0
    );

  const childrenAttendance =
    attendanceRecords.reduce(
      (sum, r) =>
        sum +
        (r.children || 0),
      0
    );

  const totalTithe =
    financeRecords
      .filter(
        (r) =>
          r.type === "Tithe"
      )
      .reduce(
        (sum, r) =>
          sum +
          Number(r.amount),
        0
      );

  const totalOffering =
    financeRecords
      .filter(
        (r) =>
          r.type ===
          "Offering"
      )
      .reduce(
        (sum, r) =>
          sum +
          Number(r.amount),
        0
      );

  const totalIncome =
    totalTithe +
    totalOffering;

  const stats = {
    totalMembers:
      members?.length || 0,

    totalVisitors:
      visitors.length || 0,

    totalDepartments:
      departments.length || 0,

    totalAttendance,

    highestAttendance,

    averageAttendance,

    adultsAttendance,

    teensAttendance,

    childrenAttendance,

    totalTithe,

    totalOffering,

    totalIncome,
  };

  return (
    <DashboardContext.Provider
      value={{ stats }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;