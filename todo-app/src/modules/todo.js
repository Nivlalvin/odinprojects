class Todo{
    constructor(title, description, dueDate, priority, notes = '', checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    editDetails({title, description, dueDate, priority, notes, checklist}) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (dueDate) this.dueDate = dueDate;
    if (priority) this.priority = priority;
    if (notes) this.notes = notes;
    if (checklist) this.checklist = checklist;
    }
}

export default Todo;