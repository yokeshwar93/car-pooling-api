import { GROUP_STATUSES, JOURNEY_REQUEST } from "src/common/constants";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { CarsDb } from "../cars/cars.db";
export declare const assignJourney: (seats: number, availabilty: Record<number, DoublyLinkedList>) => {
    status: GROUP_STATUSES;
    carId: number;
};
export declare const getCurrentAndUpdatedSeats: (carsDB: CarsDb, carId: number, people: number, type: JOURNEY_REQUEST) => {
    currentSeats: number;
    updatedSeats: number;
};
