import { Test, TestingModule } from "@nestjs/testing";
import { SWAGGER_DESCRIPTIONS } from "src/common/constants";
import { CarsDb } from "../cars.db";
import {
  AVAILABILTY,
  AVAILABILTY_MAP,
  AVAILABILTY_UPDATE,
  AVAILABILTY_UPDATE_1,
  CAR,
  CARS_LIST,
  CARS_MOCK_DATA,
} from "./__mockData__";

describe("Cars Db", () => {
  let carsDb: CarsDb;

  beforeEach(async () => {
    const carModule: TestingModule = await Test.createTestingModule({
      providers: [CarsDb],
    }).compile();

    carsDb = carModule.get<CarsDb>(CarsDb);
  });

  describe("get cars list", () => {
    it("should return empty initially", () => {
      const result = {};
      expect(carsDb.getCarsList()).toEqual(result);
    });
    it("should return the list of cars", () => {
      const result = CARS_LIST;
      carsDb.updateCarsList(CARS_MOCK_DATA);
      expect(carsDb.getCarsList()).toEqual(result);
    });
  });

  describe("get availabilty map", () => {
    it("should return empty initially", () => {
      const result = {};
      expect(carsDb.getAvailabilty()).toEqual(result);
    });
    it("should return the availabilty map", () => {
      const result = AVAILABILTY_MAP;
      carsDb.updateCarsList(CARS_MOCK_DATA);
      expect(carsDb.getAvailabilty()).toEqual(result);
    });
  });

  describe("get car", () => {
    it("should return car by Id", () => {
      const result = CAR;
      carsDb.updateCarsList(CARS_MOCK_DATA);
      expect(carsDb.getCarById(101)).toEqual(result);
    });
  });

  describe("get availabilty", () => {
    it("should return available cars by seats", () => {
      const result = AVAILABILTY;
      carsDb.updateCarsList(CARS_MOCK_DATA);
      expect(carsDb.getAvailableCarsBySeats(6)).toEqual(result);
    });
  });

  describe("update cars", () => {
    it("should update cars and availabilty in db", () => {
      const availabilty = AVAILABILTY_MAP;
      const cars = CARS_LIST;

      expect(carsDb.updateCarsList(CARS_MOCK_DATA)).toEqual(
        SWAGGER_DESCRIPTIONS.CARS_OK
      );
      expect(carsDb.getAvailabilty()).toEqual(availabilty);
      expect(carsDb.getCarsList()).toEqual(cars);
    });

    it("should return error if exception", () => {
      expect(carsDb.updateCarsList(null)).toEqual(
        "Error while updating car list"
      );
    });
  });

  describe("update availabilty", () => {
    it("should update availabilty map", () => {
      const result = AVAILABILTY_UPDATE;
      const result1 = AVAILABILTY_UPDATE_1;

      carsDb.updateCarsList(CARS_MOCK_DATA);
      carsDb.updateAvailabilty(6, 2, 101);
      expect(carsDb.getAvailabilty()).toEqual(result);

      carsDb.updateCarsList(CARS_MOCK_DATA);
      carsDb.updateAvailabilty(6, 4, 101);
      expect(carsDb.getAvailabilty()).toEqual(result1);
    });
  });

  describe("rest db", () => {
    it("should reset the application state", () => {
      carsDb.updateCarsList(CARS_MOCK_DATA);
      expect(carsDb.getAvailabilty()).toEqual(AVAILABILTY_MAP);
      expect(carsDb.getCarsList()).toEqual(CARS_LIST);
      carsDb.resetDb();
      expect(carsDb.getCarsList()).toEqual({});
      expect(carsDb.getAvailabilty()).toEqual({});
    });
  });
});
