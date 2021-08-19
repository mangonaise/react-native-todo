import { makeAutoObservable } from 'mobx';
import List, { listColors } from './list';
import Task from './task';

export default class AppInstance {
  lists: List[];
  activeList: List;
  activeListColor = '';
  taskBeingEdited = null as Task | null;
  showCompletedTasks = false;

  constructor() {
    this.lists = [new List('Your tasks')];
    this.activeList = this.lists[0];
    this.refreshActiveListColor();
    makeAutoObservable(this);
  }

  public addList(newList: List) {
    this.lists.push(newList);
  }

  public deleteList(listToDelete: List) {
    this.lists = this.lists.filter(list => list !== listToDelete);
    if (listToDelete === this.activeList) {
      this.setActiveList(this.lists[0]);
      this.setShowCompletedTasks(false);
    }
  }

  public setActiveList(list: List) {
    this.activeList = list;
    this.setTaskBeingEdited(null);
    this.setShowCompletedTasks(false);
    this.refreshActiveListColor();
  }

  public setTaskBeingEdited(task: Task | null) {
    this.taskBeingEdited = task;
  }

  public setShowCompletedTasks(value: boolean) {
    this.showCompletedTasks = value;
    this.setTaskBeingEdited(null);
  }

  public refreshActiveListColor() {
    this.activeListColor = listColors[this.activeList.colorId];
  }
}