"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const removeBtn = document.querySelectorAll(".todo-remove");
const completeBtn = document.querySelectorAll(".todo-complete");
const resetBtn = document.querySelector(".reset-btn");

// Тут будет массив с объектами
// В каждом объекте будет храниться название задачи и его булевое значение выполнено или нет
const toDoData = [];

// Функция отрисовки контента на странице
const render = function () {
    todoList.innerHTML = "";
    todoCompleted.innerHTML = "";
    toDoData.forEach(function (item) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML =
            '<span class="text-todo">' +
            item.text +
            "</span>" +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            "</div>";
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        console.log(toDoData);

        li.querySelector(".todo-complete").addEventListener("click", function () {
            item.completed = !item.completed;
            render();
        });

        li.querySelector(".todo-remove").addEventListener("click", function () {
            const indexEl = toDoData.indexOf(item);
            toDoData.splice(indexEl, 1);
            render();
        });
    });
    const stringifyArray = JSON.stringify(toDoData);
    localStorage.setItem("taskList", stringifyArray);
};

const renderDataFromLocalStorage = function () {
    if (localStorage.length) {
        const dataFromLocalStorage = JSON.parse(localStorage.getItem("taskList"));
        console.log(dataFromLocalStorage);
        dataFromLocalStorage.forEach((el) => {
            toDoData.push(el);
        });
    }
    render();
};

// Предотвращаем стандартное поведение формы инпут при нажатии enter или кнопки "отправить"
todoControl.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!headerInput.value) {
        return alert("Поле не может быть пустым");
    }

    const newToDo = {
        text: headerInput.value,
        completed: false,
    };

    toDoData.push(newToDo);
    render();
    headerInput.value = "";
    console.log(toDoData);
});

resetBtn.addEventListener("click", function () {
    localStorage.clear();
});

// console.log(todoControl);
// console.log(headerInput);
// console.log(todoList);
// console.log(todoCompleted);
// console.log(removeBtn);
// console.log(completeBtn);

renderDataFromLocalStorage();
