import { LightningElement } from "lwc";

const STEPS = [
  { id: 1, value: 1, label: "First" },
  { id: 2, value: 2, label: "Second" }
];

export default class BasicsNavigation extends LightningElement {
  chosenStepIndex = 0;

  // срабатывает при подключении компонента, и до рендеринга
  connectedCallback() {
    // добавляет стиль из дизайн-системы slds
    this.classList.add("slds-page-header");
    // добавляет атрибут
    this.setAttribute("role", "region");
  }

  get steps() {
    return STEPS;
  }

  get currentStep() {
    return this.steps[this.chosenStepIndex].value;
  }

  handleStepFocus(event) {
    this.chosenStepIndex = event.detail.index;
  }
}
