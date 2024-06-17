import { TestingModule, Test } from "@nestjs/testing";
import {
  ERROR_MESSAGES,
  GROUP_STATUSES,
  JOURNEY_REQUEST,
} from "src/common/constants";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { CarsDb } from "src/modules/cars/cars.db";
import {
  AVAILABILTY,
  AVAILABILTY_MAP,
  AVAILABILTY_UPDATE_1,
  CAR,
} from "src/modules/cars/tests/__mockData__";
import { JourneyDb } from "../journey.db";
import * as helper from "../journey.helper";
import { JourneyService } from "../journey.service";
import {
  ASSIGNED_DATA,
  COMPLETED_DATA,
  DROPPED_LIST_DATA,
  JOURNEY_MOCK_DATA,
  LOCATE_ASSIGNED_DATA,
  LOCATE_NOT_ASSIGNED_DATA,
  LOCATE_NOT_FOUND_DATA,
  WAITING_LIST_DATA,
} from "./__mockdata__";

describe("Journey Service", () => {
  let journeyService: JourneyService;
  let carsDb: CarsDb;
  let journeyDb: JourneyDb;

  beforeEach(async () => {
    const journeyModule: TestingModule = await Test.createTestingModule({
      providers: [JourneyService, CarsDb, JourneyDb],
    }).compile();

    journeyService = journeyModule.get<JourneyService>(JourneyService);
    carsDb = journeyModule.get<CarsDb>(CarsDb);
    journeyDb = journeyModule.get<JourneyDb>(JourneyDb);
  });

  describe("register new journey", () => {
    it("throw bad request exception", () => {
      jest.spyOn(journeyDb, "getAllJourneys").mockImplementation(() => ({
        10: {
          carId: 101,
          people: 6,
          currentStatus: GROUP_STATUSES.TRAVELLING,
        },
      }));
      expect(() =>
        journeyService.registerNewJourney(JOURNEY_MOCK_DATA)
      ).toThrowError();
    });

    it("register a new journey and assign a car", () => {
      jest
        .spyOn(carsDb, "getAvailabilty")
        .mockImplementation(() => AVAILABILTY_MAP);
      jest.spyOn(journeyDb, "createNewJourney").mockImplementation(() => {});
      jest.spyOn(carsDb, "updateAvailabilty").mockImplementation(() => {});
      jest
        .spyOn(journeyDb, "getAllJourneys")
        .mockImplementation(() => JOURNEY_MOCK_DATA);
      jest
        .spyOn(helper, "getCurrentAndUpdatedSeats")
        .mockImplementation(() => ({ currentSeats: 6, updatedSeats: 0 }));
      const journey = JOURNEY_MOCK_DATA;
      const { status, carId } = helper.assignJourney(
        journey.people,
        AVAILABILTY_MAP
      );
      const journeyObject = {
        people: journey.people,
        currentStatus: status,
        carId,
      };
      journeyService.registerNewJourney(journey);
      expect(carsDb.getAvailabilty).toBeCalled();
      expect(journeyDb.createNewJourney).toBeCalledWith(
        journey.id,
        journeyObject
      );
      expect(carsDb.updateAvailabilty).toBeCalled();
    });

    it("register a new journey and add to waiting list", () => {
      jest
        .spyOn(carsDb, "getAvailabilty")
        .mockImplementation(() => AVAILABILTY_UPDATE_1);
      jest.spyOn(journeyDb, "createNewJourney").mockImplementation(() => {});
      jest.spyOn(journeyDb, "addToWaitingList").mockImplementation(() => {});
      const journey = JOURNEY_MOCK_DATA;
      const { status, carId } = helper.assignJourney(
        journey.people,
        AVAILABILTY_UPDATE_1
      );
      const journeyObject = {
        people: journey.people,
        currentStatus: status,
        carId,
      };
      journeyService.registerNewJourney(journey);
      expect(carsDb.getAvailabilty).toBeCalled();
      expect(journeyDb.createNewJourney).toBeCalledWith(
        journey.id,
        journeyObject
      );
      expect(journeyDb.addToWaitingList).toBeCalled();
    });
  });

  describe("locate a journey", () => {
    it("locate a assigned journey", () => {
      jest.spyOn(carsDb, "getCarById").mockImplementation(() => CAR);
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => ASSIGNED_DATA);

      const result = journeyService.locateJourney(10);
      expect(carsDb.getCarById).toBeCalled();
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(LOCATE_ASSIGNED_DATA);
    });

    it("locate a journey in waiting list", () => {
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => WAITING_LIST_DATA);

      const result = journeyService.locateJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(LOCATE_NOT_ASSIGNED_DATA);
    });

    it("locate a journey which is dropped", () => {
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => DROPPED_LIST_DATA);

      const result = journeyService.locateJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(LOCATE_NOT_ASSIGNED_DATA);
    });

    it("locate a journey which is not found", () => {
      jest.spyOn(journeyDb, "getJourneyById").mockImplementation(() => null);

      const result = journeyService.locateJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(LOCATE_NOT_FOUND_DATA);
    });
  });

  describe("dropoff a journey", () => {
    it("dropoff a journey which is not found", () => {
      jest.spyOn(journeyDb, "getJourneyById").mockImplementation(() => null);
      expect(() => {
        journeyService.dropoffJourney(10);
      }).toThrow();
    });

    it("dropoff a completed journey", () => {
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => COMPLETED_DATA);

      const result = journeyService.dropoffJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(ERROR_MESSAGES.NO_CONTENT);
    });

    it("dropoff a already droppedoff journey", () => {
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => DROPPED_LIST_DATA);

      const result = journeyService.dropoffJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(ERROR_MESSAGES.NO_CONTENT);
    });

    it("dropoff a journey in waiting list", () => {
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementation(() => WAITING_LIST_DATA);
      jest.spyOn(journeyDb, "updateJourneyStatus").mockImplementation(() => {});
      jest
        .spyOn(journeyDb, "getWaitingList")
        .mockImplementation(() => new DoublyLinkedList());

      const result = journeyService.dropoffJourney(10);
      expect(journeyDb.getJourneyById).toBeCalled();
      expect(result).toEqual(ERROR_MESSAGES.NO_CONTENT);
    });

    it("dropoff a journey which is travelling", () => {
      const waitingList = new DoublyLinkedList();
      waitingList.add(10);
      waitingList.add(20);
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementationOnce(() => ASSIGNED_DATA);
      jest.spyOn(journeyDb, "updateJourneyStatus").mockImplementation(() => {});
      jest
        .spyOn(journeyDb, "getWaitingList")
        .mockImplementation(() => waitingList);
      jest
        .spyOn(helper, "getCurrentAndUpdatedSeats")
        .mockImplementation(() => ({ currentSeats: 0, updatedSeats: 6 }));
      jest.spyOn(carsDb, "updateAvailabilty").mockImplementation(() => {});
      jest.spyOn(carsDb, "getCarById").mockImplementation(() => CAR);
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementationOnce(() => WAITING_LIST_DATA);
      jest
        .spyOn(journeyDb, "getJourneyById")
        .mockImplementationOnce(() => WAITING_LIST_DATA);
      jest
        .spyOn(carsDb, "getAvailabilty")
        .mockImplementation(() => AVAILABILTY_MAP);
      jest.spyOn(journeyDb, "updateJourneyCarId").mockImplementation(() => {});

      journeyService.dropoffJourney(10);
      expect(journeyDb.getJourneyById).toBeCalledTimes(3);
      expect(helper.getCurrentAndUpdatedSeats).toBeCalledTimes(3);
      expect(carsDb.updateAvailabilty).toBeCalledTimes(2);
      expect(carsDb.getCarById).toBeCalledTimes(1);
      expect(journeyDb.updateJourneyStatus).toBeCalledTimes(2);
      expect(journeyDb.getWaitingList).toBeCalled();
      expect(carsDb.getAvailabilty).toBeCalledTimes(1);
      expect(journeyDb.updateJourneyCarId).toBeCalled();
    });
  });
});
