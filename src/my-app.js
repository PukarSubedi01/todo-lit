import { LitElement, html, css } from 'lit';

import './components/todo-component';

export class MyApp extends LitElement {
  static get styles() {
    return css`
      main {
        width: 100%;
        height: 100vh;
        background: linear-gradient(120deg, #2980b9, #8e44ad);
        display: flex;
      }
    `;
  }
  render() {
    return html`<main><todo-component></todo-component></main>`;
  }
}

customElements.define('my-app', MyApp);
