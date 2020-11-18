import MacroElement from "../src/MacroElement.js";

export default class HelloElement extends MacroElement {
  get template() {
    const result = document.createElement("template");
    result.innerHTML = `
      Hello,
      <em><slot></slot></em>.
    `;
    return result;
  }
}

customElements.define("hello-element", HelloElement);
