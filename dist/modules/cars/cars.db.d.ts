import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { Car } from "src/common/types";
import { CarsRequestDTO } from "./cars.dto";
export declare class CarsDb {
    private cars;
    private availabilty;
    constructor();
    getCarsList(): Record<number, Car>;
    getAvailabilty(): Record<number, DoublyLinkedList>;
    getCarById(carId: number): Car;
    getAvailableCarsBySeats(seats: number): DoublyLinkedList;
    updateCarsList(carsList: CarsRequestDTO[]): string;
    updateAvailabilty(currentSeats: number, updatedSeats: number, carId: number): void;
    resetDb(): void;
}
