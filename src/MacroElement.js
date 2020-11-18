export default class MacroElement extends HTMLElement {
  // Upgrade
  connectedCallback() {
    // Instantiate template.
    const template = this.template;
    const clone = document.importNode(template.content, true);

    // Create a temporary element with a shadow that uses the template.
    const temp = document.createElement("div");
    const tempRoot = temp.attachShadow({ mode: "open" });
    tempRoot.appendChild(clone);

    // Move our light DOM content to the temp element.
    temp.append(...this.childNodes);

    // The DOM has now assigned light DOM content to the slots.
    // Replace all slots with their assigned nodes.
    const slots = tempRoot.querySelectorAll("slot");
    slots.forEach((slot) => {
      // Extract the assigned nodes.
      const fragment = document.createDocumentFragment();
      fragment.append(...slot.assignedNodes());
      // Replace the slot with the assigned nodes.
      slot.replaceWith(fragment);
    });

    // Replace existing light DOM with expanded content.
    this.append(...tempRoot.childNodes);
  }
}
