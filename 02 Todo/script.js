const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("task")) || [];

// Render all tasks on page load
renderTasks();

addTaskButton.addEventListener("click", () => {
  addTask();
});

todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === "") return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  todoInput.value = "";
}

function renderTasks() {
  todoList.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <button>Delete</button>`;

    // Toggle task completion
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return; // Ignore button clicks
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Delete task
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    todoList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("task", JSON.stringify(tasks));
}
