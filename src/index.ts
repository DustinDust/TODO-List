import "./styles/style.css";
import TodoItem from "./components/TodoItem";
import TodoItemType from "./type/TodoItem";
import TodoList from "./components/TodoList";

import { addDays } from "date-fns";
import _ from "lodash";
import Piority from "./type/Piority";

const todoItem1: TodoItemType = {
  id: 0,
  title: "demo",
  description: "demo-desc",
  piority: "A",
  dueDate: addDays(new Date(), 7),
};

const todoItem2: TodoItemType = {
  id: 1,
  title: "demo",
  description: "demo-desc2",
  piority: "B",
  dueDate: new Date(),
};

const TodoData = (function (todoItems: TodoItemType[]) {
  const exist: boolean[] = new Array(100000);
  exist.fill(false);

  let list = todoItems.map((item) => {
    exist[item.id] = true;
    return item;
  });

  const saveToLocalStorage = () => {
    if (localStorage.getItem("todolist") !== null) {
      localStorage.removeItem("todolist");
    }
    localStorage.setItem("todolist", JSON.stringify(list));
  };

  const addItem = (
    title: string,
    desc: string,
    due: Date,
    piority: Piority
  ) => {
    let id = -1;
    for (let i = 0; i < exist.length; i++) {
      if (exist[i] === false) {
        id = i;
        exist[i] = true;
        break;
      }
    }
    if (id != -1) {
      const newItem: TodoItemType = {
        id: id,
        title: title,
        description: desc,
        dueDate: due,
        piority: piority,
      };
      list.push(newItem);
    }
    saveToLocalStorage();
  };

  const updateList = (newItem: TodoItemType) => {
    for (const item of list) {
      if (item.id === newItem.id) {
        item.title = newItem.title;
        item.description = newItem.description;
        item.dueDate = newItem.dueDate;
        item.piority = newItem.piority;
      }
    }
    saveToLocalStorage();
  };

  const deleteItem = (id: number) => {
    list = list.filter((item) => item.id !== id);
    exist[id] = false;
    saveToLocalStorage();
  };

  return {
    data: list,
    updateItemWithId: updateList,
    deleteItemWithId: deleteItem,
    addItem: addItem,
  };
})([todoItem1, todoItem2]);

const demoitem = TodoItem(todoItem1);
const demoitem2 = TodoItem(todoItem2);

document.body.appendChild(TodoList(demoitem, demoitem2));

export { TodoData };
