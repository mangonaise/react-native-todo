import { makeAutoObservable } from 'mobx';
import Task from './task';

export default class AppInstance {
  tasks = [] as Task[];
  taskBeingEdited = null as Task | null;

  constructor() {
    makeAutoObservable(this); 
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

  public setTaskBeingEdited(task: Task | null) {
    this.taskBeingEdited = task;
  }
}