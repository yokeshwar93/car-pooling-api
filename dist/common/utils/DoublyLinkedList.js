"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = void 0;
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    isEmpty() {
        if (this.head == null)
            return true;
        return false;
    }
    add(value) {
        let temp = new ListNode(value);
        if (this.head == null) {
            this.head = temp;
            this.tail = temp;
        }
        else {
            this.tail.next = temp;
            temp.prev = this.tail;
            this.tail = temp;
        }
    }
    getFirstItem() {
        return this.head;
    }
    delete(value) {
        let currentNode = this.head;
        while (currentNode !== null && currentNode.data !== value) {
            currentNode = currentNode.next;
        }
        if (currentNode === null) {
            return;
        }
        if (currentNode === this.head) {
            this.head = currentNode.next;
        }
        else {
            currentNode.prev.next = currentNode.next;
        }
        if (currentNode === this.tail) {
            this.tail = currentNode.prev;
        }
        else {
            currentNode.next.prev = currentNode.prev;
        }
        currentNode = null;
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
class ListNode {
    constructor(value) {
        this.data = value;
        this.next = null;
        this.prev = null;
    }
}
//# sourceMappingURL=DoublyLinkedList.js.map