"use strict"

// fetch the stared data 
function fetchData(){
    let todos = JSON.parse(localStorage.getItem("todos"))
//  return  todos === null ? [] :  todos
    if (!todos) {
        todos = []
    }

    return todos
}

// add  the new data to the local storage
function store(data) {
    const data_str = JSON.stringify(data)
    localStorage.setItem("todos", data_str)
}

// function to filter 
function filtrage(l, f) {
    const filterError = document.querySelector("#filterError")
    let result = l.filter(function (x) {
        if ( f[1] ){
            return x.text.includes(f[0]) && !x.completed
        }else{
            return x.text.includes(f[0]) 
        }   
    })
    if (result.length){
        filterError.textContent = ""
        return result     
    }
    filterError.textContent = "No To-dos To Show"
    return result
}

// add to the DOM a new todos
function render(todo) {

    const todo_div = renderNewTodo(todo)
    todos_div.appendChild(todo_div)

}

// add the content of the new todo
function renderNewTodo(todo){

    let containerEl = document.createElement("div")
    let todo_div = document.createElement("label")
    todo_div.setAttribute("todo_id" ,todo.id)

    // checkbox to set the todos complete or incomplete
    let cheking = document.createElement("input")
    cheking.type = "checkbox"
    cheking.addEventListener("change",function(){
        changeTodoState(todo)
    })

    // text of todo
    let content = document.createElement("span")
    content.textContent = todo.text

    // button to delete the todo
    let btnDelete = document.createElement("button")
    btnDelete.classList.add("button" ,"button--text")
    btnDelete.textContent = "Remove"
    btnDelete.addEventListener("click",removeTodo)

    if (todo.completed ) {
        cheking.setAttribute("checked", "true")
    }

    containerEl.classList.add("list-item__container")
    containerEl.appendChild(cheking)
    containerEl.appendChild(content)

    todo_div.classList.add("list-item")
    todo_div.appendChild(containerEl)
    todo_div.appendChild(btnDelete)

    return todo_div
}

// render the added todos to the browser
function renderTodos(f, todos) {

    let list = filtrage(todos, f)
    todos_div.innerHTML = ""
    list.map(render)

    // render the number of incompleted todos
    let todos_true = list.filter(function (todo) {
        return !todo.completed
    })

    let letfTodos = document.querySelector(".h1")
    const plural = todos_true.length > 1 ? "s" : ""
    letfTodos.classList.add("list-title")
    if ( todos.length >  0){
        letfTodos.innerHTML = `you have <span class="incompleted">${todos_true.length} </span> thing${plural} left to do` 
    }else {
        letfTodos.innerHTML = "" 
    }   
}

// add new todo :
function addTodo(){
    document.querySelector("#add_form").addEventListener("submit", function (event) {
        event.preventDefault()
        if ( event.target.elements.todoText.value.trim() ){
            let text = event.target.elements.todoText.value
            let completed = event.target.elements.completed.checked
            todos.push({
                id: uuidv4(),
                text: text,
                completed: completed
            })
            todo_id++
            store(todos)
            renderTodos(filters, todos)
            event.target.elements.todoText.value = ""
        }
    })
}

// render only incompleted todos whene the checkbox is checked
function renderIncompletedTodos(){
    document.querySelector("#hideCompleted").addEventListener("change", function (e) {
        filters[1] = e.target.checked
        renderTodos(filters, todos)
    })
}

// remove a todo
function removeTodo(event){
    const li = event.target.parentElement
    const id = li.getAttribute("todo_id")
    const i_todo = todos.findIndex(function (todo){
        return todo.id == id
    })

    if (i_todo > -1){
        todos.splice(i_todo, 1)
        store(todos)
        renderTodos(filters, todos)
    }

}
// chnage todo state (completed/ incompleted)
function changeTodoState(todo){
    
    todo.completed = !todo.completed

    renderTodos(filters ,todos)
    store(todos)
    
}