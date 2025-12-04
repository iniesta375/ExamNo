let studentUser = JSON.parse(localStorage.getItem("studentInfo")) || [];

const matricRegex = /^\d{10}$/;

const submit = () => {
  if (
    surname.value.trim() === "" ||
    firstName.value.trim() === "" ||
    email.value.trim() === "" ||
    matricNo.value.trim() === ""
  ) {
    alert("input a value");
  }
  if (!matricRegex.test(matricNo.value)) {
    alert("Matric Number must be exactly 10 digits.");
    return;
  } else {
    let student = 0;
    let attempts = 0;
    let isDuplicate = true;

    while (isDuplicate === true && attempts < 2) {
      student = Math.round(Math.random() * 100);
      const duplicate = studentUser.find((user) => user.id_num === student);
      if (!duplicate) {
        isDuplicate = false;
      } else {
        attempts++;
      }
    }

    if (isDuplicate) {
      alert("Full");
      return;
    }

    const examIdObj = {
      surname: surname.value,
      first_name: firstName.value,
      mail: email.value,
      matric_num: matricNo.value,
      id_num: student,
    };

    sho.value = student;

    studentUser.push(examIdObj);
    localStorage.setItem("studentInfo", JSON.stringify(studentUser));
    displayId();
  }
};

function displayId() {
  const container = document.getElementById("show");
  container.innerHTML = "";
  studentUser.forEach((idGen) => {
    container.innerHTML += `
        <tr>
            <td>${idGen.surname}</td>
            <td>${idGen.first_name}</td>
            <td>${idGen.mail}</td>
            <td>${idGen.matric_num}</td>
            <td>${idGen.id_num}</td>
        </tr>
        `;
  });
}

displayId();
