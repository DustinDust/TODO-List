import Piority from "./Piority";

type TodoItemType = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  piority: Piority;
};
export default TodoItemType;
