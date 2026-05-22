import {

  FaUserGraduate,

  FaMoon,

  FaUsers,

  FaBook,

  FaChartBar,

  FaSignOutAlt,

  FaBars,

} from "react-icons/fa";

import { useEffect, useState } from "react";

import axios from "axios";

import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend,

} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(

  CategoryScale,

  LinearScale,

  BarElement,

  Title,

  Tooltip,

  Legend

);

function Dashboard() {

  // JWT Token

  const token = localStorage.getItem("access");

  // Students Data

  const [students, setStudents] = useState([]);

  // Dark Mode

  const [darkMode, setDarkMode]
    = useState(false);

  // Sidebar

  const [sidebarOpen, setSidebarOpen]
    = useState(true);

  // Add Student Form

  const [name, setName]
    = useState("");

  const [email, setEmail]
    = useState("");

  const [course, setCourse]
    = useState("");

  const [image, setImage]
    = useState(null);

  // Search

  const [search, setSearch]
    = useState("");

  // AI Assistant States

  const [question, setQuestion]
    = useState("");

  const [answer, setAnswer]
    = useState("");

  // Edit Student

  const [editId, setEditId]
    = useState(null);

  const [editName, setEditName]
    = useState("");

  const [editEmail, setEditEmail]
    = useState("");

  const [editCourse, setEditCourse]
    = useState("");

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

      const formData = new FormData();

      formData.append("name", name);

      formData.append("email", email);

      formData.append("course", course);

      formData.append("image", image);

      await axios.post(

        "http://127.0.0.1:8000/api/",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data",

          },

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

 // Edit Student

const editStudent = async (e) => {

  e.preventDefault();

  try {

    await axios.patch(

      `https://django-student-management-system-r6hl.onrender.com/api/${editId}/`,

      {

        name: editName,

        email: editEmail,

        course: editCourse,

      }

    );

    alert("✅ Student Updated Successfully");

    window.location.reload();

  }

  catch (error) {

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

  // Attendance Function

  const markAttendance = async (
    id,
    status
  ) => {

    try {

      await axios.patch(

        `http://127.0.0.1:8000/api/${id}/`,

        {

          attendance: status,

        }

      );

      setStudents(

        students.map((student) =>

          student.id === id

            ? {

                ...student,

                attendance: status,

              }

            : student

        )

      );

    }

    catch (error) {

      console.log(error);

      alert("❌ Attendance Update Failed");

    }

  };

  // AI Assistant Function

  const askAI = () => {

    if (

      question.toLowerCase().includes(
        "web"
      )

    ) {

      setAnswer(

        "🌐 React + Django best for Web Development 🚀"

      );

    }

    else if (

      question.toLowerCase().includes(
        "python"
      )

    ) {

      setAnswer(

        "🐍 Python is best for AI, Backend and Automation."

      );

    }

    else if (

      question.toLowerCase().includes(
        "cyber"
      )

    ) {

      setAnswer(

        "🔐 Cybersecurity has huge demand in companies."

      );

    }

    else if (

      question.toLowerCase().includes(
        "react"
      )

    ) {

      setAnswer(

        "⚛️ React is one of the most popular frontend libraries."

      );

    }
else if (

  question.toLowerCase().includes(
    "hi"
  )

) {

  setAnswer(

    "👋 Hello! How can I help you?"

  );

}
else if (

  question.toLowerCase().includes(
    "hey"
  )

) {

  setAnswer(

    "👋 Hello! How can I help you?"

  );

}
else if (

  question.toLowerCase().includes(
    "how are you"
  )

) {

  setAnswer(

    "I’m doing great, how about you? 🙂"

  );

}
else if (

  question.toLowerCase().includes(
    "hello"
  )

) {

  setAnswer(

    "👋 Hello! How can I help you?"

  );

}
    else {

      setAnswer(

        "🤖 AI Assistant is learning..."

      );

    }

  };

  // Chart Data

  const chartData = {

    labels: students.map(
      (student) => student.name
    ),

    datasets: [

      {

        label: "Students",

        data: students.map(
          (student, index) => index + 1
        ),

        backgroundColor: [

          "#0d6efd",

          "#198754",

          "#ffc107",

          "#dc3545",

          "#6610f2",

        ],

      },

    ],

  };

  // Logout

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="d-flex">

      {/* Sidebar */}

      <div

        className={`bg-dark text-white p-4 ${
          sidebarOpen ? "d-block" : "d-none"
        }`}

        style={{
          width: "250px",
          minHeight: "100vh",
        }}

      >

        <h3 className="mb-5">

          🎓 Admin Panel

        </h3>

        <ul className="list-unstyled">

          <li className="mb-4">

            <FaUsers /> Dashboard

          </li>

          <li className="mb-4">

            <FaUserGraduate /> Students

          </li>

          <li className="mb-4">

            <FaChartBar /> Analytics

          </li>

          <li
            className="mb-4 text-danger"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >

            <FaSignOutAlt /> Logout

          </li>

        </ul>

      </div>

      {/* Main Content */}

      <div
        className={
          darkMode
            ? "bg-dark text-white flex-grow-1 min-vh-100"
            : "bg-light flex-grow-1 min-vh-100"
        }
      >

        {/* Navbar */}

        <nav className="navbar navbar-dark bg-dark px-4">

          <div className="d-flex align-items-center">

            <button
              className="btn btn-light me-3"
              onClick={() =>
                setSidebarOpen(!sidebarOpen)
              }
            >

              <FaBars />

            </button>

            <h3 className="text-white">

              Student Dashboard

            </h3>

          </div>

          <button
            className="btn btn-warning"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >

            <FaMoon />

          </button>

        </nav>

        {/* Main Container */}

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

          {/* Add Student */}

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

              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) =>
                  setImage(e.target.files[0])
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

          {/* Edit Student */}

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

          {/* Search */}

          <div className="card shadow p-4 mb-5">

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

          {/* Charts */}

          <div className="card shadow p-4 mb-5">

            <h3 className="mb-4">

              📊 Student Analytics

            </h3>

            <Bar data={chartData} />

          </div>

          {/* AI Assistant */}

          <div className="card shadow p-4 mb-5">

            <h3 className="mb-4">

              🤖 AI Student Assistant

            </h3>

            <input

              type="text"

              className="form-control mb-3"

              placeholder="Ask something..."

              onChange={(e) =>
                setQuestion(e.target.value)
              }

            />

            <button

              className="btn btn-dark"

              onClick={askAI}

            >

              Ask AI

            </button>

            <div className="mt-4">

              <h5>

                {answer}

              </h5>

            </div>

          </div>

          {/* Student Table */}

          <div className="card shadow p-4">

            <h3 className="mb-4">

              📋 Student List

            </h3>

            <div className="mb-3">

              <a

                href="http://127.0.0.1:8000/export-excel/"

                className="btn btn-success me-3"

              >

                📗 Export Excel

              </a>

              <a

                href="http://127.0.0.1:8000/export-pdf/"

                className="btn btn-danger"

              >

                📕 Export PDF

              </a>

            </div>

            <table className="table table-bordered">

              <thead className="table-dark">

                <tr>

                  <th>Image</th>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Course</th>

                  <th>Status</th>

                  <th>Attendance</th>

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

                      <td>

                        {student.image && (

                          <img

                            src={`http://127.0.0.1:8000${student.image}`}

                            alt="student"

                            width="50"

                            height="50"

                            style={{
                              borderRadius: "50%"
                            }}

                          />

                        )}

                      </td>

                      <td>{student.id}</td>

                      <td>{student.name}</td>

                      <td>{student.email}</td>

                      <td>{student.course}</td>

                      {/* Attendance Status */}

                      <td>

                        {student.attendance ===
                        "Present" ? (

                          <span className="badge bg-success">

                            Present

                          </span>

                        ) : (

                          <span className="badge bg-danger">

                            Absent

                          </span>

                        )}

                      </td>

                      {/* Attendance Buttons */}

                      <td>

                        <button

                          className="btn btn-success btn-sm me-2"

                          onClick={() =>
                            markAttendance(
                              student.id,
                              "Present"
                            )
                          }

                        >

                          Present

                        </button>

                        <button

                          className="btn btn-danger btn-sm"

                          onClick={() =>
                            markAttendance(
                              student.id,
                              "Absent"
                            )
                          }

                        >

                          Absent

                        </button>

                      </td>

                      {/* Actions */}

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

    </div>

  );

}

export default Dashboard;