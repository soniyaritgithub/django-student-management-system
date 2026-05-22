import { useState } from "react";

import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://127.0.0.1:8000/api/token/",

        {

          username,

          password,

        }

      );

      // Save JWT Tokens

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      alert("✅ Login Successful");

      window.location.href = "/dashboard";

    } catch (error) {

      alert("❌ Invalid Username or Password");

      console.log(error);

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">

              🔐 JWT Login

            </h2>

            <form onSubmit={handleLogin}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Username"
                onChange={(e) =>
                  setUsername(e.target.value)
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;