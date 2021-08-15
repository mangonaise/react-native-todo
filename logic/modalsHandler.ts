import { makeAutoObservable } from 'mobx';
import List from './list';

export default class ModalsHandler {
  showListsModal = false;
  listBeingEdited: List | null = null;
  listBeingDeleted: List | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setShowListsModal(state: boolean) { this.showListsModal = state; }
  public setListBeingEdited(list: List | null) { this.listBeingEdited = list; }
  public setListBeingDeleted(list: List | null) { this.listBeingDeleted = list; }
}