

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/PeotectedRoutes";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
function App() {
  

  return (

      <Routes>
        <Route element={<ProtectedRoute shouldAuth={true} />}>
          <Route path="/"  element={<Home/>} />
        </Route>
        <Route element={<ProtectedRoute shouldAuth={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
  
  );
}
 

export default App;
