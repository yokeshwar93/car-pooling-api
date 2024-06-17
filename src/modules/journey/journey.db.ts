import { Injectable } from "@nestjs/common";
import { Journey } from "src/common/types";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";

@Injectable()
export class JourneyDb {
  private journeys: Record<number, Journey>;
  private waitingList: DoublyLinkedList;

  constructor() {
    this.journeys = {};
    this.waitingList = new DoublyLinkedList();
  }

  /**
   * Adds a new journey to db
   * @param id
   * @param journey
   */
  createNewJourney(id: number, journey: Journey) {
    this.journeys[id] = journey;
  }

  /**
   * Returns all journeys from db
   * @returns journeys list
   */
  getAllJourneys() {
    return this.journeys;
  }

  /**
   * Adds a new journey to the waiting queue in db
   * @param journeyId
   */
  addToWaitingList(journeyId: number) {
    this.waitingList.add(journeyId);
  }

  /**
   * Get the waitinglist queue from the db
   * @returns { DoublyLinkedList }
   */
  getWaitingList(): DoublyLinkedList {
    return this.waitingList;
  }

  /**
   * Get the journey from db with journeyId
   * @param journeyId
   * @returns { Journey }
   */
  getJourneyById(journeyId: number): Journey {
    return this.journeys[journeyId];
  }

  /**
   * Update the status of the journey in the db
   * @param journeyId
   * @param status
   */
  updateJourneyStatus(journeyId: number, status: string) {
    this.journeys[journeyId].currentStatus = status;
  }

  /**
   * Update the carId for a journey in the db
   * @param journeyId
   * @param carId
   */
  updateJourneyCarId(journeyId: number, carId: number) {
    this.journeys[journeyId].carId = carId;
  }

  /**
   * Resets the db to initial state
   */
  resetDb() {
    this.journeys = {};
    this.waitingList = new DoublyLinkedList();
  }
}
