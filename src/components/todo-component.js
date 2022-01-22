import { LitElement, html, css } from 'lit';

const toDoFilter = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed',
};

export class Todo extends LitElement {
  static get styles() {
    return css`
      #todo-wrapper {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .todo-lists {
        width: 100%;
      }
      #filters {
        display: flex;
        flex-direction: row;
      }
    `;
  }

  static get properties() {
    return {
      task: { type: String },
      todos: { type: Array },
      filter: { type: String },
    };
  }

  constructor() {
    super();
    this.task = '';
    this.todos = JSON.parse(localStorage.getItem('todos'));
    this.filter = toDoFilter.SHOW_ALL;
  }

  render() {
    return html`
      <div id="todo-wrapper">
        <h1>Create a TODO</h1>
        <div class="input-container">
          <input
            placeholder="Task"
            .value=${this.task}
            @change=${this.handleChange}
          />
          <button @click="${this.addTodo}">Add Todo</button>
        </div>
        <div class="todo-lists">
          ${this.filterTodo(this.todos).map(
            (todo) =>
              html`
                <div class="todo-item">
                  <input
                    type="checkbox"
                    .checked=${todo.complete}
                    @change=${(event) =>
                      this.updateStatus(todo, event.target.checked)}
                  /><label>${todo.task}</label>
                </div>
              `
          )}
        </div>
        <div id="filters">
          <div id="radio-btn-group">
            ${Object.values(toDoFilter).map(
              (filter) =>
                html`
                  <input
                    name="filters"
                    type="radio"
                    value=${filter}
                    @click=${this.handleFilterChange}
                  /><label>${filter}</label>
                `
            )}
          </div>
          <button @click=${this.handleRemove}>Clear Completed</button>
        </div>
      </div>
    `;
  }
  storeTodo(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  handleRemove() {
    this.todos = this.todos.filter((todo) => {
      if (!todo.complete) return todo;
    });
    this.storeTodo(this.todos);
  }
  handleFilterChange(e) {
    this.filter = e.target.value;
  }
  filterTodo(todos) {
    if (this.filter === toDoFilter.SHOW_ACTIVE) {
      return todos.filter((todo) => !todo.complete);
    } else if (this.filter === toDoFilter.SHOW_COMPLETED) {
      return todos.filter((todo) => todo.complete);
    }
    return todos;
  }

  handleChange(event) {
    this.task = event.target.value;
  }
  addTodo() {
    if (this.task) {
      this.todos.push({ task: this.task, complete: false });
      this.storeTodo(this.todos);

      this.task = '';
    }
  }
  updateStatus(todo, status) {
    this.todos.forEach((item, index) => {
      if (item === todo) {
        this.todos[index].complete = status;
      }
    });
    this.storeTodo(this.todos);
  }
}

customElements.define('todo-component', Todo);
