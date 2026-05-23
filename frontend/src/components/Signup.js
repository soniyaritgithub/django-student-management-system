import { useState } from "react";

import axios from "axios";

const API =
"https://django-student-management-system-r6hl.onrender.com";

function Signup() {

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        `${API}/signup/`,

        {

          username,

          email,

          password,

        }

      );

      alert("✅ Account Created Successfully");

      window.location.href = "/";

    }

    catch (error) {

      console.log(error.response);

      alert(

        error.response?.data?.error ||

        JSON.stringify(error.response?.data) ||

        "❌ Error Creating Account"

      );

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">

              📝 Create Account

            </h2>

            <form onSubmit={handleSignup}>

              <input

                type="text"

                className="form-control mb-3"

                placeholder="Username"

                onChange={(e) =>

                  setUsername(e.target.value)

                }

              />

              <input

                type="email"

                className="form-control mb-3"

                placeholder="Email"

                onChange={(e) =>

                  setEmail(e.target.value)

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

                className="btn btn-success w-100"

              >

                Create Account

              </button>

            </form>

            <p className="text-center mt-3">

              Already have an account?

              <a href="/" className="ms-2">

                Login

              </a>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Signup;