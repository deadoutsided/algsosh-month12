interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getSize: () => number;
  getContainer: () => T[];
  getTop: () => T | null;
}

export class Stack<T> implements IStack<T> {
  private container: T[];
  private top: T | null;
  constructor() {
    this.container = [];
    this.top = null;
  }

  push = (item: T) => {
    this.container.push(item);
  };

  pop = () => {
    this.container.pop();
  };

  clear = () => {
    this.container = [];
  };

  getTop = () => {
    const topElem =
      this.getSize() > 0 ? this.container[this.getSize() - 1] : null;
    return topElem;
  };

  getSize = () => this.container.length;

  getContainer = () => this.container;
}
