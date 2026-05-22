import {

  FaUserGraduate,

  FaMoon,

  FaUsers,

  FaBook,

} from "react-icons/fa";

import { useEffect, useState } from "react";

import axios from "axios";

function Dashboard() {

  // JWT Token

  const token = localStorage.getItem("access");

  // Students Data

  const [students, setStudents] = useState([]);

  // Dark Mode

  const [darkMode, setDarkMode] = useState(false);

  // Add Student Form

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [course, setCourse] = useState("");

  // Search

  const [search, setSearch] = useState("");

  // Edit Student

  const [editId, setEditId] = useState(null);

  const [editName, setEditName] = useState("");

  const [editEmail, setEditEmail] = useState("");

  const [editCourse, setEditCourse] = useState("");

  // Fetch Students

  useEffect(() => {

    if (!token) {

      window.location.href = "/";

    }

    axios
      .get("http://127.0.0.1:8000/api/")
      .then((response) => {

        setStudents(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, [token]);

  // Add Student

  const addStudent = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://127.0.0.1:8000/api/",

        {

          name,
          email,
          course,

        }

      );

      alert("✅ Student Added Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("❌ Error Adding Student");

    }

  };

  // Edit Student

  const editStudent = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

        `http://127.0.0.1:8000/api/${editId}/`,

        {

          name: editName,
          email: editEmail,
          course: editCourse,

        }

      );

      alert("✅ Student Updated Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("❌ Error Updating Student");

    }

  };

  // Delete Student

  const deleteStudent = async (id) => {

    try {

      await axios.delete(

        `http://127.0.0.1:8000/api/${id}/`

      );

      alert("✅ Student Deleted Successfully");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("❌ Error Deleting Student");

    }

  };

  // Logout

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div
      className={
        darkMode
          ? "bg-dark text-white min-vh-100"
          : "bg-light min-vh-100"
      }
    >

      {/* Navbar */}

      <nav className="navbar navbar-dark bg-dark px-4">

        <h3 className="text-white">

          🎓 Student Dashboard

        </h3>

        <div>

          <button
            className="btn btn-warning me-2"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            <FaMoon />
          </button>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>

      <div className="container py-5">

        {/* Dashboard Cards */}

        <div className="row mb-5">

          <div className="col-md-4 mb-3">

            <div className="card shadow p-4">

              <h4>

                <FaUsers /> Total Students

              </h4>

              <h2>

                {students.length}

              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow p-4">

              <h4>

                <FaBook /> Courses

              </h4>

              <h2>

                3

              </h2>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow p-4">

              <h4>

                <FaUserGraduate /> Active Users

              </h4>

              <h2>

                {students.length}

              </h2>

            </div>

          </div>

        </div>

        {/* Add Student Form */}

        <div className="card shadow p-4 mb-5">

          <h3 className="mb-4">

            ➕ Add Student

          </h3>

          <form onSubmit={addStudent}>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Student Name"
              onChange={(e) =>
                setName(e.target.value)
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
              type="text"
              className="form-control mb-3"
              placeholder="Course"
              onChange={(e) =>
                setCourse(e.target.value)
              }
            />

            <button
              type="submit"
              className="btn btn-success"
            >
              Add Student
            </button>

          </form>

        </div>

        {/* Edit Student Form */}

        {editId && (

          <div className="card shadow p-4 mb-5">

            <h3 className="mb-4">

              ✏️ Edit Student

            </h3>

            <form onSubmit={editStudent}>

              <input
                type="text"
                className="form-control mb-3"
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
              />

              <input
                type="email"
                className="form-control mb-3"
                value={editEmail}
                onChange={(e) =>
                  setEditEmail(e.target.value)
                }
              />

              <input
                type="text"
                className="form-control mb-3"
                value={editCourse}
                onChange={(e) =>
                  setEditCourse(e.target.value)
                }
              />

              <button
                className="btn btn-primary"
              >
                Update Student
              </button>

            </form>

          </div>

        )}

        {/* Search Filter */}

        <div className="card shadow p-4 mb-4">

          <h4 className="mb-3">

            🔍 Search Students

          </h4>

          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email or Course"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Student Table */}

        <div className="card shadow p-4">

          <h3 className="mb-4">

            📋 Student List

          </h3>

          <table className="table table-bordered">

            <thead className="table-dark">

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Course</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {students

                .filter((student) =>

                  student.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                  student.email
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                  student.course
                    .toLowerCase()
                    .includes(search.toLowerCase())

                )

                .map((student) => (

                  <tr key={student.id}>

                    <td>{student.id}</td>

                    <td>{student.name}</td>

                    <td>{student.email}</td>

                    <td>{student.course}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => {

                          setEditId(student.id);

                          setEditName(student.name);

                          setEditEmail(student.email);

                          setEditCourse(student.course);

                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteStudent(student.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;