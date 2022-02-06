import {LightningElement, wire} from 'lwc'
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext,
} from 'lightning/messageService'
import NAVIGATION_CHANNEL from '@salesforce/messageChannel/basicsNavigation__c'

export default class BasicsSidebar extends LightningElement {
  navigationItems = []
  selectedItem = undefined
  subscription = undefined
  @wire(MessageContext)
  messageContext;

  get items() {
    return this.navigationItems
  }

  connectedCallback() {
    this.classList.add('slds-page-header')
    this.subscribeToMessageChannel()
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel()
  }

  handleItemSelect(event) {
    this.selectedItem = event.detail.name
  }

  handleMessage(message) {
    this.navigationItems = message
    this.selectedItem = message[0]?.name
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        NAVIGATION_CHANNEL,
        (message) => this.handleMessage(message),
        {scope: APPLICATION_SCOPE}
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

}