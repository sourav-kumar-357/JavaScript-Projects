const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
    <div class="left-side">
      <div class="status-circle"></div>
      <span class="task-text">${text}</span>
    </div>
    <button class="delete-btn">🗑️</button>
  `;

    const left = li.querySelector('.left-side');
    const delBtn = li.querySelector('.delete-btn');

    left.addEventListener('click', () => {
        li.classList.toggle('done');
        sortTasks();
    });

    delBtn.addEventListener('click', () => {
        li.remove();
    });

    taskList.appendChild(li);
    sortTasks();
    input.value = '';
}

function sortTasks() {
    const items = [...taskList.children];
    items.sort((a, b) => {
        return a.classList.contains('done') - b.classList.contains('done');
    });
    items.forEach(item => taskList.appendChild(item));
}
