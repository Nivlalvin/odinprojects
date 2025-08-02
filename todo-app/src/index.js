import Project from './modules/project';
import Todo from './modules/todo';
import Storage from './modules/storage';
import "./styles.css";

// DOM Elements
const projectListEl = document.getElementById('project-list');
const addProjectBtn = document.getElementById('add-project-btn');
const projectTitleEl = document.getElementById('project-title');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoListEl = document.getElementById('todo-list');
const removeProjectBtn = document.getElementById('remove-project-btn');

let projects = Storage.loadProjects();
if (!Array.isArray(projects)) projects = []; // Fix in case of bad data
let currentProject = projects[0] || new Project('Default Project');

if (projects.length === 0) {
    projects.push(currentProject);
    Storage.saveProjects(projects);
}

// Initialize App
function init() {
    renderProjects();
    renderTodos();
}

// Render Projects in Sidebar
function renderProjects() {
    projectListEl.innerHTML = '';

    projects.forEach((project) => {
        const projectEl = document.createElement('li');
        projectEl.textContent = project.name;
        projectEl.classList.add('project-item');
        if (project === currentProject) {
            projectEl.classList.add('active');
        }
        projectEl.addEventListener('click', () => {
            currentProject = project;
            projectTitleEl.textContent = project.name;
            renderTodos();
        });
        projectListEl.appendChild(projectEl);
    });
}

// Render Todos for Current Project
function renderTodos() {
    todoListEl.innerHTML = '';

    currentProject.todos.forEach((todo, index) => {
        const todoEl = document.createElement('div');
        todoEl.classList.add('todo-item', todo.priority);
        todoEl.innerHTML = `
            <div>
                <span style="font-weight: bold; font-size: 1.2em;">${todo.title}</span> - 
                <span>${todo.description}</span> 
                by <span style="font-weight: bold; color: #007bff;">${todo.dueDate}</span>  
                <i style="color: #ff6347;">${todo.priority}</i>
            </div>
            <button data-index="${index}">Delete</button>
        `;

        todoEl.querySelector('button').addEventListener('click', () => {
            currentProject.todos.splice(index, 1);
            Storage.saveProjects(projects);
            renderTodos();
        });

        todoListEl.appendChild(todoEl);
    });
}

// Add New Project
addProjectBtn.addEventListener('click', () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
        const newProject = new Project(projectName);
        projects.push(newProject);
        Storage.saveProjects(projects);
        renderProjects();
    }
});

// Remove Project
removeProjectBtn.addEventListener('click', () => {
    if (projects.length <= 1) {
        alert("You must have at least one project!");
        return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete "${currentProject.name}"?`);
    if (!confirmDelete) return;

    // Remove the current project from the array
    projects = projects.filter(proj => proj !== currentProject);

    // Update current project to another available project
    currentProject = projects[0] || new Project('Default Project');

    // Update UI
    projectTitleEl.textContent = currentProject.name;
    Storage.saveProjects(projects);
    renderProjects();
    renderTodos();
});

// Add New Todo
addTodoBtn.addEventListener('click', () => {
    const title = prompt('Todo Title:');
    const description = prompt('Description:');
    const dueDate = prompt('Due Date (YYYY-MM-DD):');
    const priority = prompt('Priority (high, medium, low):');

    if (title && dueDate && priority && description) {
        const newTodo = new Todo(title, description, dueDate, priority);
        currentProject.addTodo(newTodo);
        Storage.saveProjects(projects);
        renderTodos();
    } else {
        alert("Please fill in all fields.");
    }
});

// Start App
init();