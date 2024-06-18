document.addEventListener("DOMContentLoaded", () => {
    const newTodoForm = document.getElementById("newTodoForm");
    const userSelect = document.getElementById("userSelect");
    const categorySelect = document.getElementById("categorySelect");
    const prioritySelect = document.getElementById("prioritySelect");
    const description = document.getElementById("description");
    const deadline = document.getElementById("deadline");
    const messageDiv = document.getElementById("message");

    const populateDropdown = (selectElement, data) => {
        selectElement.innerHTML = "<option value=''>Select</option>";
        data.forEach(item => {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = item.name;
            selectElement.appendChild(option);
        });
    };

    fetch("http://localhost:8083/api/users")
        .then(response => response.json())
        .then(users => populateDropdown(userSelect, users));

    fetch("http://localhost:8083/api/categories")
        .then(response => response.json())
        .then(categories => populateDropdown(categorySelect, categories));

    newTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const selectedUser = userSelect.options[userSelect.selectedIndex];
        const selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
        const priority = prioritySelect.value;
        const todo = {
            userid: selectedUser.value,
            category: selectedCategory,
            priority: priority,
            description: description.value,
            deadline: deadline.value,
            completed: false
        };

        if (!todo.userid || !todo.category || !todo.priority || !todo.description || !todo.deadline) {
            alert("All fields are required.");
            return;
        }

        fetch("http://localhost:8083/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(todo)
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            newTodoForm.reset();
            showMessage(`You have successfully added a new task for ${selectedUser.text}!`);
        })
        .catch(error => alert("Error adding To-Do: " + error.message));
    });

    function showMessage(message) {
        messageDiv.textContent = message;
        messageDiv.classList.add("alert", "alert-success");
        messageDiv.style.display = "block";
        setTimeout(() => {
            messageDiv.style.display = "none";
            messageDiv.classList.remove("alert", "alert-success");
            messageDiv.textContent = "";
        }, 7000);
    }
});
