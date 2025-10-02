const jsonData = {
  "events": [
    { "id": 1, "title": "Tech Fest", "date": "2025-10-10", "location": "Auditorium" },
    { "id": 2, "title": "Cultural Night", "date": "2025-10-15", "location": "Open Ground" },
    { "id": 3, "title": "Hackathon", "date": "2025-10-20", "location": "Lab 1" },
    { "id": 4, "title": "Workshop on AI", "date": "2025-10-22", "location": "Seminar Hall A" },
    { "id": 5, "title": "Sports Meet", "date": "2025-10-25", "location": "Stadium" },
    { "id": 6, "title": "Alumni Meet", "date": "2025-10-28", "location": "Conference Hall" }
  ],
  "students": [
    { "id": 101, "name": "Trusha Patel", "age": 18, "course": "CSE" },
    { "id": 102, "name": "Mahek Patel", "age": 20, "course": "IT" },
    { "id": 103, "name": "Ravi Patel", "age": 19, "course": "ECE" },
    { "id": 104, "name": "Priya Singh", "age": 21, "course": "EEE" },
    { "id": 105, "name": "Arjun Mehta", "age": 22, "course": "CE" },
    { "id": 106, "name": "Sneha Das", "age": 19, "course": "ME" }
  ]
};

const itemsPerPage = 2;
let eventPage = 1;
let studentPage = 1;

function renderCards(data, page, containerId, type, pageInfoId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  paginatedData.forEach(item => {
    let card = document.createElement("div");
    card.className = "card";

    if (type === "event") {
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p><b>Date:</b> ${item.date}</p>
        <p><b>Location:</b> ${item.location}</p>
      `;
    } else {
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p><b>Age:</b> ${item.age}</p>
        <p><b>Course:</b> ${item.course}</p>
      `;
    }

    container.appendChild(card);
  });

  const totalPages = Math.ceil(data.length / itemsPerPage);
  document.getElementById(pageInfoId).innerText = `Page ${page} of ${totalPages}`;  

  document.querySelector(type === "event" ? "#prevEvents" : "#prevStudents").disabled = (page === 1);
  document.querySelector(type === "event" ? "#nextEvents" : "#nextStudents").disabled = (end >= data.length);
}

renderCards(jsonData.events, eventPage, "eventsContainer", "event", "eventPageInfo");
renderCards(jsonData.students, studentPage, "studentsContainer", "student", "studentPageInfo");

document.getElementById("prevEvents").addEventListener("click", () => {
  if (eventPage > 1) {
    eventPage--;
  }
  renderCards(jsonData.events, eventPage, "eventsContainer", "event", "eventPageInfo");
});

document.getElementById("nextEvents").addEventListener("click", () => {
  if ((eventPage * itemsPerPage) < jsonData.events.length) {
    eventPage++;
  }
  renderCards(jsonData.events, eventPage, "eventsContainer", "event", "eventPageInfo");
});

document.getElementById("prevStudents").addEventListener("click", () => {
  if (studentPage > 1) {
    studentPage--;
  }             
  renderCards(jsonData.students, studentPage, "studentsContainer", "student", "studentPageInfo");
});

document.getElementById("nextStudents").addEventListener("click", () => {
  if ((studentPage * itemsPerPage) < jsonData.students.length) {
    studentPage++;
  }
  renderCards(jsonData.students, studentPage, "studentsContainer", "student", "studentPageInfo");
});
