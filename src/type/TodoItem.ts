type TodoItem = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'A' | 'B' | 'C' | 'D';
  state: 'r' | 'd' | 'o';
};

export default TodoItem;
