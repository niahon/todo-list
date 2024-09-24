"use strict"

let elText = document.getElementById("text-field");
let elSubmit = document.getElementById("submit");
let elList = document.getElementById("todo-list");

let todoText = ""
let itemAmount = 0;

elText.addEventListener("input", () => {
    todoText = elText.value;
})

elSubmit.addEventListener("click", (e) => {
    elText.value = "";
    createItem(todoText);
    todoText = "";
})



function createItem(text) {   
    itemAmount++; 
    let checkId = itemAmount;
    const newListItem = document.createElement("li");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = checkId;
    const newLabel = document.createElement("label");
    const newContent = document.createTextNode(text);
    newLabel.setAttribute("for", checkId);
    newLabel.appendChild(newContent); 
    const newDelete = document.createElement("span");
    newDelete.textContent = " X";
    elList.appendChild(newListItem);
    newListItem.appendChild(newCheckbox);
    newListItem.appendChild(newLabel);
    newListItem.appendChild(newDelete);
    deleteListener(newDelete);
}

function deleteListener(del) {
    del.addEventListener("click", deleteItem);
}

function deleteItem(e) {
    e.target.parentElement.remove();
    itemAmount--;
}
