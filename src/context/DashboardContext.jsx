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

  // Visitors
  const visitors = JSON.parse(
    localStorage.getItem("visitors") ||
      "[]"
  );

  // Departments
  const departments = JSON.parse(
    localStorage.getItem("departments") ||
      "[]"
  );

  // Attendance
  const attendanceRecords =
    JSON.parse(
      localStorage.getItem(
        "attendanceRecords"
      ) || "[]"
    );

  // Total Attendance
  const totalAttendance =
    attendanceRecords.reduce(
      (sum, record) =>
        sum + (record.total || 0),
      0
    );

  // Highest Attendance
  const highestAttendance =
    attendanceRecords.length > 0
      ? Math.max(
          ...attendanceRecords.map(
            (record) =>
              record.total || 0
          )
        )
      : 0;

  // Average Attendance
  const averageAttendance =
    attendanceRecords.length > 0
      ? Math.round(
          totalAttendance /
            attendanceRecords.length
        )
      : 0;

  // Adults Attendance
  const adultsAttendance =
    attendanceRecords.reduce(
      (sum, record) =>
        sum + (record.adults || 0),
      0
    );

  // Teens Attendance
  const teensAttendance =
    attendanceRecords.reduce(
      (sum, record) =>
        sum + (record.teens || 0),
      0
    );

  // Children Attendance
  const childrenAttendance =
    attendanceRecords.reduce(
      (sum, record) =>
        sum +
        (record.children || 0),
      0
    );

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

    totalTithe: 0,

    totalOffering: 0,
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