import Project from "./type/Project";
import TodoItem from "./type/TodoItem";

import { makeid } from "./utils";

const logicWorkModule = (function () {
  const dataStr = localStorage.getItem("projectdata");
  let data: Project[] = [];
  if (dataStr === null) {
    data = [
      {
        id: makeid(10),
        name: "Default project",
        todoList: [
          {
            id: makeid(20),
            title: "Getting started!",
            description: "Try creating some new tasks!",
            dueDate: new Date(),
            priority: "A",
            state: "r",
          },
        ],
      },
    ];
  } else {
    data = JSON.parse(dataStr);
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
    localStorage.setItem("projectdata", JSON.stringify(data));
  };

  const deleteTodoItem = (projectId: string, deletedItemId: string) => {
    for (const project of data) {
      if (project.id === projectId) {
        project.todoList = project.todoList.filter(
          (item) => item.id !== deletedItemId
        );
      }
    }
    localStorage.setItem("projectdata", JSON.stringify(data));
  };

  const deleteProject = (projectId: string) => {
    data = data.filter((project) => project.id !== projectId);
    localStorage.setItem("projectdata", JSON.stringify(data));
  };

  const addProject = (name: string) => {
    const newProject: Project = {
      id: makeid(10),
      name: name,
      todoList: [],
    };
    data.push(newProject);
    localStorage.setItem("projectdata", JSON.stringify(data));
  };

  const addTodoItemToProject = (projectId: string, addedTodoItem: TodoItem) => {
    for (const project of data) {
      if (project.id === projectId) {
        project.todoList.push(addedTodoItem);
      }
    }
    localStorage.setItem("projectdata", JSON.stringify(data));
  };

  const getTodoList = (projectId: string) => {
    for (const project of data) {
      if (project.id === projectId) {
        return project.todoList;
      }
    }
  };

  const getData = () => {
    return data;
  };

  return {
    addProject,
    addTodoItemToProject,
    updateTodoItem,
    deleteProject,
    deleteTodoItem,
    getTodoList,
  };
})();
