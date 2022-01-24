import Card from "./UI/Card";
import { TodoData } from "..";
import Piority from "../type/Piority";
import TodoItemType from "../type/TodoItem";

const TodoList = (
  ...TodoItem: {
    id: number;
    content: Node;
    toggleEditable: () => void;
    getData: () => {
      title: string;
      description: string;
      due: Date;
      piority: Piority;
    };
  }[]
): HTMLUListElement => {
  const todoList = document.createElement("ul");
  for (let node of TodoItem) {
    const listItem: HTMLLIElement = document.createElement("li");
    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      listItem.remove();
      TodoData.deleteItemWithId(node.id);
    });
    const editButton: HTMLButtonElement = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      if (editButton.textContent === "Done") {
        editButton.textContent = "Edit";
        const updatedData = node.getData();
        const updatedItem: TodoItemType = {
          id: node.id,
          title: updatedData.title,
          description: updatedData.description,
          dueDate: updatedData.due,
          piority: updatedData.piority,
        };
        TodoData.updateItemWithId(updatedItem);
      } else {
        editButton.textContent = "Done";
      }
      node.toggleEditable();
    });
    const itemContainer = Card(node.content, deleteButton, editButton);
    listItem.appendChild(itemContainer);
    todoList.appendChild(listItem);
  }
  return todoList;
};

export default TodoList;
