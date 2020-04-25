"use strict"

const todos = fetchData()
const todos_div = document.querySelector("#todos")
let filters = ["",false]

// render the todos list to the browser
renderTodos(filters, todos)

let todo_id = document.querySelector("ul").childElementCount 

// render the filtered list 
document.querySelector("#search").addEventListener("input",function(e){
    filters[0] = e.target.value
    renderTodos(filters ,todos)
})

// add new todo :
addTodo()

// render only incompleted todos
renderIncompletedTodos()





