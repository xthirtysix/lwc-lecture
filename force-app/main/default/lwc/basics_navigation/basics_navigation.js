import {LightningElement, wire} from 'lwc'
import {publish, MessageContext} from 'lightning/messageService'
import NAVIGATION_CHANNEL from '@salesforce/messageChannel/basicsNavigation__c';

const STEPS = [
  {
    id: 1, value: 1, label: 'First', items: [
      {id: 1, value: 1, label: 'First'},
      {id: 2, value: 2, label: 'Second'}
    ]
  },
  {
    id: 2, value: 2, label: 'Second', items: [
      {id: 1, value: 1, label: 'First'},
      {id: 2, value: 2, label: 'Second'}
    ]
  }
]

export default class BasicsNavigation extends LightningElement {
  chosenStepIndex = 0;
  @wire(MessageContext)
  messageContext;

  get steps() {
    return STEPS
  }

  get currentStep() {
    return this.steps[this.chosenStepIndex]
  }

  // срабатывает при подключении компонента, и до рендеринга
  connectedCallback() {
    // добавляет стиль из дизайн-системы slds
    this.classList.add('slds-page-header')
    // добавляет атрибут
    this.setAttribute('role', 'region')
  }

  handleStepFocus(event) {
    this.chosenStepIndex = event.detail.index
    publish(this.messageContext, NAVIGATION_CHANNEL, this.currentStep.items)
  }
}
