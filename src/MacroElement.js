export default class MacroElement extends HTMLElement {
  // Upgrade
  connectedCallback() {
    // Instantiate template.
    const template = this.template;
    const clone = document.importNode(template.content, true);

    // Move the existing light DOM content to a fragment.
    const fragment = document.createDocumentFragment();
    fragment.append(...this.childNodes);

    // Assign light DOM content to slots.
    // For now, this just assumes a single slot.
    const defaultSlot = clone.querySelector("slot");
    if (defaultSlot) {
      defaultSlot.replaceWith(fragment);
    }

    // Replace existing light DOM with expanded content.
    this.append(clone);
  }
}
