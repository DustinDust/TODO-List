import {logicWorkModule} from '../..';
import Card from '../UI/Card';
import Project from '../../type/Project';
import ProjectItem from './ProjectItem';
import TodoList from '../Todo/TodoList';

const Container = (data: Project[]) => {
  const container = document.createElement('div');
  const selectedProject = data[0];
  const displayTodoList = TodoList(
    selectedProject.id,
    selectedProject.todoList
  );
  const projectList = [];
  for (const project of data) {
    const projectCard = ProjectItem(project);
    if (project.id === selectedProject.id) {
      projectCard.classList.toggle('activated-project');
    }
    projectList.push(projectCard);
    projectCard.addEventListener('click', () => {
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
  const projectListCard = Card(...projectList);
  container.appendChild(projectListCard);
  container.appendChild(displayTodoList);
  return container;
};

export default Container;
