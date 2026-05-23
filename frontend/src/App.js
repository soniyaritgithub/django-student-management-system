import {

  BrowserRouter,

  Routes,

  Route,

} from "react-router-dom";

import Login from "./components/Login";

import Signup from "./components/Signup";

import Dashboard from "./components/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}

        <Route

          path="/"

          element={<Login />}

        />

        {/* Signup Page */}

        <Route

          path="/signup"

          element={<Signup />}

        />

        {/* Dashboard Page */}

        <Route

          path="/dashboard"

          element={<Dashboard />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;