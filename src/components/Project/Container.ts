import { logicWorkModule } from '../..';
import Card from '../UI/Card';
import Project from '../../type/Project';
import ProjectItem from './ProjectItem';
import TodoList from '../Todo/TodoList';
import ProjectInput from '../Input/ProjectInput';

const Container = (data: Project[]) => {
  const container = document.createElement('div');

  container.classList.add('container');
  const addProjectButton: HTMLButtonElement = document.createElement('button');
  addProjectButton.textContent = 'Add new project';
  addProjectButton.addEventListener('click', () => {
    ProjectInput();
  });

  const projectList = [];
  let activated = false;
  for (const project of data) {
    const projectCard = ProjectItem(project);
    projectCard.setAttribute('project-id', project.id);
    projectCard.classList.add('project-card');
    if (!activated) {
      projectCard.classList.add('active-project');
      activated = true;
    }
    projectList.push(projectCard);
    projectCard.addEventListener('click', () => {
      document
        .querySelector('.active-project')
        ?.classList.toggle('active-project');
      projectCard.classList.toggle('active-project');
      const ndptdl = TodoList(
        project.id,
        logicWorkModule.getTodoList(project.id)!
      );
      const currentDisplay =
        container.childNodes[container.childNodes.length - 1];
      currentDisplay.remove();
      container.appendChild(ndptdl);
    });
  }
  const currentActive = projectList[0];
  const displayTodoList = TodoList(
    currentActive?.getAttribute('project-id')!,
    logicWorkModule.getTodoList(currentActive?.getAttribute('project-id')!)
  );
  const projectListCard = Card(...projectList);
  projectListCard.classList.add('project-list');
  projectListCard.appendChild(addProjectButton);
  container.appendChild(projectListCard);
  container.appendChild(displayTodoList);
  return container;
};

export default Container;
