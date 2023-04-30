import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./component/Loginpage";

import Home from "./component/Transactions";

import ProtectionPage from "./component//Protectionpage";
import Register from "./component/Register";

// Replace your code here
const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route element={<ProtectionPage />}>
          <Route exact element={<Home />} path="/" />
          <Route exact element={<Register />} path="/register" />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
