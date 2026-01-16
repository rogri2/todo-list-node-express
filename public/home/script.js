const API_URL = '/api/tasks';

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');

async function fetchToDoList() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  if (tasks.length === 0) {
    list.innerHTML = '<p>No hay tareas!</p>';
    return;
  }
  else {
    list.innerHTML = '';
  }

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'taskClass';
    taskItem.id = task.id;
    taskItem.innerHTML = `
      <input type="checkbox" name="task" class="taskCheckbox" ${task.completed ? 'checked' : ''} />
      <label style="font-weight: bold">${task.title}</label>
      ${task.description !== '' ? `<label>${task.description}</label>` : ''}
      <button class="taskDelete taskButton">🗑️</button>
    `;
    list.appendChild(taskItem);
  });
}

async function toggleTask(id, checkbox) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
  });

  const updatedTask = await res.json();
  console.log('Updated task:', updatedTask);
  checkbox.checked = updatedTask.completed;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('title', taskName.value);
  console.log('description', taskDescription.value);
  const data = {
    title: taskName.value,
    description: taskDescription.value,
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  form.reset();
  fetchToDoList();
});

list.addEventListener('change', async (e) => {
  if (!e.target.classList.contains('taskCheckbox')) return;

  const taskItem = e.target.closest('.taskClass');
  toggleTask(taskItem.id, e.target);
});

list.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('taskDelete')) return;
  const taskItem = e.target.closest('.taskClass');
  await fetch(`${API_URL}/${taskItem.id}`, {
    method: 'DELETE',
  });
  fetchToDoList();
});

fetchToDoList();