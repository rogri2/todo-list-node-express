const API_URL = 'http://localhost:3000/api/tasks';

async function fetchToDoList() {
  const res = await fetch(API_URL);
  console.log(await res.json());
}

fetchToDoList();