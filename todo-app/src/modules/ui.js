import Storage from "./storage";
import Project from "./project";

class UI {
    static renderProjects() {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = "";

        const projects = Storage.loadProjects();
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.textContent = project.name;
            projectList.appendChild(projectElement);
        });
    }
}

export default UI;