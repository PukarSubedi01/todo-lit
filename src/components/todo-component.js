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
        width: 50%;
        display: flex;

        align-items: center;
        flex-direction: column;
        background: #f5f5f5;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        padding: 40px;
        border-radius: 40px;
      }
      .input-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0 auto;
      }
      .input-container input {
        width: 60%;
        border: none;
        font-size: 1em;
        border: 1px solid blue;
        border-radius: 10px;
        background: #e4e7ee;
      }
      .input-container button {
        margin-left: 20px;
        font-size: 0.8em;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: #4c6ab4;
        color: white;
      }
      .todo-lists {
        margin-top: 10px;
        margin-bottom: 20px;
      }
      .todo-item {
        margin-top: 20px;
      }
      .todo-item label {
        margin-left: 10px;
        font-size: 1.2em;
      }
      .todo-lists {
        width: 100%;
      }
      #filters {
        display: flex;
        flex-direction: row;
      }
      #clear-todos {
        margin-left: 20px;
        font-size: 0.8em;
        padding: 10px;
        border: none;
        border-radius: 10px;
        background: red;
        color: white;
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
        <h1>Create TODO's</h1>
        <div class="input-container" @keyup=${this.handleEnterInput}>
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
          <div id="radio-btn-group" style="margin-top:5px">
            ${Object.values(toDoFilter).map(
              (filter) =>
                html`
                  <input
                    class="radio-btns"
                    name="filters"
                    type="radio"
                    value=${filter}
                    @click=${this.handleFilterChange}
                  /><label>${filter}</label>
                `
            )}
          </div>
          <button id="clear-todos" @click=${this.handleRemove}>
            Clear Completed
          </button>
        </div>
      </div>
    `;
  }
  handleEnterInput(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
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
