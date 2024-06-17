"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONSTRUCT_CARS_MAP_1 = exports.CONSTRUCT_CARS_MAP = exports.AVAILABILTY_UPDATE_1 = exports.AVAILABILTY_UPDATE = exports.AVAILABILTY = exports.AVAILABILTY_MAP_1 = exports.AVAILABILTY_MAP = exports.CAR = exports.CARS_LIST_1 = exports.CARS_LIST = exports.CARS_MOCK_DATA_1 = exports.CARS_MOCK_DATA = void 0;
const DoublyLinkedList_1 = require("../../../common/utils/DoublyLinkedList");
const initializeList = (value) => {
    const list = new DoublyLinkedList_1.DoublyLinkedList();
    list.add(value);
    return list;
};
const addMultipleValuesToList = (values) => {
    const list = new DoublyLinkedList_1.DoublyLinkedList();
    values.forEach((value) => {
        list.add(value);
    });
    return list;
};
exports.CARS_MOCK_DATA = [
    {
        id: 101,
        seats: 6,
    },
    {
        id: 102,
        seats: 4,
    },
];
exports.CARS_MOCK_DATA_1 = [
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
exports.CARS_LIST = {
    101: {
        seats: 6,
        currentTravellers: 0,
    },
    102: {
        seats: 4,
        currentTravellers: 0,
    },
};
exports.CARS_LIST_1 = {
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
exports.CAR = {
    seats: 6,
    currentTravellers: 0,
};
exports.AVAILABILTY_MAP = {
    6: initializeList(101),
    4: initializeList(102),
};
exports.AVAILABILTY_MAP_1 = {
    6: addMultipleValuesToList([101, 103]),
    4: initializeList(102),
};
exports.AVAILABILTY = initializeList(101);
exports.AVAILABILTY_UPDATE = {
    6: new DoublyLinkedList_1.DoublyLinkedList(),
    4: initializeList(102),
    2: initializeList(101),
};
exports.AVAILABILTY_UPDATE_1 = {
    6: new DoublyLinkedList_1.DoublyLinkedList(),
    4: addMultipleValuesToList([102, 101]),
};
exports.CONSTRUCT_CARS_MAP = {
    cars: exports.CARS_LIST,
    availabilty: exports.AVAILABILTY_MAP,
};
exports.CONSTRUCT_CARS_MAP_1 = {
    cars: exports.CARS_LIST_1,
    availabilty: exports.AVAILABILTY_MAP_1,
};
//# sourceMappingURL=__mockData__.js.map