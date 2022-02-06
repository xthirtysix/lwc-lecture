import {LightningElement} from 'lwc';

const MENU_ITEMS = [
  {id: 1, label: 'First', name: 'first'},
  {id: 2, label: 'Second', name: 'second'}
]

export default class BasicsSidebar extends LightningElement {
  selectedItem = undefined

  get items() {
    return MENU_ITEMS
  }

  connectedCallback() {
    this.classList.add('slds-page-header')
    this.selectedItem = MENU_ITEMS[0].name
  }

  handleItemSelect(event) {
    this.selectedItem = event.detail.name
  }

}