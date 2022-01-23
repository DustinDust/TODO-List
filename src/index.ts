import "./styles/style.css";
import TodoItem from "./components/TodoItem";
import TodoItemType from "./type/TodoItem";
import TodoList from "./components/TodoList";

import { addDays } from "date-fns";

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
  let list: TodoItemType[] = todoItems.map((val) => val);
  const updateList = (newItem: TodoItemType) => {
    for (const item of list) {
      if (item.id === newItem.id) {
        item.title = newItem.title;
        item.description = newItem.description;
        item.dueDate = newItem.dueDate;
        item.piority = newItem.piority;
      }
    }
  };

  const deleteItem = (id: number) => {
    list = list.filter((item) => item.id !== id);
    console.log(list);
  };

  return {
    data: list,
    updateItemWithId: updateList,
    deleteItemWithId: deleteItem,
  };
})([todoItem1, todoItem2]);

const demoitem = TodoItem(todoItem1);
const demoitem2 = TodoItem(todoItem2);

document.body.appendChild(TodoList(demoitem, demoitem2));

export { TodoData };
