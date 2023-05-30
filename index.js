const studentForm = document.querySelector("#studentForm");
const studentName = document.querySelector("#name");
const studentCity = document.querySelector("#city");
const studentList = document.querySelector("#studentList");
const template = document.querySelector("template").content;
const fragment = document.createDocumentFragment();

let students = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
  }
  addEstudent();
});

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const student = {
    id: Date.now(),
    name: event.target[0].value,
    city: event.target[1].value,
    status: false,
  };
  //Sirve para agregar elementos al objeto
  students[student.id] = student;

  studentForm.reset();
  studentName.focus();
  addEstudent();
});

studentList.addEventListener("click", (event) => {
  btnAccion(event);
});

const addEstudent = () => {
  localStorage.setItem("students", JSON.stringify(students));

  if (Object.values(students).length === 0) {
    studentList.innerHTML = `¡No hay Registros! 😎`;
    return;
  }

  studentList.innerHTML = "";
  Object.values(students).forEach((student) => {
    const clone = template.cloneNode(true);
    clone.querySelector(".student_name").textContent = student.name;
    clone.querySelector(".student_city").textContent = student.city;
    clone.querySelector(".edit").dataset.id = student.id;
    clone.querySelector(".delet").dataset.id = student.id;
    fragment.appendChild(clone);
  });
  studentList.appendChild(fragment);
};

const btnAccion = (event) => {
  if (event.target.classList.contains("edit")) {
    const newEstudent = prompt("Nombre del Estudiante");
    const newCity = prompt("Ciudad del Estudiante");
    if (newEstudent.length === 0 && newCity.length === 0) {
      alert("No hay informacion de Estudantes");
      return;
    }
    students[event.target.dataset.id].name = newEstudent;
    students[event.target.dataset.id].city = newCity;
    addEstudent();
  }
  if (event.target.classList.contains("delet")) {
    delete students[event.target.dataset.id];
    addEstudent();
  }
  event.stopPropagation();
};
