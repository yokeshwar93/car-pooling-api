import { GROUP_STATUSES, JOURNEY_REQUEST } from "src/common/constants";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { MAX_SEATS } from "src/common/validations";
import { CarsDb } from "../cars/cars.db";

/**
 * Helper function to assign the journey if car is available and get the status
 * @param seats
 * @param availabilty
 * @returns { status: string, carId: number }
 */
export const assignJourney = (
  seats: number,
  availabilty: Record<number, DoublyLinkedList>
) => {
  let currentSeat = seats;
  let carId: number;
  while (currentSeat <= MAX_SEATS) {
    const car = availabilty[currentSeat]?.getFirstItem();
    if (car) {
      carId = car.data;
      break;
    }
    currentSeat++;
  }
  const status = carId ? GROUP_STATUSES.TRAVELLING : GROUP_STATUSES.WAITING;
  return { status, carId };
};

/**
 * Helper function to get the current and update available seats to update the availabilty map
 * @param carsDB
 * @param carId
 * @param people
 * @param type
 * @returns { currentSeats: number, updatedSeats: number }
 */
export const getCurrentAndUpdatedSeats = (
  carsDB: CarsDb,
  carId: number,
  people: number,
  type: JOURNEY_REQUEST
) => {
  const car = carsDB.getCarById(carId);
  const { seats, currentTravellers } = car;

  const currentSeats = seats - currentTravellers;
  let updatedTravellers;
  if (type === JOURNEY_REQUEST.ASSIGNED) {
    updatedTravellers = currentTravellers + people;
  } else {
    updatedTravellers = currentTravellers - people;
  }
  car.currentTravellers = updatedTravellers;
  const updatedSeats = seats - updatedTravellers;
  return { currentSeats, updatedSeats };
};
