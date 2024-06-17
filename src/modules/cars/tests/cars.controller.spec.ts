import { Test, TestingModule } from "@nestjs/testing";
import { SWAGGER_DESCRIPTIONS } from "src/common/constants";
import { JourneyDb } from "src/modules/journey/journey.db";
import { CarsController } from "../cars.controller";
import { CarsDb } from "../cars.db";
import { CarsService } from "../cars.service";
import { CARS_MOCK_DATA } from "./__mockData__";

describe("Cars Controller", () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const carModule: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, CarsDb, JourneyDb],
    }).compile();

    carsController = carModule.get<CarsController>(CarsController);
    carsService = carModule.get<CarsService>(CarsService);
  });

  describe("cars", () => {
    it("should update the cars list", async () => {
      const result = SWAGGER_DESCRIPTIONS.CARS_OK;
      jest
        .spyOn(carsService, "updateCarsList")
        .mockImplementation(() => result);
      expect(await carsController.updateCarsList(CARS_MOCK_DATA)).toBe(
        SWAGGER_DESCRIPTIONS.CARS_OK
      );
    });
  });
});
