import Piority from "../type/Piority";
import TodoItemType from "../type/TodoItem";
import Card from "./UI/Card";
import { parse } from "date-fns";

const TodoItem = ({
  id,
  title,
  description,
  piority,
  dueDate,
}: TodoItemType): {
  id: number;
  content: HTMLDivElement;
  toggleEditable: () => void;
  getData: () => {
    title: string;
    description: string;
    due: Date;
    piority: Piority;
  };
} => {
  const titleNode: HTMLHeadElement = document.createElement("h2");
  titleNode.textContent = `${title}`;
  const descNode: HTMLParagraphElement = document.createElement("p");
  descNode.textContent = description;
  const dueDateNode: HTMLInputElement = document.createElement("input");
  dueDateNode.type = "date";
  dueDateNode.value = `${dueDate.getFullYear()}-${(dueDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dueDate.getDate().toString().padStart(2, "0")}`;
  dueDateNode.disabled = true;
  const piorityNode: HTMLSelectElement = document.createElement("select");
  for (let piorityChoice of ["A", "B", "C", "D"]) {
    const option = document.createElement("option");
    option.textContent = piorityChoice;
    piorityNode.appendChild(option);
  }
  piorityNode.value = piority;
  piorityNode.disabled = true;

  const toggleEditable = () => {
    titleNode.contentEditable =
      titleNode.contentEditable === "true" ? "false" : "true";
    descNode.contentEditable =
      descNode.contentEditable === "true" ? "false" : "true";
    dueDateNode.disabled = !dueDateNode.disabled;
    piorityNode.disabled = !piorityNode.disabled;
  };

  const getData = () => {
    return {
      title: titleNode.textContent!,
      description: descNode.textContent!,
      due: parse(dueDateNode.value, "yyyy-MM-dd", dueDate)!,
      piority: <Piority>piorityNode.value!,
    };
  };

  return {
    id: id,
    content: Card(titleNode, descNode, dueDateNode, piorityNode),
    toggleEditable: toggleEditable,
    getData: getData,
  };
};

export default TodoItem;
