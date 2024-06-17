export declare class DoublyLinkedList {
    head: ListNode;
    tail: ListNode;
    constructor();
    isEmpty(): boolean;
    add(value: number): void;
    getFirstItem(): ListNode;
    delete(value: number): void;
}
declare class ListNode {
    data: number;
    next: ListNode;
    prev: ListNode;
    constructor(value: number);
}
export {};
