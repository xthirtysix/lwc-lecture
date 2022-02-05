import {LightningElement} from 'lwc';

export default class BasicsSidebar extends LightningElement {
  connectedCallback() {
    this.classList.add('slds-page-header');
  }
}