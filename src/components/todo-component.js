import { LitElement, html, css } from 'lit';

export class Todo extends LitElement {
  static get styles() {}

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`<p>Hello world</p>`;
  }

  _onClick() {}
}

customElements.define('todo-component', Todo);
