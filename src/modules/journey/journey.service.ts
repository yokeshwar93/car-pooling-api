import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import {
  ERROR_MESSAGES,
  GROUP_STATUSES,
  JOURNEY_REQUEST,
} from "src/common/constants";
import { CarsDb } from "../cars/cars.db";
import { CarsRequestDTO } from "../cars/cars.dto";
import { JourneyDb } from "./journey.db";
import { JourneyDTO } from "./journey.dto";
import { assignJourney, getCurrentAndUpdatedSeats } from "./journey.helper";

@Injectable()
export class JourneyService {
  private readonly logger = new Logger(JourneyService.name);

  constructor(
    private journeyDb: JourneyDb,
    @Inject(forwardRef(() => CarsDb)) private carsDb: CarsDb
  ) {}

  /**
   * Creates a new journey in the db
   * Assigns a car to the journey if availabile else
   * Adds the journey to the waiting list queue
   * @param journey
   */
  registerNewJourney(journey: JourneyDTO) {
    this.logger.log("Journey registeration started");

    if (this.journeyDb.getAllJourneys()[journey.id]) {
      throw new BadRequestException("Journey already exists");
    }
    const availabilty = this.carsDb.getAvailabilty();
    const { status, carId } = assignJourney(journey.people, availabilty);
    const journeyObject = {
      people: journey.people,
      currentStatus: status,
      carId,
    };

    this.journeyDb.createNewJourney(journey.id, journeyObject);

    // Car is available assign it to journey and update availabilty else add to waiting list
    if (carId) {
      const { currentSeats, updatedSeats } = getCurrentAndUpdatedSeats(
        this.carsDb,
        carId,
        journey.people,
        JOURNEY_REQUEST.ASSIGNED
      );
      this.carsDb.updateAvailabilty(currentSeats, updatedSeats, carId);
      this.logger.log("Journey has been assigned");
    } else {
      this.journeyDb.addToWaitingList(journey.id);
      this.logger.log("Journey has been added to waitlist");
    }

    this.logger.log("Journey registeration completed");
  }

  /**
   * Locate the current status of the journey
   * if the journey has car assigned retuns car object
   * else if
   * the journey is waiting to be assigned return no content
   * else
   * return not found
   * @param journeyId
   * @returns { status: string, car: CarsRequestDTO | undefined }
   */
  locateJourney(journeyId: number): {
    status: string;
    car: CarsRequestDTO | undefined;
  } {
    const journey = this.journeyDb.getJourneyById(journeyId);

    if (journey && journey.currentStatus === GROUP_STATUSES.TRAVELLING) {
      const car = this.carsDb.getCarById(journey.carId);
      return { status: "OK", car: { id: journey.carId, seats: car.seats } };
    } else if (
      journey &&
      (journey.currentStatus === GROUP_STATUSES.WAITING ||
        journey.currentStatus === GROUP_STATUSES.DROPPED)
    ) {
      return { status: ERROR_MESSAGES.NO_CONTENT, car: undefined };
    } else {
      return { status: ERROR_MESSAGES.NOT_FOUND, car: undefined };
    }
  }

  /**
   * Dropoff a journey from the db
   * And
   * Assign the available car to any of the feasiable journey from the waiting list
   * @param journeyId
   * @returns { string }
   */
  dropoffJourney(journeyId: number): string {
    this.logger.log("Dropoff journey started");

    const journey = this.journeyDb.getJourneyById(journeyId);

    // If journey is not available in the db return 404
    if (!journey) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    }

    // If the journey is either finished or dropped off should not do anything
    if (
      journey.currentStatus === GROUP_STATUSES.COMPLETED ||
      journey.currentStatus === GROUP_STATUSES.DROPPED
    ) {
      return ERROR_MESSAGES.NO_CONTENT;
    }

    // if the journey is in waiting list, delete it from waiting list
    if (journey.currentStatus === GROUP_STATUSES.WAITING) {
      this.journeyDb.updateJourneyStatus(journeyId, GROUP_STATUSES.DROPPED);
      const waitingList = this.journeyDb.getWaitingList();
      waitingList.delete(Number(journeyId));
      this.logger.log("Dropoff journey completed");
      return ERROR_MESSAGES.NO_CONTENT;
    }

    // If the journey is travelling then update the status and availabilty. Traverse the waiting list from
    // begining and assign it to a car if applicable
    const { currentSeats, updatedSeats } = getCurrentAndUpdatedSeats(
      this.carsDb,
      journey.carId,
      journey.people,
      JOURNEY_REQUEST.DROPOFF
    );
    this.carsDb.updateAvailabilty(currentSeats, updatedSeats, journey.carId);
    this.journeyDb.updateJourneyStatus(journeyId, GROUP_STATUSES.COMPLETED);

    const waitingList = this.journeyDb.getWaitingList();
    let current = waitingList.head;
    const car = this.carsDb.getCarById(journey.carId);
    let currentAvailableSeats = car.seats - car.currentTravellers;
    // Traversing the waiting list
    while (current !== null) {
      const journeyObject = this.journeyDb.getJourneyById(current.data);
      if (journeyObject.people > currentAvailableSeats) {
        current = current.next;
        continue;
      }
      const availabilty = this.carsDb.getAvailabilty();
      const { carId } = assignJourney(journeyObject.people, availabilty);
      if (carId) {
        currentAvailableSeats = currentAvailableSeats - journeyObject.people;
        const { currentSeats, updatedSeats } = getCurrentAndUpdatedSeats(
          this.carsDb,
          carId,
          journeyObject.people,
          JOURNEY_REQUEST.ASSIGNED
        );
        this.carsDb.updateAvailabilty(currentSeats, updatedSeats, carId);
        this.journeyDb.updateJourneyCarId(current.data, carId);
        this.journeyDb.updateJourneyStatus(
          current.data,
          GROUP_STATUSES.TRAVELLING
        );
        waitingList.delete(current.data);
      }
      current = current.next;
    }
    this.logger.log("Dropoff journey completed");
  }
}
