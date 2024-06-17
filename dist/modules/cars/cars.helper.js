"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructCarsMap = void 0;
const DoublyLinkedList_1 = require("../../common/utils/DoublyLinkedList");
const constructCarsMap = (cars) => {
    const carsMap = {};
    const availabiltyMap = {};
    cars.forEach((car) => {
        carsMap[car.id] = {
            seats: car.seats,
            currentTravellers: 0,
        };
        if (availabiltyMap[car.seats]) {
            const currentList = availabiltyMap[car.seats];
            currentList.add(car.id);
        }
        else {
            const list = new DoublyLinkedList_1.DoublyLinkedList();
            list.add(car.id);
            availabiltyMap[car.seats] = list;
        }
    });
    return { cars: carsMap, availabilty: availabiltyMap };
};
exports.constructCarsMap = constructCarsMap;
//# sourceMappingURL=cars.helper.js.map