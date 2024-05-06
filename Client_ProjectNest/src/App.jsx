import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { UserProvider } from "./contexts/userContext";

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
              <Route path="student" element={<StudentDashboard />} />
              <Route path="supervisor" element={<SupervisorDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
