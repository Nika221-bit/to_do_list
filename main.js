const inputBox = document.getElementById('input-box');
const addBtn = document.querySelector('.add-btn');
const taskList = document.getElementById('Task');


addBtn.addEventListener('click', addTask);
inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    if (inputBox.value === '') {
        alert('Please enter a task');
    } else {
       const task = {text : inputBox.value,
                     done : false
       };
             let li = document.createElement("li");

             //img
             let img = document.createElement("img");
             img.src = ('images/unchecked.png')
             img.alt = 'unchecked';
             li.appendChild(img)   

            //span text
            let textSpan = document.createElement("span");
            textSpan.textContent = task.text;
            li.appendChild(textSpan)

            //delete btn
            let deletebtn = document.createElement("span")
            deletebtn.innerHTML = '\u00D7';
            deletebtn.className = 'delete-btn';
            li.appendChild(deletebtn)

            //add into JSON
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            li.dataset.index = tasks.length - 1;
            taskList.appendChild(li);

 

    }

    inputBox.value = '';
    inputBox.focus();
}

taskList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    
    if (!li) return;
    
    if (e.target.classList.contains('delete-btn')) {
        const index = li.dataset.index;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    }
    
    else if (e.target.tagName === 'IMG' || (e.target.tagName === 'SPAN' && !e.target.classList.contains('delete-btn'))) {
        const index = li.dataset.index;
        const img = li.querySelector('img');
        li.classList.toggle('checked');
        
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].done = li.classList.contains('checked');
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        if (li.classList.contains('checked')) {
            img.src = 'images/checked.png';
            img.alt = 'checked';
        } else {
            img.src = 'images/unchecked.png';
            img.alt = 'unchecked';
        }
    }
});
//data
function createTaskElement(task, index) {
    let li = document.createElement("li");
    
    let img = document.createElement("img");
    img.src = task.done ? 'images/checked.png' : 'images/unchecked.png';
    img.alt = task.done ? 'checked' : 'unchecked';
    li.appendChild(img);
    
    let textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    li.appendChild(textSpan);
    
    let deletebtn = document.createElement("span");
    deletebtn.innerHTML = '\u00D7';
    deletebtn.className = 'delete-btn';
    li.appendChild(deletebtn);
    
    if (task.done) {
        li.classList.add('checked');
    }
    
    li.dataset.index = index;
    taskList.appendChild(li);
}

window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => {
        createTaskElement(task, index);
    });
});


