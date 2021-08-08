import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid/non-secure';

export default class Task {
  id: string;
  text: string;
  isComplete = false;

  constructor(text: string) {
    this.id = nanoid();
    this.text = text;
    makeAutoObservable(this);
  }

  public setComplete(newState: boolean) {
    this.isComplete = newState;
  }
}