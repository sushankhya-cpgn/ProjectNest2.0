import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/app">
          <Route index element={<StudentDashboard />} />
          <Route path="supervisor" element={<SupervisorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
