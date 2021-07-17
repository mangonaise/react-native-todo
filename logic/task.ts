import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

export default class Task {
  id: string;
  text: string;
  isComplete = false;

  constructor(text: string) {
    makeAutoObservable(this);
    this.id = nanoid();
    this.text = text;
  }

  public setComplete(newState: boolean) {
    this.isComplete = newState;
  }
}