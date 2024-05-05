import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<p>Login</p>} />
        </Route>
        <Route path="app" element={<p>App is great</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
