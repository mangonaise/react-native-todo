import { makeAutoObservable } from 'mobx';
import Task from './task';

export const listColors = [
  '#71bf86', // green
  '#8197bd', // blue
  '#9681bd', // purple
  '#c973ac', // pink
  '#E37777', // red
  '#f0983a', // orange
  '#e0b62b', // yellow
]

export default class List {
  name: string;
  tasks = [] as Task[];
  completedTasks = [] as Task[];
  colorId: number;

  constructor(name: string) {
    this.name = name;
    this.colorId = Math.floor(Math.random() * listColors.length);
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

  public setTaskAsComplete(task: Task) {
    this.deleteTask(task);
    this.completedTasks.unshift(task);
  }

  public setTaskAsIncomplete(taskToRestore: Task) {
    this.completedTasks = this.completedTasks.filter(task => task !== taskToRestore);
    this.tasks.unshift(taskToRestore);
  }

  public setTasks(newData: Task[]) {
    this.tasks = newData;
  }

  public setColorId(newColorId: number) {
    this.colorId = newColorId;
  }
}