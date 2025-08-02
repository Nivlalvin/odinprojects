// Storage.js
import Project from './project'; // Ensure you import the Project class

const Storage = {
    saveProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    },
    loadProjects() {
        const projects = localStorage.getItem('projects');
        if (projects) {
            const parsedProjects = JSON.parse(projects);
            // Convert plain objects back to Project instances
            return parsedProjects.map(proj => {
                const project = new Project(proj.name);
                project.todos = proj.todos; // Assuming todos are plain objects
                return project;
            });
        }
        return [];
    }
};

export default Storage;