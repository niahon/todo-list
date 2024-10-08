"use strict"

let elText = document.getElementById("text-field");
let elSubmit = document.getElementById("submit");
let elList = document.getElementById("todo-list");
let elLabels = document.getElementsByTagName("label");


let todoText
let itemArray = [];

window.addEventListener("load", () => {
    elText.value = "";
    todoText = "";
})

elText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (todoText === "") {
            return;
        }
        createItem(todoText);
        todoText = "";
        e.target.value = "";
    }
})

elText.addEventListener("input", () => {
    todoText = elText.value;
})

elSubmit.addEventListener("click", (e) => {
    elText.value = "";
    if (todoText === "") {
        return;
    }
    createItem(todoText);
    todoText = "";
})

function labelListener(label) {
    label.addEventListener("keydown", confirmEdit);
}

function checkboxListener(check) {
    check.addEventListener("click", strikeThroughItem);
}

function createItem(text) {   
    const newListItem = document.createElement("li");
    newListItem.classList.add("list-item");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    const newLabel = document.createElement("label");
    const newContent = document.createTextNode(text);
    newLabel.appendChild(newContent); 
    const newDelete = document.createElement("span");
    newDelete.textContent = " X";
    elList.appendChild(newListItem);
    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newLabel);
    newListItem.appendChild(newDelete);
    itemArray.push(newListItem);
    deleteListener(newDelete);
    setId(newCheckbox, newLabel);
    newLabel.setAttribute("contenteditable", "true");
    labelListener(newLabel);
    checkboxListener(newCheckbox);
}

function focusLabel(e) {
    e.target.focus();
}

function confirmEdit(e) {
    if (e.key === "Enter") {
        e.target.blur();
    }
    console.log(e.key);
}

function deleteListener(del) {
    del.addEventListener("click", deleteItem);
}

function deleteItem(e) {
    let li = e.target.parentElement;
    itemArray.splice(itemArray.indexOf(li), 1);
    li.remove();
    updateId();
}

function setId(checkbox, label) {
    let id = itemArray.indexOf(checkbox.parentElement);
    checkbox.id = id;
}

function updateId() {
    let list = Array.from(elList.children);
    for (let el of list) {
        let checkbox = el.children[0];
        let label = el.children[1];
        let id = itemArray.indexOf(checkbox.parentElement);
        checkbox.id = id;
    }
}

function strikeThroughItem(e) {
    e.target.nextSibling.classList.toggle("strike-through");
}