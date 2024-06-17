import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { CarsRequestDTO } from "./cars.dto";

/**
 * Helper function to construct cars and availabilty maps to save in db
 * @param cars
 * @returns { cars: Record<number, Car> , availabilty: Record<number, DoublyLinkedList> }
 */
export const constructCarsMap = (cars: CarsRequestDTO[]) => {
  const carsMap = {};
  const availabiltyMap: Record<number, DoublyLinkedList> = {};

  cars.forEach((car) => {
    carsMap[car.id] = {
      seats: car.seats,

      // initially noone will be travelling
      currentTravellers: 0,
    };

    // Construct the availabilty with seats as key and cars list value
    if (availabiltyMap[car.seats]) {
      const currentList = availabiltyMap[car.seats];
      currentList.add(car.id);
    } else {
      const list = new DoublyLinkedList();
      list.add(car.id);
      availabiltyMap[car.seats] = list;
    }
  });
  return { cars: carsMap, availabilty: availabiltyMap };
};
