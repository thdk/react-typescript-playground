import { TodoFilter } from "../interfaces";

const fakeDatabase = {
    todos: [
        {
            id: 0,
            text: 'hey',
            completed: true
        },
        {
            id: 0,
            text: 'ho',
            completed: true
        },
        {
            id: 0,
            text: 'Let\'s',
            completed: true
        },
        {
            id: 0,
            text: 'go!',
            completed: false
        }
    ]
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter: TodoFilter) =>
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => !t.completed);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });