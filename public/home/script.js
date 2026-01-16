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
    taskItem.innerHTML =
      task.description !== '' ? `
    <div class="checkboxWrapper">
      <input type="checkbox" name="task" class="taskCheckbox" ${task.completed ? 'checked' : ''} />
    </div>
    <div class="taskInfo hasModal">
      <div class="titleWrapper">
        <p class="taskTitle">${task.title}</p>
      </div>
      <div class="descriptionWrapper">
        <p class="taskDescription">
          ${task.description}
        </p>
      </div>
    </div>
    <div class="taskActions">
      <button class="taskDelete taskButton button" type="button">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>
    ` : `
    <div class="checkboxWrapper">
      <input type="checkbox" name="task" class="taskCheckbox" ${task.completed ? 'checked' : ''} />
    </div>
    <div class="taskInfo">
      <p class="taskTitle">${task.title}</p>
    </div>
    <div class="taskActions">
      <button class="taskDelete taskButton button" type="button">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    </div>
    `;
    list.appendChild(taskItem);
  });
}

async function toggleTask(id, checkbox) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
  });

  const updatedTask = await res.json();
  checkbox.checked = updatedTask.completed;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    title: taskName.value.trim(),
    description: taskDescription.value.trim(),
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
  const deleteBtn = e.target.closest('.taskDelete');
  if (!deleteBtn) return;

  const taskItem = e.target.closest('.taskClass');
  await fetch(`${API_URL}/${taskItem.id}`, {
    method: 'DELETE',
  });
  fetchToDoList();
});

const modal = document.getElementById('taskModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.getElementById('modalClose');

list.addEventListener('click', (e) => {
  const descriptionWrapper = e.target.closest('.hasModal');
  if (!descriptionWrapper) return;
  const taskItem = e.target.closest('.taskClass');
  const title = taskItem.querySelector('.taskTitle').textContent;
  const description = taskItem.querySelector('.taskDescription').textContent;
  openModal(title, description);
  modal.classList.remove('hidden')
})

modalClose.addEventListener('click', closeModal)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

function openModal(title, description) {
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modal.classList.add('show')
}

function closeModal() {
  modal.classList.remove('show')
}

fetchToDoList();