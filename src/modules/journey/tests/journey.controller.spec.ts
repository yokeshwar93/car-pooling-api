import { HttpStatus } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { ERROR_MESSAGES } from "src/common/constants";
import { CarsDb } from "src/modules/cars/cars.db";
import { JourneyController } from "../journey.controller";
import { JourneyDb } from "../journey.db";
import { JourneyService } from "../journey.service";
import {
  JOURNEY_MOCK_DATA,
  LOCATE_ASSIGNED_DATA,
  LOCATE_NOT_ASSIGNED_DATA,
  LOCATE_NOT_FOUND_DATA,
  LOCATE_REQUEST,
} from "./__mockdata__";

describe("Journey Controller", () => {
  let journeyController: JourneyController;
  let journeyService: JourneyService;

  beforeEach(async () => {
    const journeyModule: TestingModule = await Test.createTestingModule({
      controllers: [JourneyController],
      providers: [JourneyService, CarsDb, JourneyDb],
    }).compile();

    journeyController = journeyModule.get<JourneyController>(JourneyController);
    journeyService = journeyModule.get<JourneyService>(JourneyService);
  });

  describe("register new Journey", () => {
    it("should register a new journey", () => {
      jest
        .spyOn(journeyService, "registerNewJourney")
        .mockImplementation(() => {});
      journeyController.registerJourney(JOURNEY_MOCK_DATA);
      expect(journeyService.registerNewJourney).toBeCalled();
    });
  });

  describe("locate a Journey", () => {
    let response;
    const statusMock = jest.fn();
    const sendMock = jest.fn();
    beforeAll(() => {
      response = {
        status: statusMock.mockImplementation(() => null),
        send: sendMock.mockImplementation(() => null),
      };
    });
    it("should locate a assigned journey", () => {
      jest
        .spyOn(journeyService, "locateJourney")
        .mockImplementation(() => LOCATE_ASSIGNED_DATA);
      journeyController.locateJourney(LOCATE_REQUEST, response);
      expect(statusMock).not.toBeCalled();
      expect(sendMock).toBeCalledWith(LOCATE_ASSIGNED_DATA.car);
    });

    it("should locate a not assigned journey", () => {
      jest
        .spyOn(journeyService, "locateJourney")
        .mockImplementation(() => LOCATE_NOT_ASSIGNED_DATA);
      journeyController.locateJourney(LOCATE_REQUEST, response);
      expect(statusMock).toBeCalledWith(HttpStatus.NO_CONTENT);
      expect(sendMock).toBeCalled();
    });

    it("should return not found if journey is not found", () => {
      jest
        .spyOn(journeyService, "locateJourney")
        .mockImplementation(() => LOCATE_NOT_FOUND_DATA);
      journeyController.locateJourney(LOCATE_REQUEST, response);
      expect(statusMock).toBeCalledWith(HttpStatus.NOT_FOUND);
      expect(sendMock).toBeCalled();
    });
  });

  describe("dropoff a Journey", () => {
    let response;
    const statusMock = jest.fn();
    const sendMock = jest.fn();
    beforeAll(() => {
      response = {
        status: statusMock.mockImplementation(() => null),
        send: sendMock.mockImplementation(() => null),
      };
    });
    it("should dropoff a assigned journey", () => {
      jest.spyOn(journeyService, "dropoffJourney").mockImplementation(() => "");
      journeyController.dropoffJourney(LOCATE_REQUEST, response);
      expect(statusMock).toBeCalledWith(HttpStatus.OK);
      expect(sendMock).toBeCalled();
    });

    it("should locate a not assigned journey", () => {
      jest
        .spyOn(journeyService, "dropoffJourney")
        .mockImplementation(() => ERROR_MESSAGES.NO_CONTENT);
      journeyController.dropoffJourney(LOCATE_REQUEST, response);
      expect(statusMock).toBeCalledWith(HttpStatus.NO_CONTENT);
      expect(sendMock).toBeCalled();
    });
  });
});
