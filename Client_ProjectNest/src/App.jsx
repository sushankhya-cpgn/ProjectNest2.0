import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { UserProvider } from "./contexts/userContext";
import FindProject from "./components/student/FindProject";
import Feed from "./components/student/Feed";
import Setting from "./components/student/Setting";
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<LoginPage />} />
            </Route>

            <Route path="/app">
              <Route index element={<Navigate to="student" replace />} />
              <Route path="student" element={<StudentDashboard />}>
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<Feed />} />
                <Route path="findproject" element={<FindProject />} />
                <Route path="settings" element={<Setting />} />
              </Route>
              <Route path="supervisor" element={<SupervisorDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
