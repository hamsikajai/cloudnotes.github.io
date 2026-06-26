let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

// render tasks on load
renderTasks();

function addTask() {
  const value = input.value.trim();
  if (!value) return;

  tasks.push(value);
  input.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const item = document.getElementById(`task-${index}`);

  item.classList.add("fade-out");

  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 200);
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.id = `task-${index}`;

    const text = document.createElement("span");
    text.textContent = task;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.className = "delete-btn";

    btn.onclick = () => deleteTask(index);

    li.appendChild(text);
    li.appendChild(btn);

    list.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
