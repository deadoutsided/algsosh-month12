interface IQueue<T> {
  enqueue: (
    item: T,
    setState: React.Dispatch<React.SetStateAction<T[] | undefined>>
  ) => void;
  dequeue: () => void;
  erase: () => void;
  getSize: () => void;
  getLength: () => number;
  getTail: () => number | null;
  getHead: () => number | null;
  getCont: () => T[];
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head: number | null = null;
  private tail: number | null = null;
  private readonly size: number = 0;
  private length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) throw new Error("queue is full");
    if (this.tail === null || this.head === null) {
      this.tail = 0;
      this.head = 0;
    } else {
      this.tail++;
    }
    this.container[this.tail % this.size] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.length === 0) {
      throw new Error("queue is empty");
    }
    if (this.head === null) {
      this.head = 0;
    } else {
      delete this.container[this.head % this.size];
      this.head++;
      this.length--;
    }
  };

  erase = () => {
    this.length = 0;
    this.head = null;
    this.tail = null;
    this.container = Array(this.size);
  };

  getLength = () => this.length;

  getHead = () => (this.head !== null ? this.head : null);

  getTail = () => (this.tail !== null ? this.tail : null);

  getCont = () => this.container;

  getSize = () => this.size;
}
