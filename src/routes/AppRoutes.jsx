import Announcements from "../pages/Announcements";
import MemberProfile from "../pages/MemberProfile";

import Sermons from "../pages/Sermons";
import Birthdays from "../pages/Birthdays";
import FollowUps from "../pages/FollowUps";
import SMS from "../pages/SMS";
import EmailCenter from "../pages/EmailCenter";
import VolunteerManagement from "../pages/VolunteerManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Members from "../pages/Members";
import Visitors from "../pages/Visitors";
import Groups from "../pages/Groups";
import Departments from "../pages/Departments";
import Attendance from "../pages/Attendance";
import Finance from "../pages/Finance";
import Reports from "../pages/Reports";
import PrayerRequests from "../pages/PrayerRequests";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Events from "../pages/Events";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visitors"
          element={
            <ProtectedRoute>
              <Visitors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prayers"
          element={
            <ProtectedRoute>
              <PrayerRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/announcements"
  element={
    <ProtectedRoute>
      <Announcements />
    </ProtectedRoute>
  }
/>
<Route
  path="/sermons"
  element={
    <ProtectedRoute>
      <Sermons />
    </ProtectedRoute>
  }
/>

<Route
  path="/birthdays"
  element={
    <ProtectedRoute>
      <Birthdays />
    </ProtectedRoute>
  }
/>

<Route
  path="/followups"
  element={
    <ProtectedRoute>
      <FollowUps />
    </ProtectedRoute>
  }
/>

<Route
  path="/sms"
  element={
    <ProtectedRoute>
      <SMS />
    </ProtectedRoute>
  }
/>

<Route
  path="/email"
  element={
    <ProtectedRoute>
      <EmailCenter />
    </ProtectedRoute>
  }
/>

<Route
  path="/volunteers"
  element={
    <ProtectedRoute>
      <VolunteerManagement />
    </ProtectedRoute>
  }
/>

<Route
  path="/announcements"
  element={
    <ProtectedRoute>
      <Announcements />
    </ProtectedRoute>
  }
/>

<Route
  path="/member-profile"
  element={
    <ProtectedRoute>
      <MemberProfile />
    </ProtectedRoute>
  }
/>

<Route
  path="/member-profile"
  element={
    <ProtectedRoute>
      <MemberProfile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;