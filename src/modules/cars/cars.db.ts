import { Injectable } from "@nestjs/common";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { Car } from "src/common/types";
import { constructCarsMap } from "./cars.helper";
import { CarsRequestDTO } from "./cars.dto";
import { SWAGGER_DESCRIPTIONS } from "src/common/constants";

@Injectable()
export class CarsDb {
  private cars: Record<number, Car>;
  private availabilty: Record<number, DoublyLinkedList>;

  constructor() {
    this.cars = {};
    this.availabilty = {};
  }

  /**
   * Get the entire cars list from db
   * @returns { Record<number, Car> }
   */
  getCarsList(): Record<number, Car> {
    return this.cars;
  }

  /**
   * Get the entire availabilty map
   * @returns { Record>number, DoublyLinkedList> }
   */
  getAvailabilty(): Record<number, DoublyLinkedList> {
    return this.availabilty;
  }

  /**
   * Gets the car from db with carId
   * @param carId
   * @returns { Car }
   */
  getCarById(carId: number): Car {
    return this.cars[carId];
  }

  /**
   * Get the list of cars for specific available seats
   * @param seats
   * @returns { DoublyLinkedList }
   */
  getAvailableCarsBySeats(seats: number): DoublyLinkedList {
    return this.availabilty[seats];
  }

  /**
   * Update the cars list in the db
   * @param carsList
   * @returns { string }
   */
  updateCarsList(carsList: CarsRequestDTO[]): string {
    try {
      const { cars, availabilty } = constructCarsMap(carsList);
      this.cars = cars;
      this.availabilty = availabilty;
      return SWAGGER_DESCRIPTIONS.CARS_OK;
    } catch (error) {
      return SWAGGER_DESCRIPTIONS.CARS_ERROR;
    }
  }

  /**
   * Update the availabilty map with the cars list
   * @param currentSeats
   * @param updatedSeats
   * @param carId
   */
  updateAvailabilty(currentSeats: number, updatedSeats: number, carId: number) {
    if (currentSeats > 0) {
      const currentSeatsList = this.availabilty[currentSeats];
      currentSeatsList.delete(carId);
    }
    if (updatedSeats > 0) {
      const updatedSeatsList = this.availabilty[updatedSeats];
      if (!updatedSeatsList) {
        this.availabilty[updatedSeats] = new DoublyLinkedList();
        this.availabilty[updatedSeats].add(carId);
      } else {
        updatedSeatsList.add(carId);
      }
    }
  }

  /**
   * Resets the db to initial state
   */
  resetDb() {
    this.cars = {};
    this.availabilty = {};
  }
}
