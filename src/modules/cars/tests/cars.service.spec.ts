import { TestingModule, Test } from "@nestjs/testing";
import { SWAGGER_DESCRIPTIONS } from "src/common/constants";
import { JourneyDb } from "src/modules/journey/journey.db";
import { CarsDb } from "../cars.db";
import { CarsService } from "../cars.service";
import { CARS_MOCK_DATA } from "./__mockData__";

describe("Cars Service", () => {
  let carsService: CarsService;
  let carsDb: CarsDb;
  let journeyDb: JourneyDb;

  beforeEach(async () => {
    const carModule: TestingModule = await Test.createTestingModule({
      providers: [CarsService, CarsDb, JourneyDb],
    }).compile();

    carsService = carModule.get<CarsService>(CarsService);
    carsDb = carModule.get<CarsDb>(CarsDb);
    journeyDb = carModule.get<JourneyDb>(JourneyDb);
  });

  describe("updateCarsList", () => {
    it("should update the cars list in db", () => {
      const result = SWAGGER_DESCRIPTIONS.CARS_OK;
      jest.spyOn(carsDb, "resetDb").mockImplementation(() => {});
      jest.spyOn(journeyDb, "resetDb").mockImplementation(() => {});
      jest.spyOn(carsDb, "updateCarsList").mockImplementation(() => result);

      expect(carsService.updateCarsList(CARS_MOCK_DATA)).toBe(result);
    });
  });
});
