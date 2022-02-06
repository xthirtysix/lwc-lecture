import {LightningElement, wire} from 'lwc'
import {publish, MessageContext} from 'lightning/messageService'
import NAVIGATION_CHANNEL from '@salesforce/messageChannel/basicsNavigation__c';

const STEPS = [
  {
    id: 1, value: 1, label: 'First', items: [
      {id: 1, value: 'first', label: 'First'},
      {id: 2, value: 'second', label: 'Second'}
    ]
  },
  {
    id: 2, value: 2, label: 'Second', items: [
      {id: 3, value: 'third', label: 'Third'},
      {id: 4, value: 'fourth', label: 'Fourth'}
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
    /* Костыль с первоначальной инициализацией элементов меню в sidebar'е.
     В идеале, сообщение должно отправляться только в том случае если
     в sidebar уже отработал connectedCallback и он готов принять данные
     Здесь же мы надеемся что sidebar компонент подключится в течении 0.25 секунды, после
     данного компонента */
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      publish(this.messageContext, NAVIGATION_CHANNEL, this.steps[0].items)
    }, 250)
  }

  handleStepFocus(event) {
    this.chosenStepIndex = event.detail.index
    publish(this.messageContext, NAVIGATION_CHANNEL, this.currentStep.items)
  }
}
