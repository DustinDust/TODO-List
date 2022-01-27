import Card from '../UI/Card';
import TodoItem from '../../type/TodoItem';
import format from 'date-fns/format';
import {parse} from 'date-fns';

const stateToText: {[r: string]: string} = {
  r: 'In progress',
  d: 'Finished',
  o: 'Overdue',
};

const getStateFromText = (text: string): string => {
  for (const state in stateToText) {
    if (text === stateToText[state]) {
      return state;
    }
  }
  return 'r';
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

  const toggleEditable = () => {
    titleNode.contentEditable =
      titleNode.contentEditable === 'true' ? 'false' : 'true';
    descNode.contentEditable =
      descNode.contentEditable === 'true' ? 'false' : 'true';
    dueDateNode.disabled = !dueDateNode.disabled;
    priorityNode.disabled = !priorityNode.disabled;
    statusNode.disabled = !statusNode.disabled;
  };

  const getData = (): TodoItem => {
    return {
      id: item.id,
      title: titleNode.textContent!,
      description: descNode.textContent!,
      dueDate: parse(dueDateNode.value, 'yyyy-MM-dd', new Date()),
      priority: <'A' | 'B' | 'C' | 'D'>priorityNode.value!,
      state: <'r' | 'd' | 'o'>getStateFromText(statusNode.value!),
    };
  };

  //<'r' | 'd' | 'o'>
  const markAsDone = () => {
    statusNode.value = stateToText['d'];
    // adding some class to the node
  };

  return {
    node: CardContainer,
    toggleEditable,
    getData,
    markAsDone,
  };
};

export default TodoItemNode;
