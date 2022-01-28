import Container from './components/Project/Container';
import Card from './components/UI/Card';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Project from './type/Project';
import TodoItem from './type/TodoItem';

import { makeid } from './utils';

const defaultProject: Project[] = [
  {
    id: makeid(10),
    name: 'Default project',
    todoList: [
      {
        id: makeid(20),
        title: 'Getting started!',
        description: 'Try creating some new tasks!',
        dueDate: new Date(),
        priority: 'A',
        state: 'r',
      },
      {
        id: makeid(20),
        title: 'More and More!',
        description: 'Try marking something as done for the first time!',
        dueDate: new Date(),
        priority: 'A',
        state: 'r',
      },
    ],
  },
  {
    id: makeid(10),
    name: 'Add more project',
    todoList: [
      {
        id: makeid(20),
        title: 'sample',
        description: 'sample description as well',
        dueDate: new Date(),
        priority: 'B',
        state: 'r',
      },
    ],
  },
];

const logicWorkModule = (function () {
  const dataStr = localStorage.getItem('projectdata');
  let data: Project[] = [];
  if (dataStr === null) {
    data = defaultProject;
  } else {
    data = JSON.parse(dataStr);
    if (data.length === 0) {
      data = defaultProject;
    } else {
      data = data.map((project) => {
        return {
          id: project.id,
          name: project.name,
          todoList: project.todoList.map((item) => {
            return {
              id: item.id,
              title: item.title,
              description: item.description,
              priority: item.priority,
              state: item.state,
              dueDate: new Date(item.dueDate),
            };
          }),
        };
      });
    }
  }

  const updateTodoItem = (projectId: string, updatedItem: TodoItem) => {
    for (const project of data) {
      if (projectId === project.id) {
        for (const item of project.todoList) {
          if (item.id === updatedItem.id) {
            item.state = updatedItem.state;
            item.dueDate = updatedItem.dueDate;
            item.title = updatedItem.title;
            item.description = updatedItem.description;
            item.priority = updatedItem.priority;
          }
        }
      }
    }
    localStorage.setItem('projectdata', JSON.stringify(data));
  };

  const deleteTodoItem = (projectId: string, deletedItemId: string) => {
    for (const project of data) {
      if (project.id === projectId) {
        project.todoList = project.todoList.filter(
          (item) => item.id !== deletedItemId
        );
      }
    }
    localStorage.setItem('projectdata', JSON.stringify(data));
  };

  const addProject = (name: string) => {
    const newProject: Project = {
      id: makeid(10),
      name: name,
      todoList: [],
    };
    data.push(newProject);
    localStorage.setItem('projectdata', JSON.stringify(data));
    return newProject;
  };

  const addTodoItemToProject = (projectId: string, addedTodoItem: TodoItem) => {
    for (const project of data) {
      if (project.id === projectId) {
        project.todoList.push(addedTodoItem);
      }
    }
    localStorage.setItem('projectdata', JSON.stringify(data));
  };

  const getTodoList = (projectId: string) => {
    for (const project of data) {
      if (project.id === projectId) {
        return project.todoList;
      }
    }
    return [];
  };

  const getData = () => {
    return data;
  };

  return {
    addProject,
    addTodoItemToProject,
    updateTodoItem,
    deleteTodoItem,
    getTodoList,
    getData,
  };
})();

const header = Header();
const footer = Footer();
const container = Container(logicWorkModule.getData());

const root = Card(header, container, footer);
root.classList.add('root');
document.body.appendChild(root);

export { logicWorkModule };
