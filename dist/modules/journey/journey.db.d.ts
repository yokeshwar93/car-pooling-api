import { Journey } from "src/common/types";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
export declare class JourneyDb {
    private journeys;
    private waitingList;
    constructor();
    createNewJourney(id: number, journey: Journey): void;
    getAllJourneys(): Record<number, Journey>;
    addToWaitingList(journeyId: number): void;
    getWaitingList(): DoublyLinkedList;
    getJourneyById(journeyId: number): Journey;
    updateJourneyStatus(journeyId: number, status: string): void;
    updateJourneyCarId(journeyId: number, carId: number): void;
    resetDb(): void;
}
