import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentHome from "./pages/StudentHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="app" element={<StudentHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
