import Card from "./UI/Card";
import { TodoData } from "..";

const TodoList = (
  ...TodoItem: { id: number; content: Node; toggleEditable: () => void }[]
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
      editButton.textContent =
        editButton.textContent === "Edit" ? "Done" : "Edit";
      node.toggleEditable();
    });
    const itemContainer = Card(node.content, deleteButton, editButton);
    listItem.appendChild(itemContainer);
    todoList.appendChild(listItem);
  }
  return todoList;
};

export default TodoList;
