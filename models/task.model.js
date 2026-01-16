class Task {
  constructor({ id, title, description, completed = false }) {
    if (!title) {
      throw new Error('Titulo obligatorio');
    }
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
  }
  toggleComplete() {
    this.completed = !this.completed;
  }
}

module.exports = Task;