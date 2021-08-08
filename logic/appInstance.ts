import { makeAutoObservable } from 'mobx';
import List from './list';
import Task from './task';

export default class AppInstance {
  lists = [] as List[];
  activeList = null! as List;
  taskBeingEdited = null as Task | null;

  constructor() {
    makeAutoObservable(this);
    this.lists = [new List('Your tasks'), new List('Another list')];
    this.activeList = this.lists[0];
  }

  public setActiveList(list: List) {
    this.activeList = list;
  }

  public setTaskBeingEdited(task: Task | null) {
    this.taskBeingEdited = task;
  }
}