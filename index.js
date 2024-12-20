const container = document.getElementById('container');
const toDoInputEl = document.getElementById('toDoInput');
const listContainerEl = document.getElementById('listContainer');
const errorMessage = document.querySelector('.error_message');

function addToDo() {
    console.log(toDoInputEl.value);
    if (toDoInputEl.value === "") {
        errorMessage.style.display = "block";
    } else {
        const li = document.createElement("li");
        li.innerHTML = toDoInputEl.value;
        listContainerEl.appendChild(li);

        let span = document.createElement("span");
        span.innerText = "\u2715";
        li.appendChild(span);
        span.classList.add("delete");
        span.addEventListener("mouseover", () => {
            span.innerText = "\u2716";
        });
        span.addEventListener("mouseout", () => {
            span.innerText = "\u2715";
        });

        edit = document.createElement("i");
        edit.classList.add("fa-solid", "fa-pen-to-square", "edit");
        li.appendChild(edit);



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


listContainerEl.addEventListener("click", (event) => {
    console.log(event.target.tagName);
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        setData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentNode.remove();
        setData();
    } else if (event.target.tagName === "I") {
        const currentText = event.target.parentNode.textContent.slice(0, -1);
        console.log(currentText);
        setData();
    }
});

function setData() {
    localStorage.setItem("data", listContainerEl.innerHTML);
}

function getData() {
    listContainerEl.innerHTML = localStorage.getItem("data");
}

if (localStorage.getItem("data")) {
    getData();
    container.style.height = "500px";
}