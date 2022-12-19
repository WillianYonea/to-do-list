

// Seleção dos elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#list-container");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;


// Funções
const saveTodo = (text) => {
    
    const todo = document.createElement("div")
    todo.classList.add("task")

    const taskDescription = document.createElement("h3")
    taskDescription.classList.add("task-description")
    taskDescription.innerText = text
    todo.appendChild(taskDescription)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    const img1 = document.createElement("img")
    img1.src = "img/circle-check-solid.svg"
    doneBtn.appendChild(img1)
    todo.appendChild(doneBtn)
    

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    const img2 = document.createElement("img")
    img2.src = "img/pencil-solid.svg"
    editBtn.appendChild(img2)
    todo.appendChild(editBtn)

    const removeTodo = document.createElement("button")
    removeTodo.classList.add("remove-todo")
    const img3 = document.createElement("img")
    img3.src = "img/trash-solid.svg"
    removeTodo.appendChild(img3)
    todo.appendChild(removeTodo)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".task")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};

// Eventos
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault(); //Faz com que o formulário não seja enviado quando pressionado o botão

    const inputValue = todoInput.value


    //Mini validação caso o usuário não digite nada
    if(inputValue){
        saveTodo(inputValue);
    }
})

//Evento de click para todo o documento
document.addEventListener("click", (e) => {
    
    const targetEl = e.target;
    // console.log(targetEl)
    const parentEl = targetEl.closest("div"); //Seleciona o elemento pai mais próximo do targetEl
    // console.log(parentEl)
    let todoTitle;

    //verificar se há um parent elemente e se é igual ao h3
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }

    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value;

    if(editInputValue){
        //atualizar
        updateTodo(editInputValue)
    }

    toggleForms();
})


