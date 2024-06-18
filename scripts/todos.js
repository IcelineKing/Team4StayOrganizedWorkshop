"use strict";

const apiBaseUrl = "http://localhost:8083/api/users";
const newBaseUrl = "http://localhost:8083/api/todos";

window.onload = function () {
    const userDropdown = document.getElementById("userDropdown");
    const todoList = document.getElementById("todoList");


    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                userDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // Fetch todos and populate table 
    userDropdown.addEventListener("change", function() {
        const userId = userDropdown.value;
        if (!userId) {
            return;
        }

        const url = `${newBaseUrl}/byuser/${userId}`;

        fetch(url)
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = "";
                todos.forEach(todo => {
                    const row = document.createElement("tr");

                    const descriptionCell = document.createElement("td");
                    descriptionCell.textContent = todo.description;
                    row.appendChild(descriptionCell);

                    const categoryCell = document.createElement("td");
                    categoryCell.textContent = todo.category;
                    row.appendChild(categoryCell);

                    const deadlineCell = document.createElement("td");
                    deadlineCell.textContent = todo.dueDate;
                    row.appendChild(deadlineCell);

                    const priorityCell = document.createElement("td");
                    priorityCell.textContent = todo.priority;
                    row.appendChild(priorityCell);

                    const completedCell = document.createElement("td");
                    completedCell.textContent = todo.completed ? "Yes" : "No";
                    row.appendChild(completedCell);

                    todoList.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching todos:', error));
    });
};
