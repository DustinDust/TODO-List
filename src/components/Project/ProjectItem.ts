import Card from '../UI/Card';
import Project from '../../type/Project';
import { logicWorkModule } from '../..';

const ProjectItem = (item: Project) => {
  const projectNameNode = document.createElement('h2');
  projectNameNode.textContent = item.name;
  const projectCard = Card(projectNameNode);
  projectCard.setAttribute('project-id', item.id);

  return projectCard;
};

export default ProjectItem;
