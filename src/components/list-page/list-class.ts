export class ListItem<T> {
  value: T;
  next: ListItem<T> | null;
  constructor(value: T, next?: ListItem<T> | null) {
    this.value = value;
    this.next = next !== undefined ? next : null;
  }
}

interface ILinkedList<T> {
  append: (element: T, index: number) => void;
  delete: (index: number) => void;
  getSize: () => number;
  getHead: () => ListItem<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: ListItem<T> | null;
  private tail: ListItem<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(element: T, index: number) {
    if (index > this.size || index < 0) {
      throw new Error("Incorrect index");
    }
    let temp = new ListItem<T>(element);
    if (index === 0) {
      console.log(this.head);
      temp.next = this.head;
      console.log(this.head);
      this.head = temp;
      console.log(this.head);
    } else {
      let curr = this.head;
      let currIndex = 0;
      let changed: ListItem<T> | null = null;
      while (curr && currIndex < index - 1) {
        curr = curr.next;
        currIndex++;
      }
      if (curr && currIndex === index - 1) {
        changed = curr.next;
      }
      temp.next = changed;
      if (curr) curr.next = temp;
    }
    if (index === this.size) {
      this.tail = temp;
    }
    this.size++;
  }

  delete(index: number) {
    if (index > this.size || index < 0 || !this.head) {
      throw new Error("Incorrect index");
    }
    let temp = this.head;
    let tempInd = 0;
    while (temp.next && tempInd !== index - 1) {
      temp = temp.next;
      tempInd++;
    }
    if (temp && tempInd === index - 1) {
      let delTarg = temp.next;
      temp.next = delTarg && delTarg.next ? delTarg.next : null;
    }
    if (index === 0 && this.head !== null) {
      this.head = this.head.next ? this.head.next : null;
    }
    this.size--;
    if (temp.next === null) {
      this.tail = temp;
    }
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }
}
