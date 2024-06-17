import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";

const initializeList = (value: number) => {
  const list = new DoublyLinkedList();
  list.add(value);
  return list;
};

const addMultipleValuesToList = (values: number[]) => {
  const list = new DoublyLinkedList();
  values.forEach((value) => {
    list.add(value);
  });
  return list;
};
export const CARS_MOCK_DATA = [
  {
    id: 101,
    seats: 6,
  },
  {
    id: 102,
    seats: 4,
  },
];

export const CARS_MOCK_DATA_1 = [
  {
    id: 101,
    seats: 6,
  },
  {
    id: 102,
    seats: 4,
  },
  {
    id: 103,
    seats: 6,
  },
];

export const CARS_LIST = {
  101: {
    seats: 6,
    currentTravellers: 0,
  },
  102: {
    seats: 4,
    currentTravellers: 0,
  },
};

export const CARS_LIST_1 = {
  101: {
    seats: 6,
    currentTravellers: 0,
  },
  102: {
    seats: 4,
    currentTravellers: 0,
  },
  103: {
    seats: 6,
    currentTravellers: 0,
  },
};

export const CAR = {
  seats: 6,
  currentTravellers: 0,
};

export const AVAILABILTY_MAP = {
  6: initializeList(101),
  4: initializeList(102),
};

export const AVAILABILTY_MAP_1 = {
  6: addMultipleValuesToList([101, 103]),
  4: initializeList(102),
};

export const AVAILABILTY = initializeList(101);

export const AVAILABILTY_UPDATE = {
  6: new DoublyLinkedList(),
  4: initializeList(102),
  2: initializeList(101),
};
export const AVAILABILTY_UPDATE_1 = {
  6: new DoublyLinkedList(),
  4: addMultipleValuesToList([102, 101]),
};
export const CONSTRUCT_CARS_MAP = {
  cars: CARS_LIST,
  availabilty: AVAILABILTY_MAP,
};

export const CONSTRUCT_CARS_MAP_1 = {
  cars: CARS_LIST_1,
  availabilty: AVAILABILTY_MAP_1,
};
