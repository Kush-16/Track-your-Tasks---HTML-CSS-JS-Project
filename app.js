// selectors
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
todoButton.addEventListener("click", addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


// functions 
//prevent from default submit
function addToDo(event) {
    event.preventDefault();

    //ToDo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create LI
    const newToDo = document.createElement('li');
    //taking input from user and appending it to the main div
    newToDo.innerText = todoInput.value;

    //todo-item is for CSS purpose 
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);


    //Check mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to the list
    todoList.appendChild(todoDiv);
    // clearing todo input from the type box
    todoInput.value = null;

}


function deleteCheck(e) {
    // console.log(e.target);

    //grab item
    const item = e.target;

    //delete button working
    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentElement;
        //to make the element fall
        todo.classList.add("fall");
        //we should remove the todo.remove in order to make the delete animation look good
        //todo.remove();


        //Animation for falling
        todo.classList.add('fall');
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'pending':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

function saveLocalTodos(todo) {
    //check if the todo is empty or not
    let todos;
    if(localStorage.getItem('todos')==null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}




