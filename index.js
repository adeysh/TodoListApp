const container = document.getElementById('container');
const toDoInputEl = document.getElementById('toDoInput');
const listContainerEl = document.getElementById('listContainer');
const errorMessage = document.querySelector('.error_message');
const addTodoBtn = document.getElementById('addTodoBtn');

function addToDo() {
    console.log(toDoInputEl.value);
    if (toDoInputEl.value === "") {
        errorMessage.innerText = "You must write something! ✍🏻";
        errorMessage.style.display = "block";
    } else if (toDoInputEl.value.length > 35) {
        errorMessage.innerText = "Length can be a maximum of 35 characters. 🤏🏻";
        errorMessage.style.display = "block";
    }
    else {
        const li = document.createElement("li");
        li.innerHTML = toDoInputEl.value;
        listContainerEl.appendChild(li);
        addEditAndDeleteOptions(li);

        container.style.height = "500px";
        listContainerEl.scrollTop = listContainerEl.scrollHeight;
        setData();
    }
    toDoInputEl.value = "";
}

toDoInputEl.addEventListener("focus", () => {
    if (errorMessage.style.display === "block"); {
        errorMessage.style.display = "none";
    }
});

let isEditing = false;
let currentListItem = null;

listContainerEl.addEventListener("click", (event) => {
    console.log(event.target.tagName);
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        setData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentNode.remove();
        setData();
    } else if (event.target.tagName === "I") {
        listItem = event.target.parentNode;
        editToDo(listItem);
        setData();
    }
});

function editToDo(listItem) {
    const currentText = listItem.textContent.slice(0, -1);
    // console.log(isEditing);
    toDoInputEl.value = currentText;
    toDoInputEl.focus();
    addTodoBtn.innerText = "Update";
    isEditing = true;
    currentListItem = listItem;
}

function addEditAndDeleteOptions(listItem) {
    let span = document.createElement("span");
    span.innerText = "\u2715";
    listItem.appendChild(span);
    span.classList.add("delete");
    span.addEventListener("mouseover", () => {
        span.innerText = "\u2716";
    });
    span.addEventListener("mouseout", () => {
        span.innerText = "\u2715";
    });

    edit = document.createElement("i");
    edit.classList.add("fa-solid", "fa-pen-to-square", "edit");
    listItem.appendChild(edit);
}


function saveEditToDo() {
    const newText = toDoInputEl.value;
    if (newText === "") {
        errorMessage.style.display = "block";
        return;
    }
    currentListItem.innerHTML = newText;
    addEditAndDeleteOptions(currentListItem);

    isEditing = false;
    currentListItem = null;
    toDoInputEl.value = "";
    addTodoBtn.innerText = "Add";
    setData();
}

addTodoBtn.addEventListener("click", () => {
    if (isEditing) {
        saveEditToDo();
    } else {
        addToDo();
    }
});

function checkInputLength(inputValue) {
    console.log(inputValue.length());
}


function setData() {
    localStorage.setItem("data", listContainerEl.innerHTML);
}

function getData() {
    listContainerEl.innerHTML = localStorage.getItem("data");
}

const data = localStorage.getItem("data");

if (data !== null) {
    getData();
    container.style.height = "500px";
}