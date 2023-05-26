import { qS, createEl } from "./utils/fn.js";

/************************* FUNZIONI *************************/
function listItemGen() {
  toDoMain.textContent = "";

  todos.forEach((singleTodo) => {
    const toDo = createEl("li", "", { name: "class", value: "toDO" });
    const removeBtn = createEl("button", "X", {
      name: "class",
      value: "removeBtn",
    });

    const todoText = singleTodo.todo;

    removeBtn.addEventListener("click", () => {
      todos = todos.filter((todo) => todo.id !== singleTodo.id);
      listItemGen();
      localStorage.setItem("todos", JSON.stringify(todos));
    });

    toDo.textContent = todoText;

    toDo.append(removeBtn);
    toDoMain.append(toDo);
  });
}

const addToDo = () => {
  const inputValue = toDoInput.value;

  if (inputValue !== "") {
    todos.push({ id: Date.now(), todo: inputValue });
    listItemGen();
    toDoInput.value = "";
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const startApp = () => {
  todos.forEach((element) => {
    listItemGen(element.todo);
  });
};

// const removeAll = () => {
//   localStorage.clear();
//   toDoMain.textContent = "";
// };

const switchModeClass = () => {
  document.body.classList.toggle("dark__body");
  addBtn.classList.toggle("dark__toDoBtn");
  toDoMain.classList.toggle("dark__toDoMain");
  toDoInput.classList.toggle("dark__toDoInput");
};

/************************* Creazione struttura *************************/
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
// const clearAll = qS(".clearAll");

export let todos = JSON.parse(localStorage.getItem("todos")) || [];

startApp();

/************************* EVENT LISTENER *************************/
switchMode.addEventListener("change", () => switchModeClass());

addBtn.addEventListener("click", () => addToDo());

// clearAll.addEventListener("click", () => removeAll());

/************************* APPEND *************************/
document.body.append(title, toDoInput, addBtn, toDoMain);
