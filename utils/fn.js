import { todos } from "../script.js";

export const qS = (element) => document.querySelector(element);

// export const qSA = (elements) => document.querySelectorAll(elements);

export const createEl = (type, content, ...attrs) => {
  const element = document.createElement(type);

  element.textContent = content;
  attrs.forEach((attr) => element.setAttribute(attr?.name, attr?.value));
  return element;
};


/***************** HTTP *****************/
export const GET = async () => {
  try {
    const res = await fetch("https://dummyjson.com/todos/");
    const data = await res.json();

    return data;
  } catch (error) {
    alert("Qualcosa è andato storto.");
  }
};

export const POST = async (inputValue) => {
  try {
    const res = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: inputValue,
        completed: false,
        userId: 5,
      }),
    });
    const data = await res.json();
  } catch (error) {
    alert("Qualcosa è andato storto.");
  }
};

export const DELETE = async (index) => {
  try {
    const indice = index === 0 ? 1 : index; //per evitare errore 404 al delete dell'ultimo elemento
    const res = await fetch(`https://dummyjson.com/todos/${indice}`, {
      //SISTEMA QUI PER FARLO FUNZIONARE
      method: "DELETE",
    });
    const data = await res.json();
  } catch (error) {
    alert("Qualcosa è andato storto.");
  }
};
