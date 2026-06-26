let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

// ---------- LOAD THEME ----------
const savedTheme = localStorage.getItem("theme") || "pastel";
document.body.setAttribute("data-theme", savedTheme);

// ---------- INITIAL RENDER ----------
renderTasks();

// ---------- ADD TASK ----------
function addTask() {
    const value = input.value.trim();
    if (!value) return;

    tasks.push({
        text: value,
        done: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

// ---------- TOGGLE COMPLETE ----------
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// ---------- DELETE TASK ----------
function deleteTask(index) {
    const item = document.getElementById(`task-${index}`);

    if (item) {
        item.classList.add("fade-out");
    }

    setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }, 200);
}

// ---------- RENDER TASKS ----------
function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.id = `task-${index}`;

        if (task.done) {
            li.classList.add("done");
        }

        // click to toggle complete (but ignore delete button)
        li.onclick = function (e) {
            if (e.target.classList.contains("delete-btn")) return;
            toggleTask(index);
        };

        const text = document.createElement("span");
        text.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function (e) {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(text);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });

    updateProgress();
}

// ---------- SAVE ----------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------- PROGRESS BAR ----------
function updateProgress() {
    const fill = document.querySelector(".fill");
    const progressText = document.getElementById("progressText");

    if (!fill || !progressText) return;

    if (tasks.length === 0) {
        fill.style.width = "0%";
        progressText.textContent = "🌸 Add your first task!";
        return;
    }

    const completed = tasks.filter(t => t.done).length;
    const percent = Math.round((completed / tasks.length) * 100);

    fill.style.width = percent + "%";

    let message = "";

    if (percent === 100) {
        message = "🏆 All tasks completed!";
    } else if (percent >= 75) {
        message = "🌟 Almost there!";
    } else if (percent >= 50) {
        message = "✨ Great progress!";
    } else if (percent >= 25) {
        message = "🌸 Keep going!";
    } else {
        message = "☁️ You've got this!";
    }

    progressText.textContent =
        `${message} • ${completed}/${tasks.length} tasks • ${percent}%`;
}

// ---------- THEME SWITCHER ----------
function toggleTheme() {
    const current = document.body.getAttribute("data-theme");

    if (current === "dark") {
        document.body.setAttribute("data-theme", "pastel");
        localStorage.setItem("theme", "pastel");
    } else if (current === "pastel") {
        document.body.setAttribute("data-theme", "lavender");
        localStorage.setItem("theme", "lavender");
    } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}
