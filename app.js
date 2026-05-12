const API_URL = "http://localhost:5000/api";

/* REGISTER */
async function register() {

  const username =
    document.getElementById("regUsername").value;

  const email =
    document.getElementById("regEmail").value;

  const password =
    document.getElementById("regPassword").value;

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    }
  );

  const data = await response.json();

  alert(data.message);
}

/* LOGIN */
async function login() {

  const email =
    document.getElementById("loginEmail").value;

  const password =
    document.getElementById("loginPassword").value;

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const data = await response.json();

  if (data.token) {

    localStorage.setItem("token", data.token);

    alert("Login successful");

    window.location.href = "dashboard.html";

  } else {

    alert(data.message);
  }
}

/* LOAD STUDENTS */
async function loadStudents() {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/students`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const students = await response.json();

  let rows = "";

  students.forEach(student => {

    rows += `
      <tr>
        <td>${student.id}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>

        <td>
          <button onclick="deleteStudent(${student.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("studentTable").innerHTML = rows;
}

/* ADD STUDENT */
async function addStudent() {

  const fullname =
    document.getElementById("fullname").value;

  const email =
    document.getElementById("studentEmail").value;

  const course =
    document.getElementById("course").value;

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/students`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify({
        fullname,
        email,
        course
      })
    }
  );

  const data = await response.json();

  alert(data.message);

  loadStudents();
}

/* DELETE */
async function deleteStudent(id) {

  const token = localStorage.getItem("token");

  await fetch(
    `${API_URL}/students/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  loadStudents();
}