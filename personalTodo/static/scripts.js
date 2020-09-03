
console.log("Entrei");

const rootElement = document.getElementById("root");
const list = rootElement.querySelector(".todo-list");

function addTodo(description,done) {

    const todoElem = document.createElement("li");
    todoElem.setAttribute("class","todo-item");

    if(done){
        todoElem.classList.add("done");
    }

    const descriptionElem = document.createElement("span");
    descriptionElem.setAttribute("class","description");
    descriptionElem.innerText = description;
    
    descriptionElem.addEventListener("click", event => toggleDone(todoElem));


    const removeElem = document.createElement("span");
    removeElem.setAttribute("class","remove");
    removeElem.innerText = '\u2716';
    removeElem.addEventListener("click", event => removeTodo(todoElem));

    todoElem.appendChild(descriptionElem);
    todoElem.appendChild(removeElem);
    list.appendChild(todoElem);

    countCompleted();
}
/*
addTodo("Flutter");
addTodo("Deep Learning");
*/

function removeTodo(todoElem){
    list.removeChild(todoElem);    
    countCompleted();
}

function toggleDone(todoElem){
    todoElem.classList.toggle("done");
    countCompleted();
}

function handleKeyPress(event){
    const value = event.target.value;
    const key = event.key;

    if (key === "Enter" && value!== ""){
        addTodo(value,false);
        event.target.value = "";
    }
}

const input = rootElement.querySelector(".add-todo");
input.addEventListener('keypress', handleKeyPress);

function resetTodoList(){
    fetch('https://www.mocky.io/v2/5e7a000b3000007800930554')
    .then(r => r.json())
    .then(todosList => todosList.filter(todo => todo.userId === 1))
    .then(todosList => {
        console.log(todosList);
        return todosList;
    })
    .then(todosList => {
        list.innerHTML = "";
        todosList.forEach(todo => {
            addTodo(todo.title, todo.completed);
            })
    })
}

const reset = rootElement.querySelector(".reset-todo");
reset.addEventListener('click', resetTodoList);


function countCompleted(){
    
    const todosCompletedElem = rootElement.querySelector(".todos-completed");

    const todoCount = document.querySelectorAll(".todo-item").length;
    const doneCount = document.querySelectorAll(".done").length;

    if(todoCount === doneCount){
        todosCompletedElem.innerHTML = "All todos completed";
    }else {
        todosCompletedElem.innerHTML = `${doneCount} of ${todoCount} todos completed`;
    }
}

