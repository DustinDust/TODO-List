import Modal from '../UI/Modal';
import {logicWorkModule} from '../../index';
import ProjectItem from '../Project/ProjectItem';
import TodoList from '../Todo/TodoList';

const ProjectInput = () => {
  const form = document.createElement('form');
  form.classList.add('form-input');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Project name';
  const submitButton = document.createElement('button');
  const discardButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Done';
  discardButton.textContent = 'Exit';
  form.appendChild(nameInput);
  form.appendChild(submitButton);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    if (name.length <= 0) {
      clear();
      return;
    }
    const newProject = logicWorkModule.addProject(name);
    nameInput.value = '';
    const list = document.querySelector('.project-list');
    const projectCard = ProjectItem(newProject);
    projectCard.setAttribute('project-id', newProject.id);
    projectCard.classList.add('project-card');
    projectCard.addEventListener('click', () => {
      document
        .querySelector('.active-project')
        ?.classList.remove('active-project');
      projectCard.classList.add('active-project');
      const container = document.querySelector('.container');
      const todoList = TodoList(
        newProject.id,
        logicWorkModule.getTodoList(newProject.id)
      );
      container?.removeChild(container.children[container.children.length - 1]);
      container?.appendChild(todoList);
    });
    list?.insertBefore(projectCard, list.children[list.children.length - 1]);
    clear();
  });

  const {show, clear} = Modal(form, discardButton);

  discardButton.addEventListener('click', () => {
    clear();
  });

  show();
};

export default ProjectInput;
