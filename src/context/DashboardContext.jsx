import {
  createContext,
  useContext,
} from "react";

import { MemberContext } from "./MemberContext";

export const DashboardContext =
  createContext();

function DashboardProvider({ children }) {
  const { members } =
    useContext(MemberContext);

  const stats = {
    totalMembers: members.length,
    totalVisitors: 0,
    totalGroups: 0,
    totalAttendance: 0,
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