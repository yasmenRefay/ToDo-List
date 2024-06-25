var inp = document.getElementById('task')
var btn = document.getElementById('btn')

btn.addEventListener('click',function(){
    addTask()
})



// to add data 

async function addTask(){
var obj = {
    title:inp.value,
    apiKey:"66794b8b60a208ee1fdbf9c2"
}
var result = await fetch('https://todos.routemisr.com/api/v1/todos', {
    method:'post',
    body:JSON.stringify(obj),
    headers:{'content-Type':'application/json'},
    cache:'default'
}) 
var a = await result.json()
if (a.message == 'success'){
    getAllToDo()
}
}


async function getAllToDo(){
    var result = await fetch('https://todos.routemisr.com/api/v1/todos/66794b8b60a208ee1fdbf9c2');
    var response = await result.json();
    console.log(response)
    console.log(response.todos)
    display(response.todos)
}

function display(allTasks){
    box=``;
    for( i=0 ; i<allTasks.length ; i++){
        box +=`
    <div  class=" ${allTasks[i].completed? 'bg-danger border-danger': ''} tasks my-3 p-2 rounded text-light d-flex justify-content-between">
        <div class="task">
            <p class="${allTasks[i].completed? 'text-decoration-line-through': ''} task-text m-0 p-0">${allTasks[i].title}</p>
        </div>
        <div>
            <i onclick="markCompleted('${allTasks[i]._id}')" class="fa-regular fa-circle-check"></i>
            <i onclick="deleteTodo('${allTasks[i]._id}')" class="fa-solid fa-trash mx-2"></i>
        </div>
    </div>
        `
    }
    document.getElementById('tasks').innerHTML=box
}

getAllToDo()


// to update data 
async function markCompleted(todos_id){
var obj={
    todoId:todos_id
}

var result = await fetch('https://todos.routemisr.com/api/v1/todos', {
    method:'put',
    body:JSON.stringify(obj),
    headers:{'content-Type':'application/json'},
    cache:'default'
}) 
var a = await result.json()
console.log(a)
if (a.message == 'success' ){
    getAllToDo()
    }
}


// to delete data 
async function deleteTodo(todos_id){
    var obj={
        todoId:todos_id
    }
    
    var result = await fetch('https://todos.routemisr.com/api/v1/todos', {
        method:'delete',
        body:JSON.stringify(obj),
        headers:{'content-Type':'application/json'}
    }) 
    var a = await result.json()
    console.log(a)
    if (a.message == 'success' ){
        getAllToDo()
        }
    }
