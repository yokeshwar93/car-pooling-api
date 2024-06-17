import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { CarsRequestDTO } from "./cars.dto";
export declare const constructCarsMap: (cars: CarsRequestDTO[]) => {
    cars: {};
    availabilty: Record<number, DoublyLinkedList>;
};
