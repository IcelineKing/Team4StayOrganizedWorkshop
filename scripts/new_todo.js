// Common utility functions

// Fetch and populate users dropdown
function populateUsersDropdown(selectElementId) {
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(users => {
            const dropdown = document.getElementById(selectElementId);
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                dropdown.appendChild(option);
            });
        });
}

// Fetch and populate categories dropdown
function populateCategoriesDropdown() {
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(categories => {
            const dropdown = document.getElementById('categoryDropdown');
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                dropdown.appendChild(option);
            });
        });
}
