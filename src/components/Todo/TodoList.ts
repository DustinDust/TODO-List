import TodoItemNode from './TodoItem';
import TodoItem from '../../type/TodoItem';
import Card from '../UI/Card';
import { logicWorkModule } from '../../index';
import TodoInput from '../Input/TodoInput';

export const createTodoCard = (todoItem: TodoItem, projectId: string) => {
  const { node, toggleEditable, getData, markAsDone } = TodoItemNode(
    projectId,
    todoItem
  );
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');
  const markAsDoneButton = document.createElement('button');
  const itemContainerNode = Card(
    node,
    deleteButton,
    editButton,
    markAsDoneButton
  );

  deleteButton.textContent = 'Delete';
  editButton.textContent = 'Edit';
  markAsDoneButton.textContent = 'Mark as done';
  deleteButton.addEventListener('click', () => {
    itemContainerNode.remove();
    const deletedItem = getData();
    logicWorkModule.deleteTodoItem(projectId, deletedItem.id);
  });
  editButton.addEventListener('click', () => {
    if (editButton.textContent === 'Edit') {
      editButton.textContent = 'Done';
      toggleEditable();
    } else if (editButton.textContent === 'Done') {
      editButton.textContent = 'Edit';
      toggleEditable();
      const editedData = getData();
      logicWorkModule.updateTodoItem(projectId, editedData);
    }
  });
  markAsDoneButton.addEventListener('click', () => {
    markAsDone();
    const updatedData = getData();

    logicWorkModule.updateTodoItem(projectId, updatedData);
  });

  return itemContainerNode;
};

const TodoList = (projectId: string, itemList: TodoItem[]) => {
  const itemNodeList = [];
  for (const item of itemList) {
    const itemContainerNode = createTodoCard(item, projectId);
    itemNodeList.push(itemContainerNode);
  }
  const addTodo = document.createElement('button');
  addTodo.addEventListener('click', () => {
    TodoInput();
  });
  addTodo.textContent = 'Add a todo';
  const todoList = Card(...itemNodeList, addTodo);
  todoList.classList.add('todo-list');
  todoList.setAttribute('project-id', projectId);
  return todoList;
};

export default TodoList;
