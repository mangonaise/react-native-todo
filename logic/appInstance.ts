import { makeAutoObservable } from 'mobx';
import Task from './task';

export default class AppInstance {
  tasks = [] as Task[];

  constructor() {
    makeAutoObservable(this); 
  }

  public addTask(text: string) {
    if (text === '') return;
    this.tasks.push(new Task(text));
  }
}