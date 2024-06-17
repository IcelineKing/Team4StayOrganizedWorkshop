"use strict";

// http://localhost:8083/api/users
const apiBaseUrl = "http://localhost:8083/api/users";

// http://localhost:8083/api/todos to call the tasks
const newBaseUrl = "http://localhost:8083/api/todos";

window.onload = function () {
  const getUsersButton = document.getElementById("getUsersButton");
  const getUserDropdown = document.getElementById("userDropdown");

  getUsersButton.onclick = onGetUsersButtonClick;
};

function userDropdown() {


  const nameInput = document.getElementById("name");
  const usernameOutPut = document.getElementById("username");

  let actualUrl = apiBaseUrl + nameInput.value;

  console.log("URL:" + actualUrl);

  fetch(actualUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // "for in :" to retrive object keys --ex: name/id/tasks \ "for of :" to loop through an array
      for (let d in data) {
        let table = document.createElement("table");
        table.innerHTML = data[d];

        resultsOutPut.appendChild(table);

        // calling keys (name of variable) + the actual variable; the bracket calls values of the keys
        console.log(d + ": " + data[d]);
      }
    });
}
