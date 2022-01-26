import Card from '../UI/Card';
import TodoItem from '../../type/TodoItem';
import format from 'date-fns/format';

const stateToText: {[r: string]: string} = {
  r: 'In progress',
  d: 'Finished',
  o: 'Overdue',
};

const TodoItemNode = (projectId: string, item: TodoItem) => {
  const titleNode: HTMLHeadingElement = document.createElement('h3');
  const descNode: HTMLParagraphElement = document.createElement('p');
  const dueDateNode: HTMLInputElement = document.createElement('input');
  const priorityNode: HTMLSelectElement = document.createElement('select');
  const statusNode = document.createElement('select');
  for (const ch of 'ABCD') {
    const option: HTMLOptionElement = document.createElement('option');
    option.textContent = ch;
    priorityNode.appendChild(option);
  }
  for (const state in stateToText) {
    const selectoption = document.createElement('option');
    selectoption.textContent = stateToText[state];
    statusNode.appendChild(selectoption);
  }
  titleNode.textContent = item.title;
  descNode.textContent = item.description;
  dueDateNode.type = 'date';
  dueDateNode.value = format(item.dueDate, 'yyyy-MM-dd');
  dueDateNode.disabled = true;
  priorityNode.value = item.priority;
  priorityNode.disabled = true;
  statusNode.value = stateToText[item.state];
  statusNode.disabled = true;

  const CardContainer = Card(
    titleNode,
    descNode,
    dueDateNode,
    priorityNode,
    statusNode
  );
  CardContainer.setAttribute('todo-item-id', item.id);
  CardContainer.setAttribute('project-id', projectId);

  return CardContainer;
};

export default TodoItemNode;
