//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteOrDone);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault();

  //Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //Add li to div
  todoDiv.appendChild(newTodo);

  //Add done button
  const doneButton = document.createElement("button");
  doneButton.innerHTML = "<i class='fas fa-check'></i>";
  doneButton.classList.add("done-button");

  //Add done button to div
  todoDiv.appendChild(doneButton);

  //Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
  deleteButton.classList.add("delete-button");

  //Add delete button to div
  todoDiv.appendChild(deleteButton);

  //Finally, add div to todoList
  todoList.appendChild(todoDiv);

  //Persist to local storage
  saveToLocalStorage(todoInput.value);

  //Clear todoInput value
  todoInput.value = "";
}

function deleteOrDone(event) {
  const item = event.target;

  //Delete todo
  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");

    //Delete from local storage
    removeTodoFromLocalStorage(todo);

    //Remove after animation is completed
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "done-button") {
    const todo = item.parentElement;
    todo.classList.toggle("done");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "done":
        if (todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "remaining":
        if (!todo.classList.contains("done")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //Add li to div
    todoDiv.appendChild(newTodo);

    //Add done button
    const doneButton = document.createElement("button");
    doneButton.innerHTML = "<i class='fas fa-check'></i>";
    doneButton.classList.add("done-button");

    //Add done button to div
    todoDiv.appendChild(doneButton);

    //Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-button");

    //Add delete button to div
    todoDiv.appendChild(deleteButton);

    //Finally, add div to todoList
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const deleteIndex = todos.indexOf(todo.children[0].innerText);
  console.log(deleteIndex);
  todos.splice(deleteIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
