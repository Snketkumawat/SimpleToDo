document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
  });

  // Function to load tasks from local storage
  function loadTasks() {
    const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(taskList);
  }

  // Function to render tasks on the UI
  function renderTasks(tasks) {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("div");
      taskItem.className = `task ${task.completed ? "completed" : ""}`;
      const taskText = document.createElement("span");

      // Add line break if text is too long
      taskText.style.wordWrap = "break-word";

      taskText.innerText = task.text;
      taskItem.appendChild(taskText);

      // Use buttonText property for the button text
      const toggleButton = document.createElement("button");
      toggleButton.innerText = task.buttonText || "Mark Done";
      toggleButton.onclick = () => toggleTask(index);
      taskItem.appendChild(toggleButton);

      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.onclick = () => deleteTask(index);
      taskItem.appendChild(deleteButton);

      // Append the task item to the taskListContainer
      taskListContainer.appendChild(taskItem);
    });
  }

  // Function to add a new task
  function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const newTaskText = newTaskInput.value.trim();

    if (newTaskText !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: newTaskText, completed: false });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      newTaskInput.value = "";
      loadTasks();
    }
  }

  // Function to toggle the completion status of a task
  function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].buttonText = tasks[index].completed;

    // Toggle the completion status
    tasks[index].completed = !tasks[index].completed;

    // Update the buttonText property based on the new completion status
    tasks[index].buttonText = tasks[index].completed
      ? "Not Done"
      : "Mark Done";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  // Function to delete a task
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }