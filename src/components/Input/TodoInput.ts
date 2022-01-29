import Modal from '../UI/Modal';
import TodoItem from '../../type/TodoItem';
import {makeid} from '../../utils';
import {parse} from 'date-fns';
import {logicWorkModule} from '../..';
import TodoItemNode from '../Todo/TodoItem';
import {createTodoCard} from '../Todo/TodoList';

const TodoInput = () => {
  const form = document.createElement('form');
  form.classList.add('form-input');
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'title';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.placeholder = 'Some description for you todo';
  const dueDateInput = document.createElement('input');
  dueDateInput.value = '2022-01-01';
  dueDateInput.type = 'date';
  const priorityInput = document.createElement('select');
  for (const ch of 'ABCD') {
    const option = document.createElement('option');
    option.textContent = ch;
    option.value = ch;
    priorityInput.appendChild(option);
  }
  priorityInput.value = 'A';
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Done';
  form.appendChild(titleInput);
  form.appendChild(descriptionInput);
  form.appendChild(dueDateInput);
  form.appendChild(priorityInput);
  form.appendChild(submitButton);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (
      titleInput.value.length <= 0 ||
      dueDateInput.value.length <= 0 ||
      !/[ABCD]/.test(priorityInput.value)
    ) {
      clear();
      return;
    }
    const newTodo: TodoItem = {
      id: makeid(20),
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: parse(dueDateInput.value, 'yyyy-MM-dd', new Date()),
      priority: <'A' | 'B' | 'C' | 'D'>priorityInput.value,
      state: 'r',
    };

    const currentProject = document.querySelector('.active-project');
    if (currentProject === null) {
      clear();
      return;
    }
    const currentProjectId = currentProject?.getAttribute('project-id');
    if (currentProjectId === undefined) {
      clear();
      return;
    }
    logicWorkModule.addTodoItemToProject(currentProjectId!, newTodo);

    const todoItemNode = createTodoCard(newTodo, currentProjectId!);
    const currentTodoList = document.querySelector(
      `.todo-list[project-id=${currentProjectId}]`
    );
    if (currentTodoList === null) {
      clear();
      return;
    }
    currentTodoList.insertBefore(
      todoItemNode,
      currentTodoList.children[currentTodoList.children.length - 1]
    );
    clear();
  });

  const discardButton = document.createElement('button');
  discardButton.textContent = 'Exit';

  const {show, clear} = Modal(form, discardButton);
  discardButton.addEventListener('click', () => {
    clear();
  });
  show();
};

export default TodoInput;
