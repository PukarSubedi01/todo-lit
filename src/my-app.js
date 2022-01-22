import { LitElement, html, css } from 'lit';

import './components/todo-component';

export class MyApp extends LitElement {
  static get styles() {}
  render() {
    return html`<main><todo-component></todo-component></main>`;
  }
}

customElements.define('my-app', MyApp);
