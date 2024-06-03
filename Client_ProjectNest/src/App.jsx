import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { UserProvider } from "./contexts/userContext";
import { SocketProvider } from "./contexts/socketContext";
import FindProject from "./components/student/FindProject";
import Feed from "./components/student/Feed";
import SuperFeed from "./components/supervisor/SuperFeed";
import Setting from "./components/student/Setting";
import AdminPage from "./pages/AdminPage";
import Settings from "./components/supervisor/Settings";
import FindProjects from "./components/supervisor/FindProjects";
import AdminProjectDetails from "./pages/AdminProjectDetails";
import Archieves from "./pages/AdminProjectArchieves";
import Deletedprojects from "./pages/AdminDeletedProjects";
import ProjectRequests from "./pages/AdminProjectRequests";
import FindPorjectProjectDetail from "./components/student/FindPorjectProjectDetail";
import ProjectPage from "./pages/ProjectPage";
import Profile from "./components/Profile";
import ProjectsPage from "./pages/ProjectsPage";

import Task from "./components/supervisor/Task";
import Logsheet from "./components/supervisor/Logsheet";
import GanttChart from "./components/supervisor/GanttChart";
import GroupChat from "./components/supervisor/GroupChat";
import Documents from "./components/supervisor/Documents";
import Members from "./components/supervisor/Members";

function App() {
  return (
    <>
      <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Navigate to="/login" replace />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route path="/app">
                <Route index element={<Navigate to="student" replace />} />
                <Route path="student" element={<StudentDashboard />}>
                  <Route index element={<Navigate to="home" replace />} />
                  <Route path="home" element={<Feed />} />
                  <Route path="findproject" element={<FindProject />}>
                    <Route path=":id" element={<FindPorjectProjectDetail />} />
                  </Route>
                  <Route path="settings" element={<Setting />} />
                </Route>
                <Route path="supervisor" element={<SupervisorDashboard />}>
                  <Route index element={<Navigate to="homesuper" replace />} />
                  <Route path="homesuper" element={<SuperFeed />} />
                  <Route path="findprojects" element={<FindProjects />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route
                  path="supervisor/projects/:projectId"
                  element={<ProjectsPage />}
                >
                  <Route path="tasks" element={<Task />} />
                  <Route path="member" element={<Members />} />
                  <Route path="logsheets" element={<Logsheet />} />
                  <Route path="gantts" element={<GanttChart />} />
                  <Route path="chats" element={<GroupChat />} />
                  <Route path="documents" element={<Documents />} />
                </Route>
                <Route path="admin" element={<AdminPage />}>
                  <Route
                    index
                    element={<Navigate to="projectrequests" replace />}
                  />

                  <Route path="projectrequests" element={<ProjectRequests />} />
                  <Route path="project">
                    <Route index element={<Navigate to="projectdetails" />} />
                    <Route
                      path="projectdetails"
                      element={<AdminProjectDetails />}
                    />

                    <Route
                      path="projectdetails/projectdetail/:projectID"
                      element={<ProjectPage />}
                    />
                  </Route>

                  <Route path="deletedprojects" element={<Deletedprojects />} />
                  <Route path="archives" element={<Archieves />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </UserProvider>
    </>
  );
}

export default App;
