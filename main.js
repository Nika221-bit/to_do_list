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
        let li = document.createElement('li');
        
        let img = document.createElement('img');
        img.src = 'images/unchecked.png';
        img.alt = 'unchecked';
        li.appendChild(img);
        
      
        let textSpan = document.createElement('span');
        textSpan.textContent = inputBox.value;
        li.appendChild(textSpan);
        
        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = '\u00D7';
        deleteBtn.className = 'delete-btn';
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    }
    inputBox.value = '';
    inputBox.focus();
}

taskList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    
    if (!li) return;
    
    
    if (e.target.classList.contains('delete-btn')) {
        li.remove();
    }
    
    else if (e.target.tagName === 'IMG' || (e.target.tagName === 'SPAN' && !e.target.classList.contains('delete-btn'))) {
        const img = li.querySelector('img');
        li.classList.toggle('checked');
        
        if (li.classList.contains('checked')) {
            img.src = 'images/checked.png';
            img.alt = 'checked';
        } else {
            img.src = 'images/unchecked.png';
            img.alt = 'unchecked';
        }
    }
});