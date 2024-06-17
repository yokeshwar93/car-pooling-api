import { Test, TestingModule } from "@nestjs/testing";
import { GROUP_STATUSES } from "src/common/constants";
import { DoublyLinkedList } from "src/common/utils/DoublyLinkedList";
import { JourneyDb } from "../journey.db";
import { ASSIGNED_DATA, WAITING_LIST_DATA } from "./__mockdata__";

describe("Journey Db", () => {
  let journeyDb: JourneyDb;

  beforeEach(async () => {
    const journeyModule: TestingModule = await Test.createTestingModule({
      providers: [JourneyDb],
    }).compile();

    journeyDb = journeyModule.get<JourneyDb>(JourneyDb);
  });

  describe("create a new Journey", () => {
    it("creates a new journey to the db", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      expect(journeyDb.getAllJourneys()).toEqual({ 10: ASSIGNED_DATA });
    });
  });

  describe("get All Journeys", () => {
    it("returns empty for initial state", () => {
      expect(journeyDb.getAllJourneys()).toEqual({});
    });

    it("returns all journeys from db", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      expect(journeyDb.getAllJourneys()).toEqual({ 10: ASSIGNED_DATA });
    });
  });

  describe("add a Journey to waiting list", () => {
    it("add a new journey to the waiting list", () => {
      const result = new DoublyLinkedList();
      result.add(10);

      journeyDb.addToWaitingList(10);
      expect(journeyDb.getWaitingList()).toEqual(result);
    });
  });

  describe("get waiting list", () => {
    it("returns empty for initial state", () => {
      expect(journeyDb.getWaitingList()).toEqual(new DoublyLinkedList());
    });

    it("returns waiting list from db", () => {
      const result = new DoublyLinkedList();
      result.add(10);

      journeyDb.addToWaitingList(10);
      expect(journeyDb.getWaitingList()).toEqual(result);
    });
  });

  describe("get a journey by Id", () => {
    it("returns a journey from db", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      expect(journeyDb.getJourneyById(10)).toEqual(ASSIGNED_DATA);
    });
  });

  describe("update status for journey", () => {
    it("update status for journey in db", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      journeyDb.updateJourneyStatus(10, GROUP_STATUSES.COMPLETED);

      expect(journeyDb.getJourneyById(10).currentStatus).toEqual(
        GROUP_STATUSES.COMPLETED
      );
    });
  });

  describe("update car id for journey", () => {
    it("update car id for journey in db", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      journeyDb.updateJourneyCarId(10, 102);

      expect(journeyDb.getJourneyById(10).carId).toEqual(102);
    });
  });

  describe("rest db", () => {
    it("should reset the application state", () => {
      journeyDb.createNewJourney(10, ASSIGNED_DATA);
      journeyDb.addToWaitingList(10);
      journeyDb.resetDb();
      expect(journeyDb.getAllJourneys()).toEqual({});
      expect(journeyDb.getWaitingList()).toEqual(new DoublyLinkedList());
    });
  });
});
