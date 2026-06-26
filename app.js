function addTask() {
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  const value = input.value.trim();
  if (!value) return;

  // Create task item
  const item = document.createElement("li");

  // Create task text
  const text = document.createElement("span");
  text.textContent = value;

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";

  deleteBtn.onclick = function () {
    item.remove();
  };

  // Add everything to the task
  item.appendChild(text);
  item.appendChild(deleteBtn);

  // Make it look nice
  item.style.display = "flex";
  item.style.justifyContent = "space-between";
  item.style.padding = "8px";
  item.style.margin = "5px 0";

  list.appendChild(item);

  input.value = "";
}
