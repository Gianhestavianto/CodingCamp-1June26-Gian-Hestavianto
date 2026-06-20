// =====================
// GREETING & CLOCK
// =====================

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toDateString();

    let hour = now.getHours();
    let greeting = "Good Evening";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    }

    let name = localStorage.getItem("username") || "";

    document.getElementById("greeting").textContent =
        `${greeting} ${name}`;
}

setInterval(updateClock, 1000);
updateClock();

function saveName() {
    const name = document.getElementById("username").value;
    localStorage.setItem("username", name);
    updateClock();
}

// =====================
// TIMER
// =====================

let timeLeft = 1500;
let timerInterval;

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    timeLeft = 1500;
    updateTimerDisplay();
}

updateTimerDisplay();

// =====================
// TODO LIST
// =====================

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks",
    JSON.stringify(tasks));
}

function renderTasks() {
    const list =
    document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        li.innerHTML = `
        <span class="${task.done ? 'done' : ''}">
            ${task.text}
        </span>

        <div>
            <button onclick="toggleTask(${index})">✓</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">X</button>
        </div>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    const input =
    document.getElementById("taskInput");

    const text = input.value.trim();

    if (!text) return;

    const duplicate = tasks.some(
        task => task.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicate) {
        alert("Task sudah ada!");
        return;
    }

    tasks.push({
        text,
        done: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

function toggleTask(index) {
    tasks[index].done =
    !tasks[index].done;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText =
    prompt("Edit Task:", tasks[index].text);

    if (newText) {
        tasks[index].text = newText;

        saveTasks();
        renderTasks();
    }
}

renderTasks();

// =====================
// QUICK LINKS
// =====================

let links =
JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
    localStorage.setItem("links",
    JSON.stringify(links));
}

function renderLinks() {
    const container =
    document.getElementById("linksContainer");

    container.innerHTML = "";

    links.forEach(link => {

        let a =
        document.createElement("a");

        a.href = link.url;
        a.target = "_blank";
        a.textContent = link.name;

        container.appendChild(a);
    });
}

function addLink() {
    const name =
    document.getElementById("linkName").value;

    const url =
    document.getElementById("linkUrl").value;

    if (!name || !url) return;

    links.push({ name, url });

    saveLinks();
    renderLinks();

    document.getElementById("linkName").value = "";
    document.getElementById("linkUrl").value = "";
}

renderLinks();

// =====================
// DARK MODE
// =====================

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}