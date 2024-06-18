"use strict";

const apiBaseUrl = "http://localhost:8083/api/users";
const newBaseUrl = "http://localhost:8083/api/todos";

window.onload = function () {
  const userDropdown = document.getElementById("userDropdown");
  const todoList = document.getElementById("todoList");

  fetch(apiBaseUrl)
    .then((response) => response.json())
    .then((users) => {
      users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        userDropdown.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching users:", error));

  userDropdown.addEventListener("change", function () {
    const userId = userDropdown.value;
    if (!userId) {
      return;
    }

    const url = `${newBaseUrl}/byuser/${userId}`;

    fetch(url)
      .then((response) => response.json())
      .then((todos) => {
        populateTodoList(todos);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  });

  function populateTodoList(todos) {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const row = document.createElement("tr");

      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = todo.description;
      row.appendChild(descriptionCell);

      const categoryCell = document.createElement("td");
      categoryCell.textContent = todo.category;
      row.appendChild(categoryCell);

      const deadlineCell = document.createElement("td");
      deadlineCell.textContent = formatDate(todo.deadline);
      row.appendChild(deadlineCell);

      const priorityCell = document.createElement("td");
      priorityCell.textContent = todo.priority;
      row.appendChild(priorityCell);

      const completedCell = document.createElement("td");
      completedCell.textContent = todo.completed ? "Yes" : "No";
      row.appendChild(completedCell);

      const actionsCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.onclick = function () {
        deleteTodo(todo.id, row);
      };
      actionsCell.appendChild(deleteButton);
      row.appendChild(actionsCell);

      todoList.appendChild(row);
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  function deleteTodo(id, row) {
    fetch(`${newBaseUrl}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
        row.remove();
      })
      .catch((error) => console.error("Error deleting todo:", error));
  }

  window.addEventListener("storage", function (event) {
    if (event.key === "newTodoAdded") {
      const newTodo = JSON.parse(event.newValue);
      const userId = userDropdown.value;
      if (newTodo && newTodo.user === userId) {
        fetch(`${newBaseUrl}/byuser/${userId}`)
          .then((response) => response.json())
          .then((todos) => {
            populateTodoList(todos);
          })
          .catch((error) => console.error("Error fetching todos:", error));
      }
    }
  });
};
