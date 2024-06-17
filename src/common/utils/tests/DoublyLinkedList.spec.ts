import { DoublyLinkedList } from "../DoublyLinkedList";

describe("DoublyLinkedList", () => {
  let doublyLinkedList: DoublyLinkedList;

  beforeEach(() => {
    doublyLinkedList = new DoublyLinkedList();
  });

  describe("is empty function", () => {
    it("should return true if list is empty", () => {
      expect(doublyLinkedList.isEmpty()).toBeTruthy();
    });

    it("should return false is list is not empty", () => {
      doublyLinkedList.add(1);
      expect(doublyLinkedList.isEmpty()).toBeFalsy();
    });
  });

  describe("add", () => {
    it("should add item to the end of the list", () => {
      doublyLinkedList.add(1);
      expect(doublyLinkedList.isEmpty()).toBeFalsy();
      expect(doublyLinkedList.getFirstItem().data).toBe(1);
    });
  });

  describe("getFirstItem", () => {
    it("should return the first item", () => {
      doublyLinkedList.add(1);
      expect(doublyLinkedList.getFirstItem().data).toBe(1);
    });
  });

  describe("delete", () => {
    it("delete the item from the list", () => {
      doublyLinkedList.add(1);
      doublyLinkedList.add(2);
      doublyLinkedList.add(3);
      expect(doublyLinkedList.getFirstItem().data).toBe(1);
      doublyLinkedList.delete(1);
      doublyLinkedList.delete(3);
      expect(doublyLinkedList.getFirstItem().data).toBe(2);
    });
  });
});
