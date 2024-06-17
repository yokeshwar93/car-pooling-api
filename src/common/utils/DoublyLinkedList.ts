export class DoublyLinkedList {
  public head: ListNode;
  public tail: ListNode;

  // create a new linked list
  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    if (this.head == null) return true;
    return false;
  }

  //To add item at the last of doubly linked list
  add(value: number) {
    let temp = new ListNode(value);

    // If the list is empty link assign new node to both head and tail
    if (this.head == null) {
      this.head = temp;
      this.tail = temp;
    }

    // else add item to the tail and shift tail
    else {
      this.tail.next = temp;
      temp.prev = this.tail;
      this.tail = temp;
    }
  }

  // Get the item from the top of the list
  getFirstItem() {
    return this.head;
  }

  // Delete an item from the list
  delete(value: number) {
    let currentNode = this.head;

    while (currentNode !== null && currentNode.data !== value) {
      currentNode = currentNode.next;
    }

    if (currentNode === null) {
      return;
    }

    if (currentNode === this.head) {
      this.head = currentNode.next;
    } else {
      currentNode.prev.next = currentNode.next;
    }

    if (currentNode === this.tail) {
      this.tail = currentNode.prev;
    } else {
      currentNode.next.prev = currentNode.prev;
    }

    currentNode = null;
  }
}

class ListNode {
  public data: number;
  public next: ListNode;
  public prev: ListNode;

  //To create a new node

  constructor(value: number) {
    this.data = value;
    this.next = null;
    this.prev = null;
  }
}
