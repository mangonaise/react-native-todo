import { makeAutoObservable } from 'mobx';
import Task from './task';

export default class List {
  name: string;
  tasks = [] as Task[];

  constructor(name: string) {
    this.name = name;
    makeAutoObservable(this);
  }

  public renameList(newName: string) {
    this.name = newName;
  }

  public addTask(text: string) {
    if (text === '') return;
    this.tasks.unshift(new Task(text));
  }

  public deleteTask(taskToDelete: Task) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
  }

  public setTasks(newData: Task[]) {
    this.tasks = newData;
  }
}