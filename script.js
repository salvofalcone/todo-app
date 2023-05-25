import { qS, createEl, POST, DELETE, GET } from "./utils/fn.js";

/***************** FUNZIONI *****************/
function listItemGen(toDoData) {
  const toDo = createEl("li", "", { name: "class", value: "toDO" });
  const removeBtn = createEl("button", "X", {
    name: "class",
    value: "removeBtn",
  });

  const todoText = toDoData;

  removeBtn.addEventListener("click", () => {
    let index = todos.indexOf(toDoData);
    DELETE(index); //per eliminare dal server
    todos.splice(index, 1);
    toDoMain.removeChild(toDo);
  });

  toDo.textContent = todoText;

  toDo.append(removeBtn);
  toDoMain.append(toDo);
}

GET().then((data) => {
  data.todos.forEach((elem) => {
    todos.push(elem.todo);
    listItemGen(elem.todo);
  });
});

/***************** STRUTTURA *****************/
const toDoMain = createEl("ul", "", { name: "class", value: "toDoMain" });

const title = createEl("h1", "To-Do List", {
  name: "class",
  value: "title",
});

const toDoInput = createEl(
  "input",
  "",
  { name: "class", value: "toDoInput" },
  { name: "placeholder", value: "Add a new task here" }
);

const addBtn = createEl("button", "Add", {
  name: "class",
  value: "addBtn",
});

const switchMode = qS(".input");

export const todos = [];

/***************** EVENT LISTENER *****************/
switchMode.addEventListener("change", () => {
  document.body.classList.toggle("dark__body");
  addBtn.classList.toggle("dark__toDoBtn");
  toDoMain.classList.toggle("dark__toDoMain");
  toDoInput.classList.toggle("dark__toDoInput");
});

addBtn.addEventListener("click", () => {
  const inputValue = toDoInput.value;

  if (inputValue !== "") {
    listItemGen(inputValue);
    todos.push(inputValue);
    POST(inputValue); //per aggiungere al server
    toDoInput.value = "";
  }
});

//AGGIUNGERE GET

/***************** APPEND *****************/
document.body.append(title, toDoInput, addBtn, toDoMain);
