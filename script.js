const allTasks = [];

document.querySelector('form').addEventListener('submit', handleSubmitForm);

function handleSubmitForm(e) {
    e.preventDefault();

    let input = document.querySelector('input');
    let errorEntry = document.querySelector('.invalidEntry');
    errorEntry.style.display = "none"

    if (input.value != '') {
        // Task array implementation
        let taskId = UUID(getRandomInt(10)); 

        const currentTask = {
            id: taskId,
            value: input.value,
            done: false 
        }
        allTasks.push(currentTask);
    
        // Refreshing tasks & resetting input
        refreshTasks(taskId);
        input.value = "";
    } else {
        errorEntry.style.display = "block";
    }   
};

function refreshTasks(latestTaskId) {
    let ul = document.querySelector('ul');
    ul.innerHTML = "";

    // For loop to refresh all tasks and update the ul element with new li elements
    allTasks.forEach(currentTask => {
        let li = document.createElement('li');

        li.innerHTML = `
            <span class="todoItem">${currentTask.value}</span>
        `;

        // Deletebutton connected to the li element
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = `🗑️`;
        deleteButton.onclick = () => deleteTodo(currentTask);
        deleteButton.classList.add("deleteButton");

        li.appendChild(deleteButton);

        if (latestTaskId == currentTask.id) {
            deleteButton.classList.add("taskAdded");
            li.classList.add("taskAdded");
        }
        
        // Adding class to the li element & checks if the task in the array has the done argument set to true, if so it changes textDecoration attribute
        li.classList.add('todoListItem');

        li.addEventListener("click", () => {
            li.style.animationName = "";
            checkTodo(li, currentTask);
        })

        if (currentTask.done) {
            li.style.animationName = "checkTask"
        }

        ul.appendChild(li);
    });

    // Function to trigger taskcount refresh
    refreshTaskCount();
}

function refreshTaskCount() {
    let tasksCompleted = 0;
    pText = document.querySelector(".taskCompleted");
    
    // For loop to check all tasks that is marked with done & increases the tasksCompleted variabel
    allTasks.forEach(currentTask => {
        if (currentTask.done) {
            tasksCompleted++
        }
    });

    // Changes innerHTML to keep up with correct number of tasks completed
    pText.innerHTML =  tasksCompleted + " completed"
} 

function checkTodo(taskHandle, taskData) {
    let item = taskHandle;

    // if statement to see if the task is going to get "checked" or "unchecked" & some class changes
    item.style.animationName = "";

    if (item.classList.contains("taskAdded")) {
        item.classList.remove("taskAdded");
    }

    if (taskData.done) {
        item.style.animationName = "uncheckTask"
    } else {
        item.style.animationName = "checkTask"
    }

    // Updating the Array
    allTasks.forEach(currentTask => {
        if (currentTask.id == taskData.id) {
            currentTask.done = !currentTask.done;
        }
    });

    refreshTaskCount();
} 

function deleteTodo(task) {
    let item = task;

    // Looping all tasks and checking if id's match & splices the index from the array.

    for (let currentIndex = 0; currentIndex < allTasks.length; currentIndex++) {
        const currentTask = allTasks[currentIndex];
        
        if (currentTask.id == task.id) {
            allTasks.splice(currentIndex, 1);
        }
    }


    refreshTasks();
}

// Unique id creator to always get a unique id for each entry in the array (Thank you stack overflow)
function UUID(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let id = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }

    return Date.now().toString(16) + id;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}